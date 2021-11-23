const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_legality_override', {
    card: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    legality: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'legality',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'card_legality_override',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card" },
          { name: "legality" },
        ]
      },
      {
        name: "legality",
        using: "BTREE",
        fields: [
          { name: "legality" },
        ]
      },
    ]
  });
};
