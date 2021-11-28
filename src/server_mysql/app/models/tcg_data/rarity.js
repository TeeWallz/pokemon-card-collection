const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rarity', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'rarity',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
