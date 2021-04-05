"use strict";

module.exports = function (sequelize, DataTypes) {
  let Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING(100),
        require: true,
      },
      description: {
        type: DataTypes.TEXT,
        require: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      retailPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      salePrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      associate: function (models) {
        Product.belongsTo(models.User, {
          as: "user",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "UserId",
            allowNull: false,
            field: "UserId",
          },
        });
        Product.hasMany(models.Category, {
          as: "categories",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "ProductId",
            allowNull: false,
            field: "ProductId",
          },
        });
        Product.hasMany(models.OrderProduct, {
          as: "orderProduct",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "ProductId",
            allowNull: false,
            field: "ProductId",
          },
        });
      },
    }
  );
  return Product
};
