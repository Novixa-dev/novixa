# Novixa — Production on the VPS (novixa.dev)

The production site runs on the Contabo VPS that already hosts mailcow for `novixa.dev`. This directory is everything that deployment needs. GitHub Actions does all the deploying; the server is touched by hand once, by `scripts/server-setup.sh`.

```
visitor ──HTTPS──▶ Cloudflare (proxied, SSL "Full (strict)")
                       │  Cloudflare Origin Certificate
                       ▼
              mailcow's nginx  :80/:443   ── mail.novixa.dev → mailcow (unchanged)
                       │  novixa.dev → data/conf/nginx/novixa.conf
                       │  network: novixa-edge (only nginx + the app)
                       ▼
               novixa-app :3000  (Next.js standalone, GHCR image)
                       │  network: internal (no route out)
                       ▼
               novixa-db  :5432  (PostgreSQL 16, volume novixa_db-data)
```

## Why it is built this way

- **mailcow already owns ports 80 and 443.** A second proxy would mean moving mailcow behind it, which touches the mail stack. Instead, the site is one more server block in mailcow's nginx, in the directory mailcow documents for custom sites (`data/conf/nginx/*.conf`, kept across mailcow updates).
- **The app is not on mailcow's network.** mailcow's internal network has unauthenticated services on it (PHP-FPM among them). The app and mailcow's nginx share a dedicated `novixa-edge` network instead, and nothing else is on it. nginx joins that network through `docker-compose.override.yml`, which is mailcow's supported way to extend its compose file.
- **mailcow keeps working if the app does not.** nginx resolves `novixa-app` per request, so a stopped app means a 502 on novixa.dev, not an nginx that refuses to start. This was rehearsed (see below).
- **`X-Forwarded-For` is overwritten, never appended.** The contact form and the admin login rate-limit on the first address in that header. The real client IP comes from `CF-Connecting-IP`, but only when the connection really comes from Cloudflare's published ranges.
- **Secrets split by who needs them.** The database password and the session secret are generated on the server and never leave it. CI only holds what a human has to choose (admin email and password, mail credentials, certificate). The admin password is hashed on the CI runner, so only the scrypt hash reaches the server.

## One-time setup

### 1. Cloudflare (dashboard → novixa.dev)

1. **DNS**
   - `A novixa.dev → <VPS IPv4>`, Proxied (orange cloud).
   - `CNAME www → novixa.dev`, Proxied.
   - Leave `mail.novixa.dev` (and `autodiscover`/`autoconfig`) **DNS only** (grey cloud): mail cannot go through Cloudflare's proxy.
2. **SSL/TLS → Overview:** set the mode to **Full (strict)**.
3. **SSL/TLS → Origin Server → Create Certificate**
   - Hostnames: `novixa.dev`, `*.novixa.dev`. Validity: 15 years. Format: PEM.
   - Copy both blocks: they become the `CF_ORIGIN_CERT` and `CF_ORIGIN_KEY` secrets. Cloudflare shows the key only once.
4. **SSL/TLS → Edge Certificates:** turn on *Always Use HTTPS*.

### 2. The VPS (once, as root)

```bash
curl -fsSL https://raw.githubusercontent.com/novixa-dev/novixa/main/deploy/scripts/server-setup.sh -o novixa-setup.sh
less novixa-setup.sh          # read it before running it
sudo bash novixa-setup.sh
```

The script asks before it restarts mailcow's nginx container (a few seconds of mail web UI; Postfix and Dovecot keep running). At the end it prints `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_KNOWN_HOSTS` and a one-time private key for `VPS_SSH_KEY`.

If `docker-compose.override.yml` already exists in the mailcow directory, the script does not edit it. It prints the four lines to add, then you run it again.

### 3. mailcow (its admin UI)

