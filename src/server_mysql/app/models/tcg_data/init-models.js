var DataTypes = require("sequelize").DataTypes;

// TCG API MODELS
var _artist = require("./artist");
var _card = require("./card");
var _card_NationalPokedexNumbers = require("./card_NationalPokedexNumbers");
var _card_ability = require("./card_ability");
var _card_ability_localisation = require("./card_ability_localisation");
var _card_attack = require("./card_attack");
var _card_attack_cost = require("./card_attack_cost");
var _card_attack_localisation = require("./card_attack_localisation");
var _card_energytype = require("./card_energytype");
var _card_evolution = require("./card_evolution");
var _card_image = require("./card_image");
var _card_image_type = require("./card_image_type");
var _card_legality_override = require("./card_legality_override");
var _card_localisation = require("./card_localisation");
var _card_retreat_cost = require("./card_retreat_cost");
var _card_weakness = require("./card_weakness");
// var _cards = require("./cards");
var _deck = require("./deck");
var _deck_card = require("./deck_card");
var _deck_localisation = require("./deck_localisation");
var _deck_type = require("./deck_type");
var _energy_type = require("./energy_type");
var _language = require("./language");
var _legality = require("./legality");
var _rarity = require("./rarity");
var _series = require("./series");
var _set = require("./set");
var _set_image = require("./set_image");
var _set_image_type = require("./set_image_type");
var _set_legality = require("./set_legality");
var _set_localisation = require("./set_localisation");
var _supertype = require("./supertype");



// AUTH MODELS
// var _collectionCards = require("./collectionCards");
// var _collections = require("./collections");
// var _refreshTokens = require("./refreshTokens");
// var _roles = require("./roles");
// var _user_roles = require("./user_roles");
// var _users = require("./users");





