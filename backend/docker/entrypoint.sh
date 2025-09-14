#!/bin/sh
set -e

echo ">>> entrypoint: ensure permissions"
chown -R www-data:www-data /var/www || true

echo ">>> testing nginx configuration"
/usr/sbin/nginx -t 2>&1 || {
  echo "==== NGINX CONFIG TEST FAILED - dump below ===="
  /usr/sbin/nginx -T || true
  echo "---- /etc/nginx/conf.d content ----"
  ls -la /etc/nginx/conf.d || true
  cat /etc/nginx/conf.d/default.conf || true
  exit 1
}

echo ">>> starting php-fpm in background"
php-fpm -D

# small wait to ensure php-fpm is up (helps evitar race)
sleep 0.5

echo ">>> starting nginx in foreground"
# run nginx in foreground so the container stays alive
nginx -g 'daemon off;'
