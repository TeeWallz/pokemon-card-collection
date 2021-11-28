const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_ability_localisation', {
    pk: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    card: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'card_ability',
        key: 'card'
      }
    },
    ability_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'card_ability',
        key: 'index'
      }
    },
    language: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'language',
        key: 'code'
      }
    },
    text: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'card_ability_localisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pk" },
        ]
      },
      {
        name: "ability_index",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ability_index" },
          { name: "language" },
          { name: "card" },
        ]
      },
      {
        name: "ix_card_ability_localisation_language",
        using: "BTREE",
        fields: [
          { name: "language" },
        ]
      },
      {
        name: "ix_card_ability_localisation_ability_index",
        using: "BTREE",
        fields: [
          { name: "ability_index" },
        ]
      },
      {
        name: "ix_card_ability_localisation_card",
        using: "BTREE",
        fields: [
          { name: "card" },
        ]
      },
    ]
  });
};
