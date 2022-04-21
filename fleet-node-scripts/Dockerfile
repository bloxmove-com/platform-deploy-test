FROM node:16

COPY .npmrc .npmrc
COPY package*.json ./

RUN npm install
RUN rm -f .npmrc

COPY . .