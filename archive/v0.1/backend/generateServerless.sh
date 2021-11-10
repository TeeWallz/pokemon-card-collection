#!/bin/bash

sls create -t aws-nodejs -p rest-api
cd rest-api

npm init -y
npm i --save-dev serverless-offline
npm i --save mongoose dotenv
