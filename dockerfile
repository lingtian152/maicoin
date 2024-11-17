# Use an official Node.js image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files first (if they exist)
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY ./ ./

# Expose the application port
EXPOSE 7008

# 默认命令: 同时运行 services 和 dev
CMD ["npm", "run", "serivces", "&&", "npm", "run", "dev"]


