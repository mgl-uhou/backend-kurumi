"use strict";

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "",   
  process.env.DB_USER || "",    
  process.env.DB_PASS || "",    
  {
    host: process.env.DB_HOST || "",
    dialect: process.env.DB_DIALECT || "postgres",
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
