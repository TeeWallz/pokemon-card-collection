const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'pokemon-site',
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

let db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ROLES = ["user", "admin", "moderator"];

let initTcgModels = require('./tcg_data/init-models');
let tcgModels = initTcgModels(sequelize);

let initSiteModels = require('./site_data/init-models');
let siteModels = initSiteModels(sequelize, tcgModels);




db = {...db, ...siteModels};
db = {...db, ...tcgModels};
// let models = {...tcgModels, ...siteModels};

db.sequelize.sync()

module.exports = db