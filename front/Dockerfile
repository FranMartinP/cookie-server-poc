FROM node:12.16.1-alpine as build-stage

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm audit fix

EXPOSE 5000

CMD ["npm", "run", "start"]

# etapa de producción
# FROM nginx:1.13.12-alpine as production-stage
# COPY --from=build-stage /usr/src/app /usr/share/nginx/html
# EXPOSE 5000
# CMD ["nginx", "-g", "daemon off;"]