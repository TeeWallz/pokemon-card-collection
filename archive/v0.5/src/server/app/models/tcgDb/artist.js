const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('artist', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'artist',
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
