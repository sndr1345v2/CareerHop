FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY client/ ./client/
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["npm", "start"]