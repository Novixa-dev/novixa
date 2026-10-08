#!/usr/bin/env bash
# ==============================================================================
# Roll out one release on the VPS. Called by .github/workflows/deploy.yml over
# SSH as the `novixa` user, after it has uploaded this directory's siblings and
# a fresh app.env to /opt/novixa.
#
#   deploy.sh <image> <tag>     e.g. deploy.sh ghcr.io/novixa-dev/novixa sha-<commit>
#
# Order matters and every step can stop the release:
#   1. generate server-side secrets once (DB password, session secret)
#   2. back up the database if it is already running
#   3. pull and start the new image; wait for Docker health (which includes
#      the database and applies pending migrations); on failure, restart the
#      previous image and exit non-zero
#   4. confirm the answering build is the one just deployed
#   5. install the nginx site block + origin certificate into mailcow, with
#      `nginx -t` gating the reload and the previous files restored on failure
#   6. keep the nightly backup job installed; prune old Novixa images
# ==============================================================================
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"
umask 077

image="${1:?usage: deploy.sh <image> <tag>}"
tag="${2:?usage: deploy.sh <image> <tag>}"
[[ "$tag" =~ ^[A-Za-z0-9._-]+$ ]] || { echo "bad tag: $tag" >&2; exit 2; }

log()  { printf '[deploy] %s\n' "$*"; }
warn() { printf '[deploy] WARNING: %s\n' "$*" >&2; }
die()  { printf '[deploy] FAILED: %s\n' "$*" >&2; exit 1; }

random_hex() { head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n'; }
write_release() { printf 'NOVIXA_IMAGE=%s\nNOVIXA_TAG=%s\n' "$1" "$2" > .env; }

# shellcheck disable=SC1091
[ -f host.env ] && . ./host.env
[ -f compose.yml ] || die "compose.yml missing in $APP_DIR"
[ -f app.env ] || die "app.env missing — CI writes it before calling this script"

# ── 1. Server-side secrets (generated once, never leave this machine) ───────
if [ ! -f db.env ]; then
  log "generating database password"
  printf 'POSTGRES_PASSWORD=%s\n' "$(random_hex)" > db.env
fi
if [ ! -f secrets.env ]; then
  log "generating app secrets"
  db_password="$(sed -n 's/^POSTGRES_PASSWORD=//p' db.env)"
  printf 'DATABASE_URL=postgres://novixa:%s@db:5432/novixa\nADMIN_SESSION_SECRET=%s\n' \
    "$db_password" "$(random_hex)" > secrets.env
fi
chmod 600 db.env secrets.env app.env

# ── 2. Pre-deploy backup ────────────────────────────────────────────────────
prev_image="$(sed -n 's/^NOVIXA_IMAGE=//p' .env 2>/dev/null || true)"
prev_tag="$(sed -n 's/^NOVIXA_TAG=//p' .env 2>/dev/null || true)"
if [ -n "$prev_tag" ] && docker compose ps --status running --services 2>/dev/null | grep -qx db; then
  log "backing up the database before migrating"
  ./scripts/backup.sh pre-deploy || die "pre-deploy backup failed; not deploying over an unbacked database"
fi

# ── 3. Start the new release ────────────────────────────────────────────────
log "deploying $image:$tag (previous: ${prev_tag:-none})"
# The new release is passed through the environment (which outranks .env) and
# only written to .env once it is healthy, so .env always names the last
# release that actually worked — the one a rollback returns to.
export NOVIXA_IMAGE="$image" NOVIXA_TAG="$tag"
if ! docker compose pull --quiet app; then
  # A registry outage is not a reason to fail when this exact image is here.
  docker image inspect "$image:$tag" >/dev/null 2>&1 || die "cannot pull $image:$tag"
  warn "pull failed; using the copy of $image:$tag already on this host"
fi

rollback() {
  docker compose logs --tail=80 app >&2 || true
  if [ -n "$prev_tag" ]; then
    warn "rolling back to $prev_tag"
    NOVIXA_IMAGE="$prev_image" NOVIXA_TAG="$prev_tag" docker compose up -d --wait --wait-timeout 180 \
      || warn "rollback did not become healthy either"
  fi
}

if ! docker compose up -d --remove-orphans --wait --wait-timeout 180; then
  rollback
  die "new release did not become healthy"
fi

# ── 4. Is the new build the one answering? ──────────────────────────────────
health="$(curl -fsS --noproxy '*' --max-time 10 http://127.0.0.1:3100/api/health || true)"
log "health: ${health:-<no response>}"
expected="${tag#sha-}"; expected="${expected:0:12}"
case "$health" in
  *"\"status\":\"ok\""*) ;;
  *) rollback; die "health endpoint is not ok" ;;
