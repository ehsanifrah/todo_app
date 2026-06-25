# Use an official Node runtime
FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]