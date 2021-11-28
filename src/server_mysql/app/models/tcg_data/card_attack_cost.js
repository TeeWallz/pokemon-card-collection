const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('card_attack_cost', {
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
        model: 'card_attack',
        key: 'card'
      }
    },
    attack_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'card_attack',
        key: 'index'
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
    tableName:     'card_attack_cost',
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
          { name: "attack_index" },
          { name: "energy_type" },
        ]
      },
      {
        name: "ix_card_attack_cost_attack_index",
        using: "BTREE",
        fields: [
          { name: "attack_index" },
        ]
      },
      {
        name: "ix_card_attack_cost_card",
        using: "BTREE",
        fields: [
          { name: "card" },
        ]
      },
      {
        name: "ix_card_attack_cost_energy_type",
        using: "BTREE",
        fields: [
          { name: "energy_type" },
        ]
      },
    ]
  });
};
