# Etapa base: Configuración común para desarrollo y producción
FROM php:8.2-fpm AS base

# Instala dependencias del sistema y extensiones de PHP
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala Python y dependencias
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir setuptools wheel cython \
    && pip install --no-cache-dir numpy==1.26.4 \
    && pip install --no-cache-dir typing-extensions==4.4.0 \
    && pip install --no-cache-dir spacy==3.5.0 \
    && python -m spacy download en_core_web_sm

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia los archivos del proyecto
COPY backend/ .

# Copia la configuración de PHP-FPM
#COPY backend/php-fpm.conf /usr/local/etc/php-fpm.d/zz-custom.conf

# Etapa de desarrollo
FROM base AS development

# Instala dependencias de Composer, incluyendo las de desarrollo
RUN composer install --dev

# Inicia PHP-FPM
CMD ["php-fpm"]

# Etapa de producción
FROM base AS production

# Instala solo las dependencias de producción y optimiza el autoloader
RUN composer install --no-dev --optimize-autoloader

# Establece permisos para Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# Inicia PHP-FPM
CMD ["php-fpm"]