- Create a mailbox **`no-reply@novixa.dev`**. The site sends through it, so set `SMTP_USER` to this address and `SMTP_PASSWORD` to its password.
- Make sure **`hello@novixa.dev`** exists (as a mailbox or an alias). Enquiries are delivered there.
- **Configuration → ARC/DKIM keys:** generate a key for `novixa.dev` and publish the TXT record it shows in Cloudflare.
- In Cloudflare, also add:
  - `TXT novixa.dev  "v=spf1 mx ~all"`
  - `TXT _dmarc  "v=DMARC1; p=none; rua=mailto:postmaster@novixa.dev"` (tighten `p=` to `quarantine` once reports look clean)
- In Contabo's panel, set the server's **reverse DNS (PTR)** to `mail.novixa.dev`. Without it, many receivers mark mail from this IP as spam.

### 4. GitHub (repository → Settings → Environments → `production`)

**Secrets**

| Name | Value |
|---|---|
| `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_KNOWN_HOSTS`, `VPS_SSH_KEY` | from `server-setup.sh` |
| `CF_ORIGIN_CERT`, `CF_ORIGIN_KEY` | the Cloudflare origin certificate and key (PEM) |
| `ADMIN_EMAIL` | the address you sign in to `/admin` with |
| `ADMIN_PASSWORD` | 12+ characters; hashed on the runner, never stored in plain text on the server. You can set `ADMIN_PASSWORD_HASH` instead (`node scripts/hash-password.mjs`). |
| `SMTP_PASSWORD` | the `no-reply@novixa.dev` mailbox password |
| `RESEND_API_KEY` | *optional*: when set, mail goes through Resend instead of SMTP |

**Variables** (Settings → Secrets and variables → Actions → Variables)

| Name | Value |
|---|---|
| `DEPLOY_ENABLED` | `true`. Until this is set, the deploy workflow skips instead of failing. |
| `SITE_URL` | `https://novixa.dev` (the default) |
| `SMTP_HOST` | `mail.novixa.dev` |
| `SMTP_PORT` | `587` (the default) |
| `SMTP_USER` | `no-reply@novixa.dev` |
| `MAIL_FROM` | `Novixa <no-reply@novixa.dev>` |
| `CONTACT_EMAIL` | `hello@novixa.dev` |
| `WHATSAPP_NUMBER` | *optional*: digits only, international form. The WhatsApp channel stays hidden while this is empty. |

Values must not contain a single quote or a line break. The workflow refuses them rather than mangling them.

### 5. Go

Push to `main` (or run **Actions → Deploy → Run workflow**). The pipeline:

1. **CI**: typecheck, lint, unit tests and Postgres integration tests, build, and E2E tests at three viewports.
2. **Deploy**, only if CI passed on a push to `main`:
   1. Build the image with the commit SHA baked in, and push it to `ghcr.io/novixa-dev/novixa`.
   2. Upload the deploy files and `app.env` over SSH (host key pinned).
   3. Run `scripts/deploy.sh`:
      - back up the database
      - start the new image and wait for its health check (this also applies migrations)
      - **roll back automatically** if the new release is unhealthy or reports the wrong version
      - install the nginx site block, with `nginx -t` gating the reload
      - verify nginx → app → TLS on the server
   4. Check `https://novixa.dev/api/health` through Cloudflare for the new version, and check the `/ar` canonical.

## Day to day

| Task | How |
|---|---|
| Deploy | Merge to `main`. |
| See what is live | `https://novixa.dev/api/health`: `version` is the commit. |
| Roll back | On the server as `novixa`: `/opt/novixa/scripts/deploy.sh ghcr.io/novixa-dev/novixa sha-<older commit>`. Or revert on `main` and let CI deploy the revert. |
| Logs | `cd /opt/novixa && docker compose logs -f app` |
| Back up now | `/opt/novixa/scripts/backup.sh manual` |
| Restore | `/opt/novixa/scripts/restore.sh backups/<file>.dump` (backs up the current state first, asks for confirmation) |
| Change admin password | Update the `ADMIN_PASSWORD` secret and re-run the Deploy workflow. |
| Sign everyone out | On the server: delete the `ADMIN_SESSION_SECRET` line from `/opt/novixa/secrets.env`, keep the `DATABASE_URL` line, and run any deploy. A new secret is generated. |

