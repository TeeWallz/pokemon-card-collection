const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deck_card', {
    deck: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'deck',
        key: 'id'
      }
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    card: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    rarity: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'rarity',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'deck_card',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "deck" },
          { name: "id" },
        ]
      },
      {
        name: "card",
        using: "BTREE",
        fields: [
          { name: "card" },
        ]
      },
      {
        name: "rarity",
        using: "BTREE",
        fields: [
          { name: "rarity" },
        ]
      },
    ]
  });
};
