const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_evolution', {
    card: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    pokemonName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    nationalPokedexNumber: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'card_evolution',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card" },
          { name: "pokemonName" },
        ]
      },
    ]
  });
};
