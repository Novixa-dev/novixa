# Novixa — Next Steps (agent hand-off)

**Read this first if you are an AI agent picking up this project.** It is the ordered list of everything that remains between this repository and a verified production site at `https://novixa.dev`. Every step lists what to run and how to prove it worked. Work top to bottom, and do not skip a verification.

**Written:** 2026-10-08, at the end of a cloud session that had no access to the owner's browser, server, Cloudflare, mailcow or GitHub settings. Everything that needed only the code is done. Everything below needs one of those.

---

## 0. Read before acting

Read these in this order:

1. `AGENTS.md`: design and engineering rules (Arabic-first, `t()` for every string, no fabricated content, contrast floor, RTL rules).
2. `docs/AI_WORKING_RULES.md`: how to work in this repo (commits, gates, honesty rules).
3. `deploy/README.md`: the production architecture and runbook. **This file is the source of truth for the deployment.** The steps below are a checklist over it.
4. `docs/PRODUCTION_AUDIT.md` §4 and `docs/QA_RELEASE_CHECKLIST.md` §6 and §9.
5. `دليل-نوڤيكسا-الكامل.md`: the owner's Arabic guide. Report to the owner **in Arabic**.

### Hard rules (they have held for the whole project)

- **Never fabricate:** clients, testimonials, statistics, certifications, team members, credentials. If a value is not known, ask the owner or leave the feature off.
- **Never print, commit or paste a secret.** The repository is **public**, and so are its Actions logs. Keep secrets in files with mode 600 **outside the repository**, or pipe them straight into `gh secret set`.
- **mailcow runs on the same server and serves real mail. Do not disrupt it.**
  - Never stop or recreate mailcow containers other than `nginx-mailcow`.
  - Recreate `nginx-mailcow` only through `server-setup.sh`, and only after telling the owner.
  - Never edit mailcow files that `server-setup.sh` did not create.
- **No force-push, no history rewrite, no deleting branches.** Leave the `good_branch_do_not_change_it`, `first_branch` and `v1` branches alone.
- **Ask the owner before anything that costs money or is hard to undo:** DNS changes, deleting records, rotating keys.

---

## 1. Where things stand

| Item | State |
|---|---|
| Code | Production-ready. Leads in PostgreSQL, `/admin` dashboard, SMTP mail via mailcow (Resend optional), `/api/health`, security headers, SEO, OG |
| Verification | Typecheck and lint clean; **124** unit tests, **8** PostgreSQL integration tests, **171** E2E tests (3 viewports) |
| CI | `.github/workflows/ci.yml`: green on PR #2 (`https://github.com/Novixa-dev/novixa/pull/2`) |
| Deploy pipeline | `.github/workflows/deploy.yml` + `deploy/`. **Off** until the repository variable `DEPLOY_ENABLED=true` is set. Rehearsed end to end against a mailcow stand-in (see the rehearsal record in `deploy/README.md`) |
| Live today | `https://novixa-cyan.vercel.app/ar` (Vercel, `main`). `https://novixa.dev` currently returns mailcow's nginx 404 |
| Known facts | `novixa.dev` DNS is on Cloudflare (proxied). `mail.novixa.dev` A record → `161.97.75.64` (Contabo), serving mailcow. MX: `10 mail.novixa.dev`. **No SPF/DMARC TXT records exist yet** |

---

## 2. What the agent session needs

The previous session could not do the steps below because it ran in a cloud container. Run the next session **on the owner's computer**, with:

| Capability | Why | How the owner provides it |
|---|---|---|
| Shell on the owner's machine | Run `ssh`, `gh`, `dig`, `curl` | Claude Code running locally in the cloned repo |
| SSH to the VPS as root (once) | Run `server-setup.sh` | The owner's existing SSH key or password login to `161.97.75.64`. Test: `ssh root@161.97.75.64 'docker ps --format "{{.Names}}" \| head'` |
| GitHub CLI with admin on the repo | Create the `production` environment, secrets and variables; merge; run workflows | `gh auth login` (the owner) |
| Browser with the owner's sessions | Cloudflare dashboard, mailcow admin UI, Contabo panel | Claude in Chrome extension (or the desktop app's browser), logged in to each by the owner |

If any of these is missing, stop and tell the owner exactly which one. Do not work around it.

---

## 3. Steps

