const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_localisation', {
    card: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card',
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
      type: DataTypes.STRING(100),
      allowNull: true
    },
    flavor_text: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'card_localisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card" },
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
