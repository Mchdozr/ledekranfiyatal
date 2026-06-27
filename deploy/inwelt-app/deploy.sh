#!/bin/bash
# inwelt-app canlı dizinine dosyaları kopyalar.
# Kullanım: ./deploy.sh /var/www/vhosts/inwelt.com.tr/httpdocs

set -euo pipefail

TARGET="${1:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ -z "$TARGET" || ! -d "$TARGET" ]]; then
  echo "Kullanım: $0 /var/www/vhosts/inwelt.com.tr/httpdocs"
  exit 1
fi

cp "$SCRIPT_DIR/public/.htaccess" "$TARGET/public/.htaccess"
cp "$SCRIPT_DIR/routes/web.php" "$TARGET/routes/web.php"
cp "$SCRIPT_DIR/resources/views/pages/contact.blade.php" "$TARGET/resources/views/pages/contact.blade.php"
cp "$SCRIPT_DIR/resources/views/layouts/app.blade.php" "$TARGET/resources/views/layouts/app.blade.php"
cp "$SCRIPT_DIR/app/Filament/Pages/SiteSettings.php" "$TARGET/app/Filament/Pages/SiteSettings.php"

cd "$TARGET"
php artisan view:clear
php artisan cache:clear
php artisan route:clear

echo "Tamam: redirect fix + WhatsApp-only iletişim uygulandı."
