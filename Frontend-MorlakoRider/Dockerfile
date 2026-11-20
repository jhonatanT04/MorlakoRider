# Morlako Rider: frontend estático (React + Vite, cada página prerenderizada) servido con nginx.
#   docker build -t morlako-frontend .
#   docker run -d --name morlako -p 8080:80 morlako-frontend      ->  http://localhost:8080

# 1) build: compila y prerenderiza todas las rutas en dist/
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) runtime: solo los archivos estáticos detrás de nginx
FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
