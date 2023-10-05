# syntax=docker/dockerfile:1
FROM node:14.19.0 AS build
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html