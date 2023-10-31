# Use an official Node.js runtime as a parent image
FROM node:16-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy all local files to the container
COPY . .
COPY ./manifest.json /manifest.json

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]