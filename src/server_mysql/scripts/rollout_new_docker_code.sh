#!/bin/bash

rm -rf /opt/setup/pokemon-card-collection
git clone https://github.com/TeeWallz/pokemon-card-collection.git /opt/setup/pokemon-card-collection
cd /opt/setup/pokemon-card-collection/src/server_mysql

docker-compose build --no-cache
docker-compose down
docker-compose up
