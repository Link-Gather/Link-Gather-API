FROM node:16-alpine

WORKDIR /link-gather-api

COPY package*.json ./

RUN npm ci

ARG NODE_ENV
ARG DB_PORT
ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD

ENV NODE_ENV=$NODE_ENV \
    DB_PORT=$DB_PORT \
    DB_HOST=$DB_HOST \
    DB_NAME=$DB_NAME \
    DB_USER=$DB_USER \
    DB_PASSWORD=$DB_PASSWORD \

COPY . .

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]