const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set_legality', {
    set: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'set',
        key: 'id'
      }
    },
    legality: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'legality',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'set_legality',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "set" },
          { name: "legality" },
        ]
      },
      {
        name: "legality",
        using: "BTREE",
        fields: [
          { name: "legality" },
        ]
      },
    ]
  });
};
