# ---------- Base ----------
    FROM node:20-alpine AS base
    WORKDIR /app
    
    # Install dependencies first (cached)
    COPY package*.json ./
    RUN npm install
    
    # Pass ARG from docker-compose
    ARG VITE_REACT_APP_DEV
    ENV VITE_REACT_APP_DEV=$VITE_REACT_APP_DEV
    
    # ---------- Dev Stage ----------
    FROM base AS dev
    COPY . .
    EXPOSE 5173
    CMD ["npm", "run", "dev", "--", "--host"]
    
    # ---------- Build Stage ----------
    FROM base AS build
    COPY . .
    RUN npm run build
    
    # ---------- Prod Stage ----------
    FROM nginx:alpine AS prod
    COPY --from=build /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    