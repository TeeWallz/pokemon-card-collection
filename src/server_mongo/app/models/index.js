const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.collection = require("./collection.model");
db.card = require("./card.model");
db.collection_card = require("./collection_card.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;