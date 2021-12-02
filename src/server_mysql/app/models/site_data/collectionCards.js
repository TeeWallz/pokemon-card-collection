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
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    collectionId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'collections',
        key: 'id'
      }
    }
  }, {
    sequelize,
    schema: 'site_data',
    tableName: 'collectionCards',
    timestamps: false,
    indexes: [
      {
        unique: true,
        using: "BTREE",
        fields: ["cardId", "collectionId"]
      },
      {
        name: "collectionId",
        using: "BTREE",
        fields: [
          "collectionId"
        ]
      },
    ]
  });
};
