"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConnection");

const Flags = sequelize.define("Flags", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
	unique: true,
    trim: true,
  },
}, {
  timestamps: false, // Impede a criação automática dos campos createdAt e updatedAt
});

module.exports = Flags;
