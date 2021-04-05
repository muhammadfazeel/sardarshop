"use strict";

let crypto = require("crypto");

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(100),
        require: true,
      },
      email: {
        type: DataTypes.STRING(100),
        isEmail: true,
        unique: true,
      },
      imageUrl: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING(15),
        require: true,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(100),
        require: true,
      },
      otp: DataTypes.STRING(5),
      otpValidTill: DataTypes.DATE,
      hashedPassword: DataTypes.STRING,
      salt: DataTypes.STRING,
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      associate: function (models) {
        User.hasMany(models.Product, {
          as: "products",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          foreignKey: {
            name: "UserId",
            allowNull: false,
            field: "UserId",
          },
        });
        User.hasMany(models.Customer, {
          as: "customer",
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

  User.prototype.toJSON = function () {
    var values = this.get();
    delete values.hashedPassword;
    delete values.salt;
    delete values.otp;
    delete values.otpValidTill;
    delete values.balance;
    return values;
  };

  User.prototype.makeSalt = function () {
    return crypto.randomBytes(16).toString("base64");
  };

  User.prototype.authenticate = function (plainText) {
    return (
      this.encryptPassword(plainText, this.salt).toString() ===
      this.hashedPassword.toString()
    );
  };

  User.prototype.encryptPassword = function (password, salt) {
    if (!password || !salt) {
      return "";
    }
    salt = new Buffer.from(salt, "base64");
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("base64");
  };

  return User;
};
