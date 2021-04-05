"use strict";

module.exports = function (sequelize, DataTypes) {
  let Order = sequelize.define(
    "Order",
    {
      totalRetailAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      totalSaleAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      totalAmountPaid: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      totalDiscount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      associate: function (models) {
        Order.hasMany(models.OrderProduct, {
          as: "orderProduct",
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
  return Order
};
