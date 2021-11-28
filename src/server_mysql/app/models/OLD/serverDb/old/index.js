module.exports = (obj, props) => {

};

db.user = require("./user.models.js")(serverDb, Sequelize);
db.role = require("./role.model.js")(serverDb, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(serverDb, Sequelize);

db.collection = require("./collection.model")(serverDb, Sequelize);
db.card = require("./card")(serverDb, Sequelize);



db.collectionCard = require("./collectionCard.model")(serverDb, Sequelize);


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