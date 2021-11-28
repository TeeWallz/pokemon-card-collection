const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_ability', {
    card: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    convertedEnergyCost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    abilityType: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'card_ability',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card" },
          { name: "index" },
        ]
      },
      {
        name: "ix_card_ability_index",
        using: "BTREE",
        fields: [
          { name: "index" },
        ]
      },
    ]
  });
};