**Backups** run nightly at 02:17 UTC (the `novixa` user's crontab) and before every deploy. Each is a `pg_dump` custom-format file in `/opt/novixa/backups`, kept for 14 days. They sit on the same disk as the database, so they protect against a bad migration or a mistaken delete, **not against losing the server**. Copy that directory off the machine on a schedule, for example with Contabo's snapshot feature or an `rclone` job to object storage you own.

**Registry access.** The image is pushed to GitHub's container registry, and the deploy job logs the server in with its own short-lived token, then logs out. If you make the package public (GitHub → Packages → novixa → Package settings), manual rollbacks on the server need no login. The repository is public already, so the image reveals nothing new.

## Without mailcow

If `server-setup.sh` finds no mailcow, it stops. To run on a host with its own reverse proxy:

- Create `/opt/novixa` and the `novixa-edge` network by hand.
- Leave `host.env` out. `deploy.sh` then skips the nginx step and says so.
- Proxy `novixa.dev` to `127.0.0.1:3100`, overwriting `X-Forwarded-For` as `nginx/novixa.conf` does.

## Rehearsal record (2026-10-07)

Everything above was run end to end in a sandbox, against a stand-in for mailcow. The stand-in was `nginx:alpine` with mailcow's directory layout, `mailcow.conf`, a default site and the `nginx-mailcow` compose service name. It was **not the real server**, which has not been touched. Results:

- **`server-setup.sh`**:
  - created the user, the key and the network
  - wrote the override, and nginx joined both networks
  - a second run changed nothing
- **First deploy:**
  - generated secrets, started the database and app, applied migrations
  - health returned `{"status":"ok","database":"ok","store":"postgres"}`
  - the site block was installed and nginx reloaded
- **Through nginx:**
  - `/ar`: 200 over HTTP/2, canonical `https://novixa.dev/ar`
  - `www`: 301 to the apex, path and query kept
  - `http`: 301 to `https`
  - `/og`: 200 `image/png`
  - a 100 KB body: 413
  - mailcow's own host was unchanged
- **Spoofing:** six contact posts, each with a different forged `X-Forwarded-For` and `CF-Connecting-IP`, returned `200 ×5` then `429`. Forged headers do not get past the rate limit.
- **Admin in Chromium over HTTPS:**
  - login worked; the cookie was `Secure`, `HttpOnly`, `SameSite=Strict` with path `/admin`
  - the stored leads were listed
- **Mail:** an SMTP server requiring STARTTLS and authentication received both messages for an Arabic form submission:
  - the team notification, with reply-to set to the visitor
  - the Arabic acknowledgement to the visitor

  The row recorded `email_delivered = true`. A password containing `$`, `"` and a backtick reached the app unchanged.
- **Broken release:** an image that exits on start was rejected. `deploy.sh` exited 1, the previous release was serving again, and `.env` still named it.
- **Corrupt origin certificate:** `nginx -t` failed, the previous files were restored, nginx was not reloaded, and both the site and mailcow stayed up.
- **App stopped:** mailcow's nginx restarted normally; novixa.dev returned 502 and mailcow's site was unaffected.
- **Backup and restore:** backed up, deleted every lead, then restored. The count went 6 → 0 → 6, and a pre-restore backup was written automatically.

**Not rehearsed:**
- The real mailcow version's generated nginx config. `nginx -t` gates the reload for exactly this reason.
- Cloudflare itself.
- The GitHub-hosted image build: the sandbox could not reach Alpine's package mirror. The rehearsal image used the Dockerfile's runtime stage on a local build.
