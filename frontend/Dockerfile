FROM node:16.3.0-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci 
COPY . .
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD [ "npx", "serve", "build" ]