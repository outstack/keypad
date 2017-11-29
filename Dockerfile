FROM node:9.2-alpine
RUN npm install -g nodemon
RUN mkdir /app
WORKDIR /app
ADD package.json /app
RUN npm install
ADD server.js /app
CMD ["node", "/app/server.js"]
EXPOSE 3000
