# Usa la imagen base de Node.js
FROM node:21-alpine3.19

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia los archivos necesarios para instalar las dependencias
COPY package.json .
COPY package-lock.json .

# Instala las dependencias con pnpm
RUN pnpm install

# Copia el resto del código de la aplicación
COPY . .

# Especifica el comando por defecto
#CMD ["pnpm", "start"]
