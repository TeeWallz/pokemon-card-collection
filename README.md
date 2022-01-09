https://www.bezkoder.com/react-node-mongodb-auth/
https://www.bezkoder.com/node-js-mongodb-auth-jwt/

Same front end?


# To push new code
        rm -rf /opt/setup/pokemon-card-collection
        git clone https://github.com/TeeWallz/pokemon-card-collection.git /opt/setup/pokemon-card-collection
        cd /opt/setup/pokemon-card-collection/src/server_mysql

        docker-compose build --no-cache
        docker-compose down
        docker-compose up
