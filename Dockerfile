# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.17
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /code
COPY --from=build-stage /app/dist .
EXPOSE 8080:8080
# CMD ["/bin/bash", "-c", "export VUE_APP_PROXY_PASS_URL && envsubst '$$VUE_APP_PROXY_PASS_URL' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
CMD ["nginx", "-g", "daemon off;"]
