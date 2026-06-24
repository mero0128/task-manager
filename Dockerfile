FROM node:24-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json .
COPY node_modules ./node_modules

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "server.js"]