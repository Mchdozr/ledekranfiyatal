# inwelt.com.tr — sunucu deploy

`inwelt-app` GitHub reposuna bu ortamdan push yapılamıyor. Aşağıdaki dosyalar canlıya kopyalanmalı.

## SSH / Plesk terminal

```bash
cd /var/www/vhosts/inwelt.com.tr/httpdocs

# ledekranfiyatal repo'dan (veya bu klasörden) dosyaları kopyala:
# public/.htaccess
# routes/web.php
# resources/views/pages/contact.blade.php
# resources/views/layouts/app.blade.php
# app/Filament/Pages/SiteSettings.php

php artisan view:clear
php artisan cache:clear
php artisan route:clear
```

## Patch ile (git repo içindeysen)

```bash
cd /var/www/vhosts/inwelt.com.tr/httpdocs
git apply /path/to/deploy/inwelt-app-patches/*.patch
php artisan view:clear && php artisan cache:clear
```

## Kendi PC'nden inwelt-app GitHub'a push

```bash
cd inwelt-app
git pull origin main
# bu deploy/inwelt-app dosyalarını üzerine kopyala
git add -A
git commit -m "Fix homepage redirect and WhatsApp-only public contact"
git push origin main
```

Sonra sunucuda: `git pull && php artisan view:clear`
