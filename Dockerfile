
#Docker image node 18
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

cmd npm run start