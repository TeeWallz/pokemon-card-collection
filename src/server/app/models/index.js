const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.models.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.collection = require("./collection.model")(sequelize, Sequelize);
db.card = require("./card")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// db.collectionCard.belongsTo(db.collection, {
//     foreignKey: 'collectionId', targetKey: 'id'
// });
// db.collectionCard.belongsTo(db.collectionCard, {
//     foreignKey: 'collectionId', targetKey: 'id'
// });


// db.collectionCard.hasOne(db.collection, {as: 'collection'})
// db.collection.hasOne(db.user, {as: "creator"});
//


db.collection.belongsToMany(
    db.card,
    {
        // this can be string (model name) or a Sequelize Model Object Class
        // through is compulsory since v2
        through: 'collection_card',

        // GOTCHA
        // note that this is the Parent's Id, not Child.
        foreignKey: 'collection_collectionId'
    }
)

/*
The above reads:
"Parents" belongs to many "Children", and is recorded in the "Parent_child" table, using "Parents"'s ID.
*/

db.card.belongsToMany(
    db.collection,
    {
        through: 'collection_card',

        // GOTCHA
        // note that this is the Child's Id, not Parent.
        foreignKey: 'collectionCard_cardId'
    }
)


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;