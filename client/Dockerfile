# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set the API URL at build time. 
# You can override this in Azure by passing --build-arg VITE_API_BASE_URL=https://your-backend-url.azurewebsites.net/api
ARG VITE_API_BASE_URL=http://localhost:5555/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
