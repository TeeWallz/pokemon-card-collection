FROM node:17-alpine3.14

RUN apk add --no-cache git

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/git
RUN git clone https://github.com/TeeWallz/pokemon-card-collection.git /usr/src/git
RUN cp -r /usr/src/git/src/server_mysql/* /usr/src/app/

# Create app directory
RUN npm install --legacy-peer-deps

EXPOSE 8080
CMD [ "node", "server.js" ]