'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./src/db');
const Collection = require('./src/models/Collection');

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            console.log(event.body)
            Collection.create(JSON.parse(event.body))
                .then(collection => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(collection)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not create the collection.'
                }));
        });
};

module.exports.getOne = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Collection.findById(event.pathParameters.id)
                .then(collection => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(collection)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the collection.'
                }));
        });
};

module.exports.getAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Collection.find()
                .then(collections => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(collections)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the collections.'
                }))
        });
};

module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Collection.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
                .then(collection => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(collection)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the collections.'
                }));
        });
};

module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Collection.findByIdAndRemove(event.pathParameters.id)
                .then(collection => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Removed collection with id: ' + collection._id, collection: collection })
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the collections.'
                }));
        });
};