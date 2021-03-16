FROM node:15-alpine
USER node
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node ./build/ ./
EXPOSE 3001 3002
CMD [ "node", "server.js" ]