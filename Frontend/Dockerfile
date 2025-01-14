# Build stage
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["npm", "run", "dev"]