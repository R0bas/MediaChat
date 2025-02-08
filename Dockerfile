FROM node:23-alpine3.20
RUN apk add --no-cache python3 py3-pip
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
COPY --chown=node:node package-lock.json .
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD ["npm", "run", "start"]