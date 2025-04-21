# Cambia la imagen base a PHP 8.2 con FPM
FROM php:8.2-fpm

# Instala las dependencias del sistema y extensiones de PHP necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo_mysql zip

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia los archivos de tu proyecto al contenedor
COPY backend/ .


COPY backend/php-fpm.conf /usr/local/etc/php-fpm.d/zz-custom.conf

# Instala las dependencias de Composer
RUN composer install

# Inicia PHP-FPM
CMD ["php-fpm"]