https://hackernoon.com/building-a-serverless-rest-api-with-node-js-and-mongodb-2e0ed0638f47


sls create -t aws-nodejs -p rest-api && cd rest-api

sls offline start --skipCacheInvalidation

Source:
https://github.com/djizco/mern-client
https://github.com/djizco/mern-server




Server Routes
* /api
  * /auth
    * /register: POST
    * /login: POST
    * /logout: POST
  * /user
    * /: GET
    * /: PUT
    * /: DELETE
    * /password: POST
    * /complete: POST
  * /users
    * /checkusername: POST
  * /todos

npm install serv