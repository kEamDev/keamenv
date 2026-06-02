FROM node:20-alpine

RUN apk add --no-cache iputils bind-tools busybox-extras

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src

EXPOSE 4000

CMD ["npm", "start"]
