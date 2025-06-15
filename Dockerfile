# --- STAGE 1: Build Stage ---
# Usamos Node.js 22 basado en la dependencia @types/node en tu package.json
FROM node:22-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
# Esto optimiza el uso del caché de Docker
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para la compilación)
RUN npm install

# Copiar el resto del código fuente de tu proyecto
COPY . .

# Compilar la aplicación NestJS
# Esto generará el código JavaScript compilado en la carpeta 'dist'
RUN npm run build

# --- STAGE 2: Production Stage ---
# Usar una imagen más ligera para la producción
FROM node:22-alpine AS production

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de dependencias para instalar las de producción
COPY package*.json ./

# Instalar solo las dependencias de producción (excluyendo las de desarrollo)
RUN npm install --omit=dev

# Copiar el código compilado desde la etapa de construcción
# La carpeta 'dist' contiene tu aplicación NestJS compilada
COPY --from=build /app/dist ./dist

# Copiar el archivo .env desde la etapa de construcción.
# ¡Recordatorio de seguridad! Para producción, considera usar variables de entorno o secretos de K8s.
COPY --from=build /app/.env ./.env

# Exponer el puerto que usa tu API Gateway
# Por defecto, NestJS usa el puerto 3000. Confirma en tu main.ts si es diferente.
EXPOSE 3000

# Comando para ejecutar la aplicación NestJS en producción
# El script 'start:prod' de tu package.json es ideal para esto
CMD ["npm", "run", "start:prod"]