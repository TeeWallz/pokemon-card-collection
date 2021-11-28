const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_retreat_cost', {
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'card_retreat_cost',
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
        name: "ix_card_retreat_cost_energy_type",
        using: "BTREE",
        fields: [
          { name: "energy_type" },
        ]
      },
      {
        name: "ix_card_retreat_cost_card",
        using: "BTREE",
        fields: [
          { name: "card" },
        ]
      },
    ]
  });
};
