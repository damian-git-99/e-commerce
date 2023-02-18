FROM node:16.3.0-alpine as dev-deps
WORKDIR /app
COPY package.json .
RUN npm i
COPY ./src ./src
COPY ./config ./config
COPY ./.env ./env
EXPOSE 5000
CMD ["node", "src/server.js"]