### Step 1 — Merge PR #2

> **DONE 2026-10-08.** The owner merged it (merge commit `dbc5f7c`). CI on `main` is green; the Deploy workflow ran and skipped itself, as designed, because `DEPLOY_ENABLED` is unset. The code was also re-verified locally on Windows before the merge: typecheck and lint clean, 124 unit tests, build (102 kB shared JS), 171 E2E tests. The 8 PostgreSQL integration tests were skipped locally (no Docker) and run in CI.

```bash
gh pr view 2 --repo Novixa-dev/novixa --json state,mergeable,statusCheckRollup
gh pr ready 2 --repo Novixa-dev/novixa      # it is a draft
gh pr merge 2 --repo Novixa-dev/novixa --merge
```

**Verify:** CI on `main` is green (`gh run list --branch main --limit 3`). Merging is safe because deploys stay off until `DEPLOY_ENABLED=true`.

### Step 2 — Inspect the server (read-only)

> **DONE 2026-10-08.** Ubuntu 26.04, 4 vCPU, 7.8 GB RAM (4.6 GB available), 87 GB free disk, Docker 29.8, Compose 5.6. mailcow at `/opt/mailcow-dockerized` on `HTTP_PORT=80` / `HTTPS_PORT=443`, `ENABLE_IPV6=false`, no `docker-compose.override.yml`, no custom nginx files, ufw inactive. Every mailcow container was up. Exactly one key (the operator's) was in root's `authorized_keys`.

Gather the facts before changing anything:

```bash
ssh root@161.97.75.64 '
  hostname -I; uname -a; free -h; df -h /;
  docker version --format "{{.Server.Version}}"; docker compose version;
  docker ps --format "{{.Names}}\t{{.Status}}";
  d=$(docker inspect -f "{{ index .Config.Labels \"com.docker.compose.project.working_dir\" }}" $(docker ps -qf label=com.docker.compose.service=nginx-mailcow));
  echo "mailcow: $d"; grep -E "^(HTTP_PORT|HTTPS_PORT|ENABLE_IPV6|MAILCOW_HOSTNAME)=" $d/mailcow.conf;
  ls -la $d/docker-compose.override.yml $d/data/conf/nginx/ 2>&1;
  ufw status 2>/dev/null | head -5'
```

**Check:**
- At least 2 GB of RAM free after mailcow, and at least 10 GB of free disk.
- `HTTP_PORT=80` and `HTTPS_PORT=443`.
- Whether `docker-compose.override.yml` already exists. If it does, `server-setup.sh` stops and prints the lines to merge in by hand; show those lines to the owner first.

Report the findings to the owner before Step 4.

### Step 3 — Cloudflare (browser)

> **DONE 2026-10-08, with three findings that changed the plan.**
> 1. `A novixa.dev` and `CNAME`/`A www` already existed (Proxied → the VPS), so no DNS change was needed.
> 2. Four other proxied hostnames point at this VPS (`aqar-demo`, `aqar-landing-page`, `pizza-house`, `pizza-house66`) and currently serve mailcow's default UI. The owner will use them for Novixa product sites, so the zone-wide SSL mode stays `Full` (Automatic mode on). **Full (strict) is applied by a Configuration Rule scoped to `novixa.dev` and `www.novixa.dev` only** (`novixa-site-strict-ssl`); until the first deploy those two hostnames return 526, which is expected.
> 3. The origin presents only mailcow's Let's Encrypt certificate (`CN=mail.novixa.dev`) for every SNI name, which is why strict could not be zone-wide.
>
> The Origin certificate was created from a locally generated key and CSR (the private key never left the operator's machine); it covers `novixa.dev` and `*.novixa.dev`, valid until 2041-10-04, and was verified to match the key. *Always Use HTTPS* is on.

In the `novixa.dev` zone:

1. **DNS**
   - `A novixa.dev → 161.97.75.64`, Proxied.
   - `CNAME www → novixa.dev`, Proxied.
   - **Do not touch** `mail`, `autodiscover`, `autoconfig` or the MX record; they stay DNS-only.
2. **SSL/TLS → Overview:** set **Full (strict)**.
   - Mail is not affected: mail hostnames are DNS-only.
   - **Check first** whether any other proxied hostname on this zone serves a certificate Cloudflare would not accept. If one does, tell the owner before switching.
3. **SSL/TLS → Origin Server → Create Certificate**
   - RSA 2048; hostnames `novixa.dev` and `*.novixa.dev`; 15 years; PEM.
   - Save the files as `~/novixa-secrets/origin.pem` and `~/novixa-secrets/origin.key`, mode 600, **outside the repo**.
4. **SSL/TLS → Edge Certificates:** turn on *Always Use HTTPS*.

**Verify:**

```bash
dig +short novixa.dev        # Cloudflare IPs, not 161.97.75.64 (proxied)
dig +short mail.novixa.dev   # 161.97.75.64
```

### Step 4 — Prepare the server

> **DONE 2026-10-08.** `server-setup.sh` ran without errors: the `novixa` user and `/opt/novixa`, the deploy key, the `novixa-edge` network, mailcow's `docker-compose.override.yml`, and a recreated `nginx-mailcow` (`nginx -t` ok). Mail was checked from outside before and after and is identical: ports 25, 465, 587, 993, 995, 143 and 4190 open, IMAP answers, the mail UI and SOGo return 200. `VPS_KNOWN_HOSTS` matches the host key already pinned locally. The five `VPS_*` values and the Origin certificate and key are stored as secrets of the `production` environment.

```bash
scp deploy/scripts/server-setup.sh root@161.97.75.64:/root/novixa-setup.sh
ssh -t root@161.97.75.64 'bash /root/novixa-setup.sh' | tee ~/novixa-secrets/setup-output.txt
chmod 600 ~/novixa-secrets/setup-output.txt
```

The script asks before it recreates `nginx-mailcow`. **Tell the owner first:** the mail web UI is unavailable for a few seconds, and SMTP/IMAP are not affected.

The output contains `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_KNOWN_HOSTS` and a one-time private key (`VPS_SSH_KEY`).

- Check that `VPS_HOST` is the public IP `161.97.75.64`, not a private address.
- If `VPS_KNOWN_HOSTS` shows a placeholder, replace it with the output of `ssh-keyscan -t ed25519 161.97.75.64`.

**Verify:**

```bash
ssh root@161.97.75.64 'id novixa; docker network ls | grep novixa-edge; docker exec $(docker ps -qf label=com.docker.compose.service=nginx-mailcow) nginx -t'
```

Then confirm mail still works: open `https://mail.novixa.dev`, and send and receive one message.

### Step 5 — mailcow mailboxes and email DNS

**In the mailcow UI (browser):**

1. Create mailbox **`no-reply@novixa.dev`** with a generated 24+ character password. Store it at `~/novixa-secrets/smtp-password` (mode 600). The **owner** sets the password, or the agent generates it, but the agent never prints it.
2. Make sure **`hello@novixa.dev`** exists (mailbox or alias) and that the owner reads it.
3. **Configuration → ARC/DKIM keys:** generate a 2048-bit key for `novixa.dev` with selector `dkim`, and copy the TXT value it shows.

**In Cloudflare DNS, add (all DNS-only):**
- `TXT dkim._domainkey` → the DKIM value from mailcow
- `TXT novixa.dev` → `v=spf1 mx ~all`. Merge with any existing SPF record; a domain must have only **one** SPF record.
- `TXT _dmarc` → `v=DMARC1; p=none; rua=mailto:postmaster@novixa.dev`

**In the Contabo panel:** set reverse DNS (PTR) for `161.97.75.64` to `mail.novixa.dev`.

**Verify:**

```bash
dig +short TXT novixa.dev; dig +short TXT _dmarc.novixa.dev; dig +short TXT dkim._domainkey.novixa.dev
dig +short -x 161.97.75.64      # mail.novixa.dev.
```

Then send a test from `no-reply@` to the address `https://www.mail-tester.com` gives you. **Target score: 9/10 or higher.** Fix what it reports before going on.

### Step 6 — GitHub environment, secrets and variables

Run from the repo, reading every value from a file or prompt, never from the command line:

```bash
R=Novixa-dev/novixa
gh api -X PUT repos/$R/environments/production >/dev/null

# From setup-output.txt (copy each value into its own file first, mode 600):
tr -d '\n' < ~/novixa-secrets/vps_host | gh secret set VPS_HOST --env production --repo $R
tr -d '\n' < ~/novixa-secrets/vps_port | gh secret set VPS_PORT --env production --repo $R
gh secret set VPS_USER        --env production --repo $R --body novixa
gh secret set VPS_KNOWN_HOSTS --env production --repo $R < ~/novixa-secrets/known_hosts
gh secret set VPS_SSH_KEY     --env production --repo $R < ~/novixa-secrets/deploy_key
gh secret set CF_ORIGIN_CERT  --env production --repo $R < ~/novixa-secrets/origin.pem
gh secret set CF_ORIGIN_KEY   --env production --repo $R < ~/novixa-secrets/origin.key
tr -d '\n' < ~/novixa-secrets/smtp-password | gh secret set SMTP_PASSWORD --env production --repo $R
gh secret set ADMIN_EMAIL     --env production --repo $R      # prompts; the owner's admin login email
gh secret set ADMIN_PASSWORD  --env production --repo $R      # prompts; the OWNER types it (12+ chars)

gh variable set SMTP_HOST     --repo $R --body mail.novixa.dev
gh variable set SMTP_PORT     --repo $R --body 587
gh variable set SMTP_USER     --repo $R --body no-reply@novixa.dev
gh variable set MAIL_FROM     --repo $R --body 'Novixa <no-reply@novixa.dev>'
gh variable set CONTACT_EMAIL --repo $R --body hello@novixa.dev
gh variable set SITE_URL      --repo $R --body https://novixa.dev
# Only if the owner gives a real number (digits only, international format):
# gh variable set WHATSAPP_NUMBER --repo $R --body 9677XXXXXXXX
```

**Verify:**

```bash
gh secret list --env production --repo $R   # 10 names
gh variable list --repo $R
```

No value may contain a single quote or a line break; `render-app-env.mjs` refuses those.

Once deploys are working, delete `~/novixa-secrets/deploy_key`. GitHub holds the only copy it needs.

### Step 7 — First deploy

> **IN PROGRESS 2026-10-08.** Step 6 is complete (10 secrets in the `production` environment, 6 repository variables) and `DEPLOY_ENABLED=true`. The first dispatch (run 37834549266) failed in the image job, before reaching the server, with `invalid tag "ghcr.io/Novixa-dev/novixa:…": repository name must be lowercase`: the workflow used `github.repository`, and this organisation has a capital N. Fixed at the root (the name is lower-cased once in the build job and handed to the deploy job) with a regression test; see `docs/PRODUCTION_AUDIT.md` P2-15. The workflow runs from `main` only, so the fix has to be merged before the next attempt.

```bash
gh variable set DEPLOY_ENABLED --repo $R --body true
gh workflow run deploy.yml --repo $R --ref main
gh run watch --repo $R $(gh run list --repo $R --workflow deploy.yml --limit 1 --json databaseId -q '.[0].databaseId')
```

**Expect** the run to finish green, ending with `Live: https://novixa.dev (<sha>)`.

**On failure:**
1. Read the failing step's log: `gh run view --log-failed`.
2. On the server, look at `cd /opt/novixa && docker compose logs --tail=100 app`.
3. Fix the cause, then run again.

`deploy.sh` rolls back to the previous release by itself, and it restores the previous nginx files if `nginx -t` fails.

### Step 8 — Verify production (every line, in both languages)

```bash
U=https://novixa.dev
curl -s $U/api/health                                  # status ok, database ok, store postgres, mail smtp, version = main's sha
curl -sI $U/ | head -3                                  # 308 → /ar
curl -sI $U/ar | grep -iE 'HTTP/|strict-transport|x-frame|x-content-type'
curl -sI https://www.novixa.dev/en | grep -i location  # https://novixa.dev/en
curl -s $U/ar | grep -o '<link rel="canonical"[^>]*>' # https://novixa.dev/ar
curl -s $U/ar | grep -o 'property="og:image" content="[^"]*"'
curl -s $U/sitemap.xml | head -5; curl -s $U/robots.txt
curl -sI $U/ar/does-not-exist | head -1                # 404
```

Then, **in the browser**:

1. Open `/ar` and `/en` at phone, tablet and desktop widths. Check the RTL/LTR direction, the fonts, and that no page scrolls sideways.
2. Submit a real enquiry from `/ar/start-project`, using an address the owner can read (their Gmail):
   - The site shows success, with `delivered: true` in the network response.
   - The notification arrives at `hello@novixa.dev`, with *Open in the admin* and reply-to set to the visitor.
   - The Arabic acknowledgement arrives in the Gmail inbox (**check that it did not land in spam**).
3. Sign in at `/admin` with the owner's credentials:
   - The enquiry is listed.
   - Change its stage and add a note, reload, and confirm both stuck.
   - Export the CSV and open it in Excel; the Arabic should be intact.
   - Then delete the test lead.
4. Paste `https://novixa.dev/ar` into a social card debugger (LinkedIn Post Inspector, or WhatsApp) and confirm the image appears.
5. Run Lighthouse on the live site:

   ```bash
   npx lighthouse https://novixa.dev/ar --only-categories=accessibility,best-practices,seo
   ```

   **Expect 100/100/100**; anything less is a real regression.
6. Check backups on the server:

   ```bash
   ssh root@161.97.75.64 'ls -la /opt/novixa/backups; crontab -u novixa -l'
   ```

### Step 9 — After go-live

| Task | Why | How |
|---|---|---|
| Point Vercel at the primary domain | Otherwise `novixa-cyan.vercel.app` competes with `novixa.dev` in search | Vercel → Project → Settings → Environment Variables: `NEXT_PUBLIC_SITE_URL=https://novixa.dev`, then redeploy. Or ask the owner whether to remove the Vercel production deployment entirely |
| Railway | It is now redundant | Ask the owner whether to delete the project |
| Make the GHCR package public | Manual rollbacks then need no registry login | GitHub → Packages → `novixa` → Package settings → Public |
| Off-server backups | `/opt/novixa/backups` sits on the same disk | Contabo snapshots on a schedule, or an `rclone` cron to object storage the owner owns |
| Uptime monitoring | To know the site is down before a client does | A free monitor (e.g. UptimeRobot, on the owner's account) on `https://novixa.dev/api/health`, alerting by email |
| Search engines | Indexing | Google Search Console + Bing Webmaster: verify `novixa.dev` (DNS TXT) and submit `https://novixa.dev/sitemap.xml` |
| Tighten DMARC | After about 2 weeks of clean reports | `p=quarantine` |

### Step 10 — Notifications (current state and options)

**Today**, every new enquiry sends an email to `CONTACT_EMAIL`, and the visitor gets an acknowledgement. Both are proven end to end. No other channel exists.

If the owner wants instant phone alerts, the smallest honest addition is a **Telegram bot message** on each new lead:
- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as secrets
- one `fetch` in `src/app/api/contact/route.ts` after the lead is stored, failure logged and never fatal
- a unit test with a mocked fetch
- documentation in `deploy/README.md`

Build it only if the owner asks, and only with a bot token the owner creates. WhatsApp Business API needs a Meta business account and approval, so it is not a quick add.

---

## 4. Owner decisions (not engineering)

These cannot be completed by an agent. Ask for them; never invent them.

- A real WhatsApp number (the channel stays hidden until one is set)
- Legal review of `src/content/legal.ts` (`LEGAL_REVIEW_PENDING = true`)
- Real social profile URLs in `src/data/navigation.ts` (LinkedIn, GitHub, X); remove any that do not exist
- A native Arabic read-through of all copy
- Pricing, team members, client logos and testimonials, only with real, consented information

---

## 5. Definition of done

- [x] PR #2 merged, CI green on `main` (2026-10-08, `dbc5f7c`)
- [ ] `https://novixa.dev/api/health` → `status ok`, `database ok`, `store postgres`, `mail smtp`, version = latest `main` commit
- [ ] The Deploy workflow is green on a push to `main` (not only a manual run)
- [ ] Every Step 8 check passes, in Arabic and English, on phone and desktop
- [ ] A real enquiry was stored, shown in `/admin`, notified to `hello@`, and acknowledged to the visitor's inbox (not spam)
- [ ] mail-tester score of 9/10 or higher; SPF, DKIM, DMARC and PTR all in place
- [ ] mailcow mail is unaffected: send and receive both work
- [ ] Nightly backup present; off-server copy arranged
- [ ] Lighthouse 100/100/100 (accessibility, best practices, SEO) on the live `/ar` and `/en`
- [ ] Owner given an Arabic report: what is live, the admin URL, where backups are, and what is still theirs to decide (§4)
- [ ] This file updated: mark each step done with its date and result, so the next session starts from the truth
