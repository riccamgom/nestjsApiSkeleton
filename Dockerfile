FROM node:14.21.2
RUN mkdir /api
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:dev" ]