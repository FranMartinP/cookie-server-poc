FROM node:12.16.1-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm audit fix

EXPOSE 5000

CMD ["npm", "run", "start"]