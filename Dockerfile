# Usa una imagen base de Node.js adecuada (ej. LTS)
# Considera usar node:20-alpine si esa es la versión que estás usando localmente.
# node:22-alpine es la última LTS, pero si tu proyecto fue desarrollado con 20, mejor usar 20.
FROM node:22-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
# Esto optimiza el uso del caché de Docker
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies como @nestjs/cli)
# Para desarrollo, necesitas las herramientas de desarrollo dentro del contenedor.
RUN npm install

# Copiar el resto del código fuente de tu proyecto.
# En desarrollo, generalmente quieres todo el código fuente.
COPY . .

# Exponer el puerto que usa tu API Gateway
# Por defecto, NestJS usa el puerto 3000. Confirma en tu main.ts si es diferente.
EXPOSE 3000

# Comando para ejecutar la aplicación NestJS en desarrollo.
# El script 'start:dev' de tu package.json es perfecto para esto,
# ya que incluye '--watch' para recargar automáticamente si hay cambios
# (aunque esto no es tan relevante en Kubernetes si no usas volúmenes persistentes para el código).
CMD ["npm", "run", "start:dev"]

# Notas adicionales para desarrollo:
# - No necesitas una etapa de 'build' separada porque estás incluyendo devDependencies y el código fuente completo.
# - El .env se copia directamente si está en tu directorio raíz.
# - imagePullPolicy en Kubernetes debería ser 'IfNotPresent' o 'Always' si construyes la imagen localmente.