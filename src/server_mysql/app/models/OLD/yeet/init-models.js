var DataTypes = require("sequelize").DataTypes;
var _cards = require("./cards");
var _collectionCards = require("./collectionCards");
var _collections = require("./collections");
var _refreshTokens = require("./refreshTokens");
var _roles = require("./roles");
var _user_roles = require("./user_roles");
var _users = require("./users");

function initModels(sequelize) {
  var cards = _cards(sequelize, DataTypes);
  var collectionCards = _collectionCards(sequelize, DataTypes);
  var collections = _collections(sequelize, DataTypes);
  var refreshTokens = _refreshTokens(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  cards.belongsToMany(collections, { as: 'collectionId_collections', through: collectionCards, foreignKey: "cardId", otherKey: "collectionId" });
  collections.belongsToMany(cards, { as: 'cards', through: collectionCards, foreignKey: "collectionId", otherKey: "cardId" });
  roles.belongsToMany(users, { as: 'userId_users', through: user_roles, foreignKey: "roleId", otherKey: "userId" });
  users.belongsToMany(roles, { as: 'roleId_roles', through: user_roles, foreignKey: "userId", otherKey: "roleId" });
  collectionCards.belongsTo(cards, { as: "card", foreignKey: "cardId"});
  cards.hasMany(collectionCards, { as: "collectionCards", foreignKey: "cardId"});
  collectionCards.belongsTo(collections, { as: "collection", foreignKey: "collectionId"});
  collections.hasMany(collectionCards, { as: "collectionCards", foreignKey: "collectionId"});
  user_roles.belongsTo(roles, { as: "role", foreignKey: "roleId"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "roleId"});
  refreshTokens.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(refreshTokens, { as: "refreshTokens", foreignKey: "userId"});
  user_roles.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "userId"});

  return {
    cards,
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
