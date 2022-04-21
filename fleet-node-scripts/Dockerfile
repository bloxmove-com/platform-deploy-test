FROM node:16.14.2-buster

COPY .npmrc package.json package-lock.json ./
COPY ./fleet-node-scripts ./

RUN npm install
RUN rm -f .npmrc