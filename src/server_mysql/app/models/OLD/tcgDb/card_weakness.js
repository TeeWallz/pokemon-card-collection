const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_weakness', {
    pk: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    card: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'card',
        key: 'id'
      }
    },
    energy_type: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'energy_type',
        key: 'name'
      }
    },
    value: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'card_weakness',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pk" },
        ]
      },
      {
        name: "card",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card" },
          { name: "energy_type" },
        ]
      },
      {
        name: "ix_card_weakness_card",
        using: "BTREE",
        fields: [
          { name: "card" },
        ]
      },
      {
        name: "ix_card_weakness_energy_type",
        using: "BTREE",
        fields: [
          { name: "energy_type" },
        ]
      },
    ]
  });
};
