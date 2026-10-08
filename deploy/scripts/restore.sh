#!/usr/bin/env bash
# ==============================================================================
# Restore the Novixa database from a backup made by backup.sh.
#
#   /opt/novixa/scripts/restore.sh backups/novixa-<timestamp>-<label>.dump
#
# Takes a fresh backup of the current state first, so a restore can itself be
# undone. Replaces the contents of every table in the dump.
# ==============================================================================
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"

file="${1:?usage: restore.sh <backup.dump>}"
[ -s "$file" ] || { echo "no such backup: $file" >&2; exit 1; }

echo "This replaces the live database with $file."
read -r -p "Type 'restore' to continue: " answer
[ "$answer" = "restore" ] || { echo "aborted"; exit 1; }

./scripts/backup.sh pre-restore
docker compose exec -T db pg_restore -U novixa -d novixa --clean --if-exists --no-owner < "$file"
echo "[restore] done from $file"
