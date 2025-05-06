# Cambia la imagen base a PHP 8.2 con FPM
FROM php:8.2-fpm

# Instala las dependencias del sistema y extensiones de PHP necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo_mysql zip

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


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

# Copia los archivos de tu proyecto al contenedor
COPY backend/ .


COPY backend/php-fpm.conf /usr/local/etc/php-fpm.d/zz-custom.conf

# Instala las dependencias de Composer
RUN composer install

# Inicia PHP-FPM
CMD ["php-fpm"]