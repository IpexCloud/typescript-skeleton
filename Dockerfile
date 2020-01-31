FROM node:12.14.1-buster

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

RUN npm run build

CMD ["npm", "start"]
