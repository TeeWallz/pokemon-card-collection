require('dotenv').config({ path: 'src/handlers/variables.env' });
const connectToDatabase = require('../db');
const User = require('../models/User');
const passport = require('passport');

module.exports.Register = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const body = JSON.parse(event.body);

    // Check for required arguments
    if (!body.username || !body.password) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ message: 'Username and Password required' })
        })
        return;
    }
    body.username_case = body.username;
    body.username = body.username.toLowerCase();

    const { username } = body;

    console.log("Connecting to DB");
    connectToDatabase()
        .then(() => {
            console.log("Finding if User Exists");
            User.find({ username }, (err, users) => {
                if (err) {
                    callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({ message: 'Create user failed', err })
                    })
                    return;
                }
                if (users[0]) {
                    callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({ message: 'Username exists' })
                    })
                    return;
                }

                console.log("Loading user into model");
                const newUser = User(body);

                console.log("Hashing password");
                newUser.hashPassword().then(() => {
                    console.log("Saving user");
                    newUser.save((err, savedUser) => {
                        if (err || !savedUser) {
                            callback(null, {
                                statusCode: 400,
                                body: JSON.stringify({ message: 'Create user failed', err })
                            })
                            return;
                        } else {
                            callback(null, {
                                statusCode: 400,
                                body: JSON.stringify({ message: 'User created successfully', user: savedUser.hidePassword() })
                            })
                            return;
                        }
                    });
                });

            });
        });
};



module.exports.Login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const body = JSON.parse(event.body);

    // Check for required arguments
    if (!body.username || !body.password) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ message: 'Username and Password required' })
        })
        return;
    }
    body.username_case = body.username;
    body.username = body.username.toLowerCase();

    const { username } = body;

    console.log("Connecting to DB");
    connectToDatabase()
        .then(() => {
            console.log("assport.authenticate");
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).send(info);
                }


            });
        })
};




