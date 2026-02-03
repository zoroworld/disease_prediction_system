# frontend/Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pass ARG from docker-compose
ARG VITE_REACT_APP_DEV
ENV VITE_REACT_APP_DEV=$VITE_REACT_APP_DEV

# --- Dev Stage ---
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# --- Prod Stage ---
FROM base AS prod
RUN npm run build
FROM nginx:alpine
COPY --from=prod /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
