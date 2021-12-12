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
      },
      collection_card_key: {
        type: 'VARCHAR(100) GENERATED ALWAYS AS ( case when "collectionId" is null then \'268ffa44-26b7-4fdc-9d6c-29d3530ede3c\' else "collectionId"::text end || \'/\' || case when "cardId" is null then \'0\' else "cardId" end ) STORED',
        set() {
          throw new Error('generatedValue is read-only')
        },
      }
    },
    purchased: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
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
