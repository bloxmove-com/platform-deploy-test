FROM node:16

COPY .npmrc package.json package-lock.json ./
RUN npm install
RUN rm -f .npmrc

COPY ./fleet-node-scripts ./
