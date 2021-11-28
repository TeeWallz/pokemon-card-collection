const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deck', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    set: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'set',
        key: 'id'
      }
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'deck',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "set",
        using: "BTREE",
        fields: [
          { name: "set" },
        ]
      },
    ]
  });
};
