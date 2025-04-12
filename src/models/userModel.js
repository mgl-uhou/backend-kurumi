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
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
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
