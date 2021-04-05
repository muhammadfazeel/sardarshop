"use strict";

module.exports = function (sequelize, DataTypes) {
  let Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING(100),
        require: true,
      },
    },
    {
      associate: function (models) {
        Category.belongsTo(models.Product, {
          as: "product",
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
  return Category;
};
