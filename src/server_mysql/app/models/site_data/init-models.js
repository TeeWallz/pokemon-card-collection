var DataTypes = require("sequelize").DataTypes;
var _collectionCards = require("./collectionCards");
var _collections = require("./collections");
var _refreshTokens = require("./refreshTokens");
var _roles = require("./roles");
var _user_roles = require("./user_roles");
var _users = require("./users");

function initModels(sequelize, tcgModels) {
  var users = _users(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var collectionCards = _collectionCards(sequelize, DataTypes);
  var collections = _collections(sequelize, DataTypes);
  var refreshTokens = _refreshTokens(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);

  collections.belongsToMany(tcgModels.card, { as: 'cards', through: collectionCards, foreignKey: "collectionId", otherKey: "cardId" });
  roles.belongsToMany(users, { as: 'users', through: user_roles, foreignKey: "roleId", otherKey: "userId" });
  users.belongsToMany(roles, { as: 'roles', through: user_roles, foreignKey: "userId", otherKey: "roleId" });
  tcgModels.card.belongsToMany(collections, { as: 'collections', through: collectionCards, foreignKey: "cardId", otherKey: "collectionId" });
  collectionCards.belongsTo(collections, { as: "collection", foreignKey: "collectionId"});

  collections.hasMany(collectionCards, { as: "collectionCards", foreignKey: "collectionId"});
  collections.hasMany(collectionCards, { as: "collectionCards_alias2", foreignKey: "collectionId"});

  user_roles.belongsTo(roles, { as: "role", foreignKey: "roleId"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "roleId"});
  refreshTokens.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(refreshTokens, { as: "refreshTokens", foreignKey: "userId"});
  user_roles.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "userId"});
  collectionCards.belongsTo(tcgModels.card, { as: "card", foreignKey: "cardId"});
  tcgModels.card.hasMany(collectionCards, { as: "collectionCards", foreignKey: "cardId"});

  collections.belongsTo(users, { as: "creator", foreignKey: "creatorId"});
  // users.hasMany(collections, { as: "collections", foreignKey: "id"});

  return {
    collectionCards,
    collections,
    refreshTokens,
    roles,
    user_roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
