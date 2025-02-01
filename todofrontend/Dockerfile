# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the frontend project files
COPY . /app/

# Install dependencies
RUN npm install

# Build the frontend
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Command to serve the build using a simple HTTP server
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
