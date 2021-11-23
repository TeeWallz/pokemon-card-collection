const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "generated field from '{set}-{number}'"
    },
    set: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'set',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    hp: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    supertype: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'supertype',
        key: 'name'
      }
    },
    rarity: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'rarity',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'card',
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
      {
        name: "supertype",
        using: "BTREE",
        fields: [
          { name: "supertype" },
        ]
      },
      {
        name: "rarity",
        using: "BTREE",
        fields: [
          { name: "rarity" },
        ]
      },
    ]
  });
};
