# Step 1: Use a Node.js image to build the app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use an Nginx image to serve the static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: Copy a custom nginx config if needed, otherwise use default
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
