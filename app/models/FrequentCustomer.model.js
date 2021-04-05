"use strict";

module.exports = function (sequelize, DataTypes) {
  let Customer = sequelize.define(
    "Customer",
    {
      name: {
        type: DataTypes.STRING(100),
        require: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        require: true,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(100),
        require: true,
      },
    },

    {
      associate: function (models) {
        Customer.belongsTo(models.User, {
          as: "user",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "UserId",
            allowNull: false,
            field: "UserId",
          },
        });
      },
    }
  );
  return Customer
};
