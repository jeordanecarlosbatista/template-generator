FROM node:16

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./dist .

EXPOSE 3000

CMD npm start