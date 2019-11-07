FROM node:12.13.0-buster as builder

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

RUN npm run build

CMD ["npm", "start"]
