const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    series: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'series',
        key: 'name'
      }
    },
    printedTotal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ptcgoCode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    doNotSync: true,
    schema: 'tcg_data',
    tableName:     'set',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "series",
        using: "BTREE",
        fields: [
          { name: "series" },
        ]
      },
    ]
  });
};
