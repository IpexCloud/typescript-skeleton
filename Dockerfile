FROM node:16.14.0-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm prune --production

CMD ["dumb init" , "node" , "./build/src/main.js"]
