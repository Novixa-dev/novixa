#!/usr/bin/env bash
# ==============================================================================
# One-time preparation of the VPS for Novixa deploys. Run as root:
#
#   curl -fsSL https://raw.githubusercontent.com/novixa-dev/novixa/main/deploy/scripts/server-setup.sh -o novixa-setup.sh
#   less novixa-setup.sh            # read it first
#   sudo bash novixa-setup.sh
#
# What it does — and nothing else:
#   1. creates a `novixa` system user in the docker group, and /opt/novixa
#   2. generates an SSH key that GitHub Actions will deploy with, authorises it
#      for that user, and prints the values to paste into GitHub secrets
#   3. creates the `novixa-edge` Docker network
#   4. connects mailcow's nginx to that network through mailcow's supported
#      docker-compose.override.yml, and gives the `novixa` user its own
#      novixa.conf + novixa/ in mailcow's nginx config directory
#   5. recreates only the nginx-mailcow container so (4) takes effect. Postfix,
#      Dovecot, SOGo and the rest of mailcow keep running; the mail web UI is
#      unavailable for the few seconds nginx takes to restart.
#
# Idempotent: safe to run again. It never edits an existing mailcow file it did
# not create, and it asks before step 5.
# ==============================================================================
set -Eeuo pipefail

DEPLOY_USER="${DEPLOY_USER:-novixa}"
APP_DIR="${APP_DIR:-/opt/novixa}"
EDGE_NETWORK="novixa-edge"
ASSUME_YES="${ASSUME_YES:-}"

say()  { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "Run as root (sudo bash $0)."
command -v docker >/dev/null || die "Docker is not installed."
docker compose version >/dev/null 2>&1 || die "Docker Compose v2 is required."

# ── 1. User and directory ───────────────────────────────────────────────────
say "Deploy user '$DEPLOY_USER' and $APP_DIR"
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  useradd --system --create-home --shell /bin/bash "$DEPLOY_USER"
fi
usermod -aG docker "$DEPLOY_USER"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 750 "$APP_DIR" "$APP_DIR/backups"

# ── 2. CI deploy key ────────────────────────────────────────────────────────
say "SSH key for GitHub Actions"
home_dir="$(getent passwd "$DEPLOY_USER" | cut -d: -f6)"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 700 "$home_dir/.ssh"
auth="$home_dir/.ssh/authorized_keys"
touch "$auth"; chown "$DEPLOY_USER:$DEPLOY_USER" "$auth"; chmod 600 "$auth"

new_private_key=""
if grep -q 'novixa-github-actions' "$auth"; then
  echo "A GitHub Actions key is already authorised; not generating another."
  echo "(To rotate: delete its line from $auth and run this script again.)"
else
  tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
  ssh-keygen -q -t ed25519 -N '' -C 'novixa-github-actions' -f "$tmp/key"
  cat "$tmp/key.pub" >> "$auth"
  new_private_key="$(cat "$tmp/key")"
fi

# ── 3. Edge network ─────────────────────────────────────────────────────────
say "Docker network '$EDGE_NETWORK'"
docker network inspect "$EDGE_NETWORK" >/dev/null 2>&1 || docker network create "$EDGE_NETWORK" >/dev/null
echo "ok"

# ── 4. mailcow integration ──────────────────────────────────────────────────
say "Locating mailcow"
nginx_container="$(docker ps --filter 'label=com.docker.compose.service=nginx-mailcow' --format '{{.Names}}' | head -n1)"
[ -n "$nginx_container" ] || die "No running nginx-mailcow container found. This setup integrates with mailcow; see deploy/README.md for a host without it."
mailcow_dir="$(docker inspect -f '{{ index .Config.Labels "com.docker.compose.project.working_dir" }}' "$nginx_container")"
[ -f "$mailcow_dir/mailcow.conf" ] || die "mailcow.conf not found in '$mailcow_dir'."
echo "mailcow: $mailcow_dir  (nginx: $nginx_container)"

https_port="$(sed -n 's/^HTTPS_PORT=//p' "$mailcow_dir/mailcow.conf" | tail -n1)"
http_port="$(sed -n 's/^HTTP_PORT=//p' "$mailcow_dir/mailcow.conf" | tail -n1)"
if [ "${https_port:-443}" != "443" ] || [ "${http_port:-80}" != "80" ]; then
  die "mailcow listens on HTTP_PORT=${http_port} HTTPS_PORT=${https_port}, so another reverse proxy owns :80/:443. Route novixa.dev from that proxy to 127.0.0.1:3100 instead (deploy/README.md)."
fi

override="$mailcow_dir/docker-compose.override.yml"
needs_recreate=""
if [ -f "$override" ]; then
  if grep -q "$EDGE_NETWORK" "$override"; then
    echo "docker-compose.override.yml already connects nginx to $EDGE_NETWORK."
  else
    warn "$override already exists and was not written by this script."
    warn "Add the following to it by hand, then run this script again:"
    cat >&2 <<EOF

services:
  nginx-mailcow:
    networks:
      $EDGE_NETWORK: {}

networks:
  $EDGE_NETWORK:
    external: true
EOF
    exit 1
  fi
else
  cat > "$override" <<EOF
# Created by Novixa's deploy/scripts/server-setup.sh.
# Joins mailcow's nginx to the network the Novixa app listens on, so the
# novixa.dev site block (data/conf/nginx/novixa.conf) can reach it. Nothing
# else in mailcow is connected to that network.
services:
  nginx-mailcow:
    networks:
      $EDGE_NETWORK: {}

networks:
  $EDGE_NETWORK:
    external: true
EOF
  needs_recreate=1
fi

# A home inside mailcow's nginx config dir that the deploy user may write:
# the site block and the origin certificate, nothing else of mailcow's.
conf_dir="$mailcow_dir/data/conf/nginx"
install -d -o "$DEPLOY_USER" -g root -m 750 "$conf_dir/novixa"
if [ ! -e "$conf_dir/novixa.conf" ]; then
  printf '# Placeholder — replaced by the first Novixa deploy.\n' > "$conf_dir/novixa.conf"
fi
chown "$DEPLOY_USER:root" "$conf_dir/novixa.conf"; chmod 640 "$conf_dir/novixa.conf"
printf 'MAILCOW_DIR=%s\n' "$mailcow_dir" > "$APP_DIR/host.env"
chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR/host.env"

# ── 5. Apply the override ───────────────────────────────────────────────────
if [ -n "$needs_recreate" ] || ! docker inspect -f '{{json .NetworkSettings.Networks}}' "$nginx_container" | grep -q "\"$EDGE_NETWORK\""; then
  say "Recreating nginx-mailcow to join $EDGE_NETWORK"
  echo "Mail delivery is not affected; the mail web UI restarts for a few seconds."
  if [ -z "$ASSUME_YES" ]; then
    read -r -p "Proceed? [y/N] " answer
    [ "$answer" = "y" ] || [ "$answer" = "Y" ] || die "Stopped before touching mailcow. Re-run when ready."
  fi
  (cd "$mailcow_dir" && docker compose up -d nginx-mailcow)
fi
nginx_container="$(docker ps --filter 'label=com.docker.compose.service=nginx-mailcow' --format '{{.Names}}' | head -n1)"
docker exec "$nginx_container" nginx -t >/dev/null 2>&1 || die "mailcow's nginx config test fails — investigate before deploying (docker exec $nginx_container nginx -t)."
echo "nginx-mailcow is healthy and on $EDGE_NETWORK."

# ── Summary ─────────────────────────────────────────────────────────────────
ssh_port="$(sshd -T 2>/dev/null | awk '/^port /{print $2; exit}' || true)"
public_ip="$(hostname -I 2>/dev/null | awk '{print $1}' || true)"
host_key="$(cut -d' ' -f1,2 /etc/ssh/ssh_host_ed25519_key.pub 2>/dev/null || echo '<ssh-keyscan -t ed25519 this server>')"
if [ "${ssh_port:-22}" = "22" ]; then known_host="$public_ip $host_key"; else known_host="[$public_ip]:$ssh_port $host_key"; fi

say "Done. Add these to GitHub → Settings → Environments → production → secrets:"
cat <<EOF

  VPS_HOST         $public_ip   (check: this must be the server's public IPv4)
  VPS_PORT         ${ssh_port:-22}
  VPS_USER         $DEPLOY_USER
  VPS_KNOWN_HOSTS  $known_host
EOF
if [ -n "$new_private_key" ]; then
  echo "  VPS_SSH_KEY      (the whole block below, including the BEGIN/END lines)"
  echo
  echo "$new_private_key"
  echo
  warn "This private key is shown once and not stored on the server. Copy it now."
fi
echo
echo "Then see deploy/README.md for the remaining secrets (origin certificate, admin, mail)."
