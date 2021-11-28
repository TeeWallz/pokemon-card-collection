const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_attack', {
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
    damage: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    convertedEnergyCost: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'card_attack',
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
        name: "ix_card_attack_index",
        using: "BTREE",
        fields: [
          { name: "index" },
        ]
      },
    ]
  });
};
