const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deck_type', {
    deck: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'deck',
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
    tableName:     'deck_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "deck" },
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
