const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set_localisation', {
    language: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'language',
        key: 'code'
      }
    },
    set: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'set',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'set_localisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "language" },
          { name: "set" },
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
