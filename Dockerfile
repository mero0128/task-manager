# Start from official Node.js image
FROM node:24-slim

# Set working directory inside container
WORKDIR /app

# Copy package.json first
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Command to run the app
CMD ["node", "index.js", "list"]