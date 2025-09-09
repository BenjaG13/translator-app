# Etapa de build para Python
# ---------------------------
FROM python:3.11-slim AS python-build

# Dependencias del sistema necesarias para compilar paquetes científicos
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libblas-dev \
    liblapack-dev \
    gfortran \
    libopenblas-dev \
    ca-certificates \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Crear el virtualenv en /opt/venv
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Mejorar pip y usar prefer-binary cuando convenga
RUN python -m pip install --upgrade pip setuptools wheel

# Instalar paquetes Python en el venv
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
# (copiamos /usr/local/bin y /usr/local/lib para incluir el intérprete y libs necesarias)
COPY --from=python-build /usr/local/bin /usr/local/bin
COPY --from=python-build /usr/local/lib /usr/local/lib
COPY --from=python-build /opt/venv /opt/venv

# Añadir venv al PATH
ENV PATH="/opt/venv/bin:${PATH}"

# Instalar extensiones y dependencias del sistema para PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev \
    zip \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Directorio de trabajo
WORKDIR /var/www

# COPIAR código de la aplicación (context = backend)
COPY . .

# ---------------------------
# Etapa de desarrollo
# ---------------------------
FROM base AS development

# Instalar dependencias de Composer para desarrollo
RUN composer install --no-dev --optimize-autoloader || true
# (se usa --no-dev para evitar problemas en caso de que quieras que dev deps estén en host;
# ajustá a `--dev` si querés deps dev en contenedor)

CMD ["php-fpm"]

# ---------------------------
# Etapa de producción
# ---------------------------
FROM base AS production

# Instalar dependencias de Composer para producción
RUN composer install --no-dev --optimize-autoloader

# Permisos
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

CMD ["php-fpm"]