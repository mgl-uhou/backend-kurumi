"use strict";

const Users = require("../models/userModel");
const Repository = require("./repository");

class UserRepository extends Repository {
  constructor() {
    super(Users);
  }

  getAll = async () => {
    return await this.model.findAll({ attributes: ["nickname", "email", "createdAt"] });
  };

  getByEmail = async (email) => {
    return await this.model.findOne({
      where: { email },
      attributes: ["id", "nickname", "email", "password", "createdAt"],
    });
  };
}

module.exports = new UserRepository();
