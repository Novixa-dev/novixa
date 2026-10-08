#!/usr/bin/env bash
# ==============================================================================
# Read-only health check of the live site. Changes nothing, sends no form.
#
#   bash scripts/verify-live.sh                      # checks https://novixa.dev
#   bash scripts/verify-live.sh https://novixa.dev   # or any other origin
#
# Prints PASS/FAIL per check and exits non-zero if any failed. Needs only
# bash and curl. Run it after every deploy, and any time something feels off.
# It checks: the health endpoint and the deployed commit, routing and
# redirects, security headers, canonical/hreflang/Open Graph, sitemap and
# robots, and that the admin is private. What it cannot check is mail
# delivery and the admin login; docs/OWNER_OPERATIONS_GUIDE.md covers those.
# ==============================================================================
U="${1:-https://novixa.dev}"; ok=0; bad=0
chk() { if [ "$2" = "1" ]; then printf 'PASS  %s\n' "$1"; ok=$((ok+1)); else printf 'FAIL  %s  -> %s\n' "$1" "$3"; bad=$((bad+1)); fi; }
hdr() { curl -sI -m 20 "$1" | tr -d '\r'; }
code() { curl -s -o /dev/null -m 20 -w '%{http_code}' "$1"; }

echo "== health"; H=$(curl -s -m 20 "$U/api/health"); echo "$H"
for k in '"status":"ok"' '"database":"ok"' '"store":"postgres"' '"mail":"smtp"'; do [[ "$H" == *"$k"* ]] && chk "health has $k" 1 || chk "health has $k" 0 "$H"; done
SHA=$(cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" && git rev-parse --short=12 origin/main 2>/dev/null); [[ -n "$SHA" && "$H" == *"\"version\":\"$SHA\""* ]] && chk "health version = origin/main ($SHA)" 1 || chk "health version = origin/main ($SHA)" 0 "$H"

echo "== routing"
r=$(hdr "$U/"); [[ "$r" == *"308"* && "$r" == *"/ar"* ]] && chk "/ -> 308 /ar" 1 || chk "/ -> 308 /ar" 0 "$(echo "$r"|head -3|tr '\n' ' ')"
[ "$(code "$U/ar")" = 200 ] && chk "/ar 200" 1 || chk "/ar 200" 0 "$(code "$U/ar")"
[ "$(code "$U/en")" = 200 ] && chk "/en 200" 1 || chk "/en 200" 0 "$(code "$U/en")"
[ "$(code "$U/ar/does-not-exist")" = 404 ] && chk "unknown page 404" 1 || chk "unknown page 404" 0 "$(code "$U/ar/does-not-exist")"
[ "$(code "$U/xx")" = 404 ] && chk "unknown locale 404" 1 || chk "unknown locale 404" 0 "$(code "$U/xx")"
l=$(hdr "https://www.novixa.dev/en" | grep -i '^location:'); [[ "$l" == *"https://novixa.dev/en"* ]] && chk "www/en -> apex /en" 1 || chk "www/en -> apex /en" 0 "$l"
l=$(hdr "http://novixa.dev/ar" | grep -i '^location:'); [[ "$l" == *"https://"* ]] && chk "http -> https" 1 || chk "http -> https" 0 "$l"

echo "== security headers on /ar"; h=$(hdr "$U/ar")
for k in strict-transport-security x-content-type-options x-frame-options referrer-policy permissions-policy; do echo "$h" | grep -qi "^$k:" && chk "header $k" 1 || chk "header $k" 0 "missing"; done

echo "== SEO"
for L in ar en; do p=$(curl -s -m 20 "$U/$L"); echo "$p" | grep -q "rel=\"canonical\" href=\"$U/$L\"" && chk "/$L canonical" 1 || chk "/$L canonical" 0 "$(echo "$p"|grep -o '<link rel="canonical"[^>]*>')"; echo "$p" | grep -qi 'hreflang' && chk "/$L hreflang" 1 || chk "/$L hreflang" 0 none; echo "$p" | grep -q "property=\"og:image\" content=\"$U" && chk "/$L og:image on this origin" 1 || chk "/$L og:image on this origin" 0 "$(echo "$p"|grep -o 'property="og:image"[^>]*>' | head -1)"; done
og=$(curl -s -m 20 "$U/ar" | grep -o 'property="og:image" content="[^"]*"' | head -1 | sed 's/.*content="//;s/"$//' | sed 's/&amp;/\&/g'); t=$(curl -s -o /dev/null -m 30 -w '%{http_code} %{content_type}' "$og"); [[ "$t" == "200 image/png"* ]] && chk "og:image serves a PNG" 1 || chk "og:image serves a PNG" 0 "$t"
curl -s -m 20 "$U/sitemap.xml" | grep -q "<loc>$U/ar</loc>" && chk "sitemap names this origin" 1 || chk "sitemap names this origin" 0 "no $U/ar"
curl -s -m 20 "$U/robots.txt" | grep -qi "sitemap: $U/sitemap.xml" && chk "robots names the sitemap" 1 || chk "robots names the sitemap" 0 "$(curl -s -m 20 "$U/robots.txt" | tr '\n' ' ')"

echo "== admin"
[ "$(code "$U/admin/login")" = 200 ] && chk "/admin/login 200" 1 || chk "/admin/login 200" 0 "$(code "$U/admin/login")"
a=$(hdr "$U/admin"); echo "$a" | grep -qiE '^location: .*/admin/login|^HTTP/[0-9.]+ (307|302|303)' && chk "/admin redirects to login when signed out" 1 || chk "/admin redirects to login" 0 "$(echo "$a"|head -2|tr '\n' ' ')"
curl -s -m 20 "$U/admin/login" | grep -qi '<meta name="robots" content="noindex' && chk "/admin/login is noindex (meta)" 1 || chk "/admin/login is noindex (meta)" 0 "no robots meta"
echo; echo "RESULT: $ok passed, $bad failed"; [ "$bad" = 0 ]