esac
if [[ "$tag" == sha-* ]] && [[ "$health" != *"\"version\":\"$expected\""* ]]; then
  rollback; die "the running build does not report version $expected"
fi
write_release "$image" "$tag"

# ── 5. nginx site block + origin certificate (mailcow) ──────────────────────
install_site() {
  local conf_dir="$MAILCOW_DIR/data/conf/nginx"
  local nginx_c
  nginx_c="$(docker ps --filter 'label=com.docker.compose.service=nginx-mailcow' --format '{{.Names}}' | head -n1)"
  [ -n "$nginx_c" ] || die "nginx-mailcow is not running"
  [ -w "$conf_dir/novixa.conf" ] && [ -w "$conf_dir/novixa" ] || die "no write access to $conf_dir/novixa{.conf,/} — run server-setup.sh"

  if [ ! -s tls/origin.pem ] && [ ! -s "$conf_dir/novixa/origin.pem" ]; then
    warn "no origin certificate yet (CF_ORIGIN_CERT / CF_ORIGIN_KEY secrets) — site block not installed"
    return 0
  fi

  # Keep the live files so a failed test can put them back exactly.
  local prev="$APP_DIR/.nginx-prev"
  rm -rf "$prev"; mkdir -p "$prev"
  cp -p "$conf_dir/novixa.conf" "$prev/" 2>/dev/null || true
  cp -p "$conf_dir/novixa/origin.pem" "$conf_dir/novixa/origin.key" "$prev/" 2>/dev/null || true

  # IPv6 listeners only if mailcow's own server blocks have them.
  local rendered
  if docker exec "$nginx_c" nginx -T 2>/dev/null | grep -v '#ipv6' | grep -q 'listen \[::\]:443'; then
    rendered="$(cat nginx/novixa.conf)"
  else
    rendered="$(sed '/#ipv6$/d' nginx/novixa.conf)"
  fi

  if [ -s tls/origin.pem ] && [ -s tls/origin.key ]; then
    cat tls/origin.pem > "$conf_dir/novixa/origin.pem"
    cat tls/origin.key > "$conf_dir/novixa/origin.key"
    chmod 600 "$conf_dir/novixa/origin.pem" "$conf_dir/novixa/origin.key"
  fi
  printf '%s\n' "$rendered" > "$conf_dir/novixa.conf"

  if docker exec "$nginx_c" nginx -t >/dev/null 2>&1; then
    docker exec "$nginx_c" nginx -s reload
    log "nginx site block installed and reloaded"
  else
    docker exec "$nginx_c" nginx -t >&2 || true
    [ -f "$prev/novixa.conf" ] && cat "$prev/novixa.conf" > "$conf_dir/novixa.conf"
    [ -f "$prev/origin.pem" ] && cat "$prev/origin.pem" > "$conf_dir/novixa/origin.pem"
    [ -f "$prev/origin.key" ] && cat "$prev/origin.key" > "$conf_dir/novixa/origin.key"
    die "nginx -t failed with the new site block; previous files restored, nginx not reloaded"
  fi
  rm -f tls/origin.pem tls/origin.key

  # Prove the whole path: nginx → edge network → app, then TLS on :443.
  if docker exec "$nginx_c" sh -c 'command -v wget' >/dev/null 2>&1; then
    docker exec "$nginx_c" wget -q -O /dev/null http://novixa-app:3000/api/health \
      || die "mailcow's nginx cannot reach novixa-app:3000 — is it on the novixa-edge network? (server-setup.sh)"
  fi
  curl -fsS --noproxy '*' --max-time 10 -k --resolve novixa.dev:443:127.0.0.1 -o /dev/null https://novixa.dev/api/health \
    || die "https://novixa.dev via the local nginx does not answer"
  log "origin path verified: nginx :443 → novixa-app"
}

if [ -n "${MAILCOW_DIR:-}" ]; then
  install_site
else
  warn "no mailcow configured (host.env) — app is on 127.0.0.1:3100; point your reverse proxy at it"
fi

# ── 6. Housekeeping ─────────────────────────────────────────────────────────
if command -v crontab >/dev/null 2>&1; then
  cron_line="17 2 * * * $APP_DIR/scripts/backup.sh nightly >> $APP_DIR/backups/backup.log 2>&1"
  { crontab -l 2>/dev/null | grep -v 'scripts/backup.sh' || true; echo "$cron_line"; } | crontab -
else
  warn "crontab not available — nightly backups are not scheduled"
fi
docker image prune -af --filter 'label=dev.novixa.app=true' --filter 'until=336h' >/dev/null || true

log "released $tag"
