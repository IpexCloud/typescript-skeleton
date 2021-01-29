FROM node:12.14.1-buster

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

CMD ["npm", "start"]
