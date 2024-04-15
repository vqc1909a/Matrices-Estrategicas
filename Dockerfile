# syntax=docker/dockerfile:1
ARG NODE_VERSION=14.19.0

# Fetching the latest node image on alpine linux
FROM node:${NODE_VERSION}-alpine AS development
# Declaring env
ENV NODE_ENV development
# Setting up the work directory
WORKDIR /app
# Installing dependencies
COPY ./package*.json ./
RUN npm install
# Copying all the files in our project
COPY ./ ./
# Starting our application
CMD npm start

FROM node:${NODE_VERSION} AS build
ENV NODE_ENV production
WORKDIR /app
COPY ./package*.json ./
RUN npm install --production
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx AS nginx
COPY --from=build /app/build /usr/share/nginx/html