const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Collection =  sequelize.define('collections', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    creatorId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
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
    ],
    instanceMethods: {
      getFullName: function () {
        return this.id + ' ' + this.name;
      }
    },
  });

  Collection.summary = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };


  return Collection;

};
