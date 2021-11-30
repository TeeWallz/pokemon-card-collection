const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_roles', {
    roleId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    schema: 'site_data',
    tableName: 'user_roles',
    timestamps: true,
    indexes: [
      {
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roleId" },
          { name: "userId" },
        ]
      },
      // {
      //   name: "userId",
      //   using: "BTREE",
      //   fields: [
      //     { name: "userId" },
      //   ]
      // },
    ]
  });
};
