# Use Node.js base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY ./src/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the application
CMD ["node", "./src/main.js"]