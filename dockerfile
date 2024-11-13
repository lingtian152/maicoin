FROM node:22.10.0-slim

WORKDIR /app

COPY ./ ./

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]
