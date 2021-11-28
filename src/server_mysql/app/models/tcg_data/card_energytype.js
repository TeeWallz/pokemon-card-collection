const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_energytype', {
    card: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    energy: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'energy_type',
        key: 'name'
      }
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'card_energytype',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card" },
          { name: "energy" },
        ]
      },
      {
        name: "energy",
        using: "BTREE",
        fields: [
          { name: "energy" },
        ]
      },
    ]
  });
};
