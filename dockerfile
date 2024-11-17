# Stage 1: Build Stage
FROM node:22.10.0-slim AS build

WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies and build the app
RUN yarn install --frozen-lockfile && yarn build && yarn cache clean

# Stage 2: Production Stage
FROM node:22.10.0-slim

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app /app

# Command to run the app
CMD ["yarn", "start"]
