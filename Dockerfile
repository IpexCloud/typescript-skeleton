FROM node:16.18.0-bullseye-slim

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV production

RUN npm i 

COPY . .

CMD ["npm", "start"]
