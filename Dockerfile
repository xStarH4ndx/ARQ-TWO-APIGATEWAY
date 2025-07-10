# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala todas las dependencias (dev incluidas para build)
RUN npm install

# Copiar el código fuente completo
COPY . .

# Construir la app (generará dist/)
RUN npm run build

# Etapa 2: Producción
FROM node:22-alpine

WORKDIR /app

# Copiar solo package.json y package-lock.json para instalar solo prod deps
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

# Copiar el build generado desde la etapa builder
COPY --from=builder /app/dist ./dist

# Copiar otros archivos necesarios (ejemplo: .env o config)
# COPY .env .env

# Exponer el puerto (ajustar según tu app, por defecto 3000)
EXPOSE 3000

# Comando para ejecutar la app compilada
CMD ["node", "dist/main.js"]
