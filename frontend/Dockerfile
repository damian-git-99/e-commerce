# Base image
FROM node:16.14.0-alpine3.14
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json files to container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application files to container
COPY . .
# Expose the port that the application will be listening on
EXPOSE 5173
# Start the application
CMD [ "npm", "run", "dev" ]