const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deck_localisation', {
    deck: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'deck',
        key: 'id'
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
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'deck_localisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "deck" },
          { name: "language" },
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
