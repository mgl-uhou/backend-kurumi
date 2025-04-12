"use strict";

require('dotenv').config();

module.exports = {
  development: { 
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  },
};
