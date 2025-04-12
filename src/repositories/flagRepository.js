"use strict";

const Flags = require("../models/flagModel");
const Repository = require("./repository");

class FlagRepository extends Repository {
  constructor() {
    super(Flags);
  }

  getAll = async () => {
    return await this.model.findAll({ attributes: ["name", "link"] });
  };
}

module.exports = new FlagRepository();
