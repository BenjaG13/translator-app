# Etapa base: Configuración común
FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

# Etapa de desarrollo
FROM base AS development

# Instala todas las dependencias, incluyendo las de desarrollo
RUN npm install

# Copia el resto del código
COPY . .

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "start"]

# Etapa de construcción para producción
FROM base AS builder

# Instala solo las dependencias de producción
RUN npm install --production

# Copia el resto del código y construye los assets estáticos
COPY . .
RUN # Etapa base: Configuración común
FROM node:alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

# Etapa de desarrollo
FROM base AS development

# Instala todas las dependencias, incluyendo las de desarrollo
RUN npm install

# Copia el resto del código
COPY . .

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "start"]

# Etapa de construcción para producción
FROM base AS builder

# Instala solo las dependencias de producción
RUN npm install --production

# Copia el resto del código y construye los assets estáticos
COPY . .
RUN npm run build 

# Etapa de producción
FROM nginx:alpine AS production

# Copia los assets construidos desde la etapa builder
COPY --from=builder /app/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]

# Etapa de producción
FROM nginx:alpine AS production

# Copia los assets construidos desde la etapa builder
COPY --from=builder /app/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]