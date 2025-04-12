"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConnection");

const Users = sequelize.define("Users", {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true, // Cria automaticamente createdAt e updatedAt
  indexes: [
    {
      unique: true,
      fields: ["email"]
    }
  ]
});

module.exports = Users;
