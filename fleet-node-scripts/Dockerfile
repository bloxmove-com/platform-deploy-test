FROM node:16.14.2-buster

COPY .npmrc package.json package-lock.json ./
RUN npm install
RUN rm -f .npmrc

COPY ./fleet-node-scripts ./