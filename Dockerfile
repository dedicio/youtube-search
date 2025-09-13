# Use a base image with Node.js to build the app
FROM node:lts-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the static web app (if applicable, e.g., React, Vue, Angular)
RUN npm run build

# Use a lightweight web server image to serve the static files
FROM nginx:alpine

# Copy the built static files from the builder stage to Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
