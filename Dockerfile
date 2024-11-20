FROM node:18.17.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g npm@9.6.1

COPY . .

RUN npm install nuxt

EXPOSE 3000

CMD npm run dev
