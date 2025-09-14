# ---------------------------
# Etapa de build para Python
# ---------------------------
FROM python:3.11-slim AS python-build

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libblas-dev \
    liblapack-dev \
    gfortran \
    libopenblas-dev \
    ca-certificates \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN python -m pip install --upgrade pip setuptools wheel

RUN pip install --no-cache-dir cython \
 && pip install --no-cache-dir numpy==1.26.4 \
 && pip install --no-cache-dir typing-extensions==4.12.2 \
 && pip install --no-cache-dir spacy==3.7.5 \
 && python -m spacy download en_core_web_sm

# ---------------------------
# Etapa base: PHP + copia del runtime Python
# ---------------------------
FROM php:8.2-fpm AS base

# COPIAR EL RUNTIME DE PYTHON Y EL VENV desde python-build
COPY --from=python-build /usr/local/bin /usr/local/bin
COPY --from=python-build /usr/local/lib /usr/local/lib
COPY --from=python-build /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:${PATH}"

# Instalar nginx y dependencias de PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    libzip-dev \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Eliminar posibles archivos "default" que traiga nginx para evitar conflictos
RUN rm -f /etc/nginx/conf.d/default.conf || true \
 && rm -f /etc/nginx/conf.d/*default* || true \
 && rm -f /etc/nginx/sites-enabled/default || true \
 && rm -f /etc/nginx/sites-available/default || true

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Forzar php-fpm a escuchar en TCP 127.0.0.1:9000 (asegura conexión nginx -> php-fpm)
RUN sed -i 's|listen = .*|listen = 127.0.0.1:9000|' /usr/local/etc/php-fpm.d/www.conf

# Directorio de trabajo
WORKDIR /var/www

# Copiar código de la app (context backend)
COPY . .

# Copiar configuración y entrypoint (asegurate de tener estos archivos en backend/docker/)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exponer puerto HTTP (documentativo; Render detecta HTTP)
EXPOSE 80

# ---------------------------
# Etapa de desarrollo
# ---------------------------
FROM base AS development

RUN composer install --no-interaction --ignore-platform-reqs || true

CMD ["sh", "/usr/local/bin/entrypoint.sh"]

# ---------------------------
# Etapa de producción
# ---------------------------
FROM base AS production

RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

CMD ["sh", "/usr/local/bin/entrypoint.sh"]
