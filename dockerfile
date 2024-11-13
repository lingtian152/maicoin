# First stage: Node.js build stage
FROM node:22.10.0-slim

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY ./package.json ./yarn.lock /app/

# Install dependencies
RUN apt update && apt install -y yarn && yarn install

# Start application
CMD ["yarn", "start"]
