# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Build the frontend

# Expose port (not required since frontend is accessed through backend)
EXPOSE 3000

# Start the frontend server
CMD ["npm", "run" , "start"]