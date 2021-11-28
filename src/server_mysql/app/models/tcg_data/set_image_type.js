const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set_image_type', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'set_image_type',
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
