const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('collectionCards', {
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    cardId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cards',
        key: 'id'
      }
    },
    collectionId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'collections',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'collectionCards',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cardId" },
          { name: "collectionId" },
        ]
      },
      {
        name: "collectionId",
        using: "BTREE",
        fields: [
          { name: "collectionId" },
        ]
      },
    ]
  });
};
