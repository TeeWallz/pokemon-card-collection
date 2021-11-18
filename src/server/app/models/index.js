const serverDbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const serverDb = new Sequelize(
    serverDbConfig.DB,
    serverDbConfig.USER,
    serverDbConfig.PASSWORD,
    {
        host: serverDbConfig.HOST,
        dialect: serverDbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: serverDbConfig.pool.max,
            min: serverDbConfig.pool.min,
            acquire: serverDbConfig.pool.acquire,
            idle: serverDbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.serverDb = serverDb;
db.pokemonTcgDb = serverDb;

db.user = require("./server/user.models.js")(serverDb, Sequelize);
db.role = require("./server/role.model.js")(serverDb, Sequelize);
db.refreshToken = require("./server/refreshToken.model.js")(serverDb, Sequelize);

db.collection = require("./server/collection.model")(serverDb, Sequelize);
db.card = require("./server/card")(serverDb, Sequelize);



db.collectionCard = require("./server/collectionCard.model")(serverDb, Sequelize);


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
db.ROLES = ["user", "admin", "moderator"];

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

db.card.belongsToMany(db.collection, { through: db.collectionCard , as: 'collection'});
db.collection.belongsToMany(db.card, { through: db.collectionCard, as: 'cards' });






module.exports = db;