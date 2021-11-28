const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_image', {
    card: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    imageType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card_image_type',
        key: 'name'
      }
    },
    language: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'language',
        key: 'code'
      }
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'card_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card" },
          { name: "imageType" },
          { name: "language" },
        ]
      },
      {
        name: "imageType",
        using: "BTREE",
        fields: [
          { name: "imageType" },
        ]
      },
      {
        name: "language",
        using: "BTREE",
        fields: [
          { name: "language" },
        ]
      },
    ]
  });
};
