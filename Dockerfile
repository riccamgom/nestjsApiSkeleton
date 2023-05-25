FROM node:14.21.2-alpine
RUN mkdir /api
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 2222
