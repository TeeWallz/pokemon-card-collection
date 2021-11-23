const Sequelize = require('sequelize');
const config = require('../config/db.config');

// Loop through
let db = {};
const databases = Object.keys(config);
for(let i = 0; i < databases.length; ++i) {
    let database = databases[i];

    let getDbModels = require('../models/' + database + '/init-models');
    let dbPath = config[database];
    db[database] = new Sequelize( dbPath );

    db =  { ...db , ...getDbModels(db[database]) };

}

// Or a one liner
// const db = Object.entries(config).reduce((r, db) => (r[db[0]] = db[1].path) && r, {});

// Sequelize instances:
// db.user
// db.content

module.exports = db