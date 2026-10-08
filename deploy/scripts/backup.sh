#!/usr/bin/env bash
# ==============================================================================
# Dump the Novixa database to /opt/novixa/backups (custom format, restorable
# with restore.sh). Run nightly from the deploy user's crontab, before every
# deploy, and by hand whenever wanted:
#
#   /opt/novixa/scripts/backup.sh [label]
#
# Keeps BACKUP_RETENTION_DAYS (default 14) days. These copies live on the same
# disk as the database: they protect against a bad migration or a mistaken
# delete, not against losing the server. Copy backups/ off the machine too
# (see deploy/README.md).
# ==============================================================================
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"
umask 077

label="${1:-manual}"
[[ "$label" =~ ^[a-z0-9-]+$ ]] || { echo "label must be [a-z0-9-]" >&2; exit 2; }
keep_days="${BACKUP_RETENTION_DAYS:-14}"
mkdir -p backups
out="backups/novixa-$(date -u +%Y%m%dT%H%M%SZ)-$label.dump"

docker compose exec -T db pg_dump -U novixa -d novixa --format=custom > "$out.partial"
mv "$out.partial" "$out"

find backups -name 'novixa-*.dump' -mtime +"$keep_days" -delete
find backups -name '*.partial' -mmin +60 -delete
echo "[backup] $(date -u +%FT%TZ) $out ($(du -h "$out" | cut -f1))"
