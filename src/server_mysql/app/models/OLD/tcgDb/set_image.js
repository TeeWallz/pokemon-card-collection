const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set_image', {
    set: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'set',
        key: 'id'
      }
    },
    imageType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'set_image_type',
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
    tableName: 'set_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "set" },
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
