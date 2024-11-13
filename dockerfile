FROM node:22.10.0-slim

WORKDIR /app

COPY ./ ./

RUN yarn install&&yarn build&&yarn cache clean

CMD ["yarn", "start"]