const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('collections', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    schema: 'site_data',
    tableName: 'collections',

    timestamps: true,
    indexes: [
      {
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
