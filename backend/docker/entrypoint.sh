#!/bin/sh
set -e


# Ensure permissions (best-effort)
chown -R www-data:www-data /var/www || true

# Start php-fpm in background
php-fpm -D

# Start nginx in foreground (keeps container alive)
nginx -g 'daemon off;'