function initModels(sequelize) {
  //TCG API MODELS
  var artist = _artist(sequelize, DataTypes);
  var card = _card(sequelize, DataTypes);
  var card_NationalPokedexNumbers = _card_NationalPokedexNumbers(sequelize, DataTypes);
  var card_ability = _card_ability(sequelize, DataTypes);
  var card_ability_localisation = _card_ability_localisation(sequelize, DataTypes);
  var card_attack = _card_attack(sequelize, DataTypes);
  var card_attack_cost = _card_attack_cost(sequelize, DataTypes);
  var card_attack_localisation = _card_attack_localisation(sequelize, DataTypes);
  var card_energytype = _card_energytype(sequelize, DataTypes);
  var card_evolution = _card_evolution(sequelize, DataTypes);
  var card_image = _card_image(sequelize, DataTypes);
  var card_image_type = _card_image_type(sequelize, DataTypes);
  var card_legality_override = _card_legality_override(sequelize, DataTypes);
  var card_localisation = _card_localisation(sequelize, DataTypes);
  var card_retreat_cost = _card_retreat_cost(sequelize, DataTypes);
  var card_weakness = _card_weakness(sequelize, DataTypes);
  // var cards = _cards(sequelize, DataTypes);
  var deck = _deck(sequelize, DataTypes);
  var deck_card = _deck_card(sequelize, DataTypes);
  var deck_localisation = _deck_localisation(sequelize, DataTypes);
  var deck_type = _deck_type(sequelize, DataTypes);
  var energy_type = _energy_type(sequelize, DataTypes);
  var language = _language(sequelize, DataTypes);
  var legality = _legality(sequelize, DataTypes);
  var rarity = _rarity(sequelize, DataTypes);
  var series = _series(sequelize, DataTypes);
  var set = _set(sequelize, DataTypes);
  var set_image = _set_image(sequelize, DataTypes);
  var set_image_type = _set_image_type(sequelize, DataTypes);
  var set_legality = _set_legality(sequelize, DataTypes);
  var set_localisation = _set_localisation(sequelize, DataTypes);
  var supertype = _supertype(sequelize, DataTypes);


  // AUTH MODELS
  // var collectionCards = _collectionCards(sequelize, DataTypes);
  // var collections = _collections(sequelize, DataTypes);
  // var refreshTokens = _refreshTokens(sequelize, DataTypes);
  // var roles = _roles(sequelize, DataTypes);
  // var user_roles = _user_roles(sequelize, DataTypes);
  // var users = _users(sequelize, DataTypes);



  // TCG MODELS

  card.belongsToMany(energy_type, { as: 'energy_energy_types', through: card_energytype, foreignKey: "card", otherKey: "energy" });
  card.belongsToMany(language, { as: 'language_languages', through: card_localisation, foreignKey: "card", otherKey: "language" });
  card.belongsToMany(legality, { as: 'legality_legalities', through: card_legality_override, foreignKey: "card", otherKey: "legality" });
  deck.belongsToMany(energy_type, { as: 'energy_energy_type_deck_types', through: deck_type, foreignKey: "deck", otherKey: "energy" });
  deck.belongsToMany(language, { as: 'language_language_deck_localisations', through: deck_localisation, foreignKey: "deck", otherKey: "language" });
  energy_type.belongsToMany(card, { as: 'card_cards', through: card_energytype, foreignKey: "energy", otherKey: "card" });
  energy_type.belongsToMany(deck, { as: 'deck_deck_deck_types', through: deck_type, foreignKey: "energy", otherKey: "deck" });
  language.belongsToMany(card, { as: 'card_card_card_localisations', through: card_localisation, foreignKey: "language", otherKey: "card" });
  language.belongsToMany(deck, { as: 'deck_decks', through: deck_localisation, foreignKey: "language", otherKey: "deck" });
  language.belongsToMany(set, { as: 'set_set_set_localisations', through: set_localisation, foreignKey: "language", otherKey: "set" });
  legality.belongsToMany(card, { as: 'card_card_card_legality_overrides', through: card_legality_override, foreignKey: "legality", otherKey: "card" });
  legality.belongsToMany(set, { as: 'set_sets', through: set_legality, foreignKey: "legality", otherKey: "set" });
  set.belongsToMany(language, { as: 'language_language_set_localisations', through: set_localisation, foreignKey: "set", otherKey: "language" });
  set.belongsToMany(legality, { as: 'legality_legality_set_legalities', through: set_legality, foreignKey: "set", otherKey: "legality" });
  card_NationalPokedexNumbers.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_NationalPokedexNumbers, { as: "card_NationalPokedexNumbers", foreignKey: "card"});
  card_ability.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_ability, { as: "card_abilities", foreignKey: "card"});
  card_attack.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_attack, { as: "card_attacks", foreignKey: "card"});
  card_energytype.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_energytype, { as: "card_energytypes", foreignKey: "card"});
  card_evolution.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_evolution, { as: "card_evolutions", foreignKey: "card"});
  card_image.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_image, { as: "card_images", foreignKey: "card"});
  card_legality_override.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_legality_override, { as: "card_legality_overrides", foreignKey: "card"});
  card_localisation.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_localisation, { as: "card_localisations", foreignKey: "card"});
  card_retreat_cost.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_retreat_cost, { as: "card_retreat_costs", foreignKey: "card"});
  card_weakness.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(card_weakness, { as: "card_weaknesses", foreignKey: "card"});
  deck_card.belongsTo(card, { as: "card_card", foreignKey: "card"});
  card.hasMany(deck_card, { as: "deck_cards", foreignKey: "card"});
  card_ability_localisation.belongsTo(card_ability, { as: "card_card_ability", foreignKey: "card"});
  card_ability.hasMany(card_ability_localisation, { as: "card_ability_localisations", foreignKey: "card"});
  card_ability_localisation.belongsTo(card_ability, { as: "ability_index_card_ability", foreignKey: "ability_index"});
  card_ability.hasMany(card_ability_localisation, { as: "ability_index_card_ability_localisations", foreignKey: "ability_index"});
  card_attack_cost.belongsTo(card_attack, { as: "card_card_attack", foreignKey: "card"});
  card_attack.hasMany(card_attack_cost, { as: "card_attack_costs", foreignKey: "card"});
  card_attack_cost.belongsTo(card_attack, { as: "attack_index_card_attack", foreignKey: "attack_index"});
  card_attack.hasMany(card_attack_cost, { as: "attack_index_card_attack_costs", foreignKey: "attack_index"});
  card_attack_localisation.belongsTo(card_attack, { as: "card_card_attack", foreignKey: "card"});
  card_attack.hasMany(card_attack_localisation, { as: "card_attack_localisations", foreignKey: "card"});
  card_attack_localisation.belongsTo(card_attack, { as: "attack_index_card_attack", foreignKey: "attack_index"});
  card_attack.hasMany(card_attack_localisation, { as: "attack_index_card_attack_localisations", foreignKey: "attack_index"});
  card_image.belongsTo(card_image_type, { as: "imageType_card_image_type", foreignKey: "imageType"});
  card_image_type.hasMany(card_image, { as: "card_images", foreignKey: "imageType"});
  deck_card.belongsTo(deck, { as: "deck_deck", foreignKey: "deck"});
  deck.hasMany(deck_card, { as: "deck_cards", foreignKey: "deck"});
  deck_localisation.belongsTo(deck, { as: "deck_deck", foreignKey: "deck"});
  deck.hasMany(deck_localisation, { as: "deck_localisations", foreignKey: "deck"});
  deck_type.belongsTo(deck, { as: "deck_deck", foreignKey: "deck"});
  deck.hasMany(deck_type, { as: "deck_types", foreignKey: "deck"});
  card_attack_cost.belongsTo(energy_type, { as: "energy_type_energy_type", foreignKey: "energy_type"});
  energy_type.hasMany(card_attack_cost, { as: "card_attack_costs", foreignKey: "energy_type"});
  card_energytype.belongsTo(energy_type, { as: "energy_energy_type", foreignKey: "energy"});
  energy_type.hasMany(card_energytype, { as: "card_energytypes", foreignKey: "energy"});
  card_retreat_cost.belongsTo(energy_type, { as: "energy_type_energy_type", foreignKey: "energy_type"});
  energy_type.hasMany(card_retreat_cost, { as: "card_retreat_costs", foreignKey: "energy_type"});
  card_weakness.belongsTo(energy_type, { as: "energy_type_energy_type", foreignKey: "energy_type"});
  energy_type.hasMany(card_weakness, { as: "card_weaknesses", foreignKey: "energy_type"});
  deck_type.belongsTo(energy_type, { as: "energy_energy_type", foreignKey: "energy"});
  energy_type.hasMany(deck_type, { as: "deck_types", foreignKey: "energy"});
  card_ability_localisation.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(card_ability_localisation, { as: "card_ability_localisations", foreignKey: "language"});
  card_attack_localisation.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(card_attack_localisation, { as: "card_attack_localisations", foreignKey: "language"});
  card_image.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(card_image, { as: "card_images", foreignKey: "language"});
  card_localisation.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(card_localisation, { as: "card_localisations", foreignKey: "language"});
  deck_localisation.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(deck_localisation, { as: "deck_localisations", foreignKey: "language"});
  set_image.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(set_image, { as: "set_images", foreignKey: "language"});
  set_localisation.belongsTo(language, { as: "language_language", foreignKey: "language"});
  language.hasMany(set_localisation, { as: "set_localisations", foreignKey: "language"});
  card_legality_override.belongsTo(legality, { as: "legality_legality", foreignKey: "legality"});
  legality.hasMany(card_legality_override, { as: "card_legality_overrides", foreignKey: "legality"});
  set_legality.belongsTo(legality, { as: "legality_legality", foreignKey: "legality"});
  legality.hasMany(set_legality, { as: "set_legalities", foreignKey: "legality"});
  card.belongsTo(rarity, { as: "rarity_rarity", foreignKey: "rarity"});
  rarity.hasMany(card, { as: "cards", foreignKey: "rarity"});
  deck_card.belongsTo(rarity, { as: "rarity_rarity", foreignKey: "rarity"});
  rarity.hasMany(deck_card, { as: "deck_cards", foreignKey: "rarity"});
  set.belongsTo(series, { as: "series_sery", foreignKey: "series"});
  series.hasMany(set, { as: "sets", foreignKey: "series"});
  card.belongsTo(set, { as: "cardSet", foreignKey: "set"});
  set.hasMany(card, { as: "cards", foreignKey: "set"});
  deck.belongsTo(set, { as: "set_set", foreignKey: "set"});
  set.hasMany(deck, { as: "decks", foreignKey: "set"});
  set_image.belongsTo(set, { as: "set_set", foreignKey: "set"});
  set.hasMany(set_image, { as: "set_images", foreignKey: "set"});
  set_legality.belongsTo(set, { as: "set_set", foreignKey: "set"});
  set.hasMany(set_legality, { as: "set_legalities", foreignKey: "set"});
  set_localisation.belongsTo(set, { as: "set_set", foreignKey: "set"});
  set.hasMany(set_localisation, { as: "set_localisations", foreignKey: "set"});
  set_image.belongsTo(set_image_type, { as: "imageType_set_image_type", foreignKey: "imageType"});
  set_image_type.hasMany(set_image, { as: "set_images", foreignKey: "imageType"});
  card.belongsTo(supertype, { as: "supertype_supertype", foreignKey: "supertype"});
  supertype.hasMany(card, { as: "cards", foreignKey: "supertype"});

  // AUTH MODELS
  // collections.belongsToMany(card, { as: 'cards', through: collectionCards, foreignKey: "collectionId", otherKey: "cardId" });
  // roles.belongsToMany(users, { as: 'users', through: user_roles, foreignKey: "roleId", otherKey: "userId" });
  // users.belongsToMany(roles, { as: 'roles', through: user_roles, foreignKey: "userId", otherKey: "roleId" });
  // card.belongsToMany(collections, { as: 'collections', through: collectionCards, foreignKey: "cardId", otherKey: "collectionId" });
  // collectionCards.belongsTo(collections, { as: "collection", foreignKey: "collectionId"});
  // collections.hasMany(collectionCards, { as: "collectionCards", foreignKey: "collectionId"});
  // user_roles.belongsTo(roles, { as: "role", foreignKey: "roleId"});
  // roles.hasMany(user_roles, { as: "user_roles", foreignKey: "roleId"});
  // refreshTokens.belongsTo(users, { as: "user", foreignKey: "userId"});
  // users.hasMany(refreshTokens, { as: "refreshTokens", foreignKey: "userId"});
  // user_roles.belongsTo(users, { as: "user", foreignKey: "userId"});
  // users.hasMany(user_roles, { as: "user_roles", foreignKey: "userId"});
  // collectionCards.belongsTo(card, { as: "card", foreignKey: "cardId"});
  // card.hasMany(collectionCards, { as: "collectionCards", foreignKey: "cardId"});

  let models = {
    artist,
    card,
    card_NationalPokedexNumbers,
    card_ability,
    card_ability_localisation,
    card_attack,
    card_attack_cost,
    card_attack_localisation,
    card_energytype,
    card_evolution,
    card_image,
    card_image_type,
    card_legality_override,
    card_localisation,
    card_retreat_cost,
    card_weakness,
    // cards,
    deck,
    deck_card,
    deck_localisation,
    deck_type,
    energy_type,
    language,
    legality,
    rarity,
    series,
    set,
    set_image,
    set_image_type,
    set_legality,
    set_localisation,
    supertype,

    // collectionCards,
    // collections,
    // refreshTokens,
    // roles,
    // user_roles,
    // users,
  };

  // When sync is run, don't change tcg database
  for (const key in models) {
    models[key].sync = () => Promise.resolve();
  }

  return {
    artist,
    card,
    card_NationalPokedexNumbers,
    card_ability,
    card_ability_localisation,
    card_attack,
    card_attack_cost,
    card_attack_localisation,
    card_energytype,
    card_evolution,
    card_image,
    card_image_type,
    card_legality_override,
    card_localisation,
    card_retreat_cost,
    card_weakness,
    // cards,
    deck,
    deck_card,
    deck_localisation,
    deck_type,
    energy_type,
    language,
    legality,
    rarity,
    series,
    set,
    set_image,
    set_image_type,
    set_legality,
    set_localisation,
    supertype,

    // collectionCards,
    // collections,
    // refreshTokens,
    // roles,
    // user_roles,
    // users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
