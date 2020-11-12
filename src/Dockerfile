FROM node:alpine
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install --no-optional --only-production
COPY . .
CMD npm start