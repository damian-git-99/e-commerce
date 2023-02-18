FROM node:16.3.0-alpine as dev-deps
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

# FROM node:16.3.0-alpine as dev-deps
# WORKDIR /app
# COPY package.json .
# RUN npm i

# FROM node:16.3.0-alpine as builder
# WORKDIR /app
# COPY --from=dev-deps /app/node_modules ./node_modules
# COPY . .
# RUN npm test

# FROM node:16.3.0-alpine as prod
# WORKDIR /app
# EXPOSE 5000
# COPY --from=prod-deps /app/node_modules ./node_modules