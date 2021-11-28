const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_attack_localisation', {
    pk: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    language: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'language',
        key: 'code'
      }
    },
    card: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'card_attack',
        key: 'card'
      }
    },
    attack_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'card_attack',
        key: 'index'
      }
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'card_attack_localisation',
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
        name: "language",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "language" },
          { name: "card" },
          { name: "attack_index" },
        ]
      },
      {
        name: "ix_card_attack_localisation_attack_index",
        using: "BTREE",
        fields: [
          { name: "attack_index" },
        ]
      },
      {
        name: "ix_card_attack_localisation_card",
        using: "BTREE",
        fields: [
          { name: "card" },
        ]
      },
      {
        name: "ix_card_attack_localisation_language",
        using: "BTREE",
        fields: [
          { name: "language" },
        ]
      },
    ]
  });
};
