#!/usr/bin/env bash
# Vercel production env kurulumu.
# Gereksinim: vercel login veya VERCEL_TOKEN ortam degiskeni.
#
# Kullanim:
#   export VERCEL_TOKEN=...
#   export SUPABASE_SERVICE_ROLE_KEY=eyJ...
#   ./scripts/setup-vercel-env.sh

set -euo pipefail

PROJECT="${VERCEL_PROJECT:-ledekranfiyatal}"
SCOPE="${VERCEL_SCOPE:-}"

SUPABASE_URL="${SUPABASE_URL:-https://haoecdadmkvayasivodc.supabase.co}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-}"
ADMIN_SESSION_SECRET="${ADMIN_SESSION_SECRET:-$(openssl rand -base64 32)}"
NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://ledekranfiyatal.com}"
CALL_MODE="${CALL_MODE:-mock}"

if [[ -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]]; then
  echo "HATA: SUPABASE_SERVICE_ROLE_KEY tanimli degil."
  echo "Supabase Dashboard → Settings → API → service_role"
  exit 1
fi

if [[ -z "$ADMIN_PASSWORD" ]]; then
  ADMIN_PASSWORD="$(openssl rand -base64 18)"
  echo "Olusturulan ADMIN_PASSWORD: $ADMIN_PASSWORD"
fi

scope_args=()
if [[ -n "$SCOPE" ]]; then
  scope_args=(--scope "$SCOPE")
fi

add_env() {
  local key="$1"
  local value="$2"
  printf '%s' "$value" | npx vercel env add "$key" production \
    --force \
    "${scope_args[@]}" \
    --yes 2>/dev/null || printf '%s' "$value" | npx vercel env add "$key" production "${scope_args[@]}"
  echo "  + $key"
}

echo "Vercel env ekleniyor (proje: $PROJECT)..."
cd "$(dirname "$0")/.."

add_env "SUPABASE_URL" "$SUPABASE_URL"
add_env "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY"
add_env "ADMIN_PASSWORD" "$ADMIN_PASSWORD"
add_env "ADMIN_SESSION_SECRET" "$ADMIN_SESSION_SECRET"
add_env "NEXT_PUBLIC_SITE_URL" "$NEXT_PUBLIC_SITE_URL"
add_env "CALL_MODE" "$CALL_MODE"

echo ""
echo "Tamam. Son adim: Vercel Dashboard → Deployments → Redeploy"
echo "Admin giris sifresi: $ADMIN_PASSWORD"
