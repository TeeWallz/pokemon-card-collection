const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('legality', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'legality',
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
