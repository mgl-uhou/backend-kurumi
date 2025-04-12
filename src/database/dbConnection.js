"use strict";

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: process.env.DB_STORAGE || "./database.sqlite",
    logging: false, // Desabilita logs de queries
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
