"use strict";

module.exports = function (sequelize, DataTypes) {
  let OrderProduct = sequelize.define(
    "OrderProduct",
    {},

    {
      associate: function (models) {
        OrderProduct.belongsTo(models.Product, {
          as: "product",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "ProductId",
            allowNull: false,
            field: "ProductId",
          },
        });
        OrderProduct.belongsTo(models.Order, {
          as: "order",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "OrderId",
            allowNull: false,
            field: "OrderId",
          },
        });
      },
    }
  );
  return OrderProduct
};
