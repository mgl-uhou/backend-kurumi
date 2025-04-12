"use strict";

const Users = require("../models/userModel");
const Repository = require("./repository");

class UserRepository extends Repository {
	constructor() {
		super(Users);
	}

	getAll = async () => {
		return await this.model.findAll({
			attributes: [
				"nickname",
				"email",
				"cep",
				"street",
				"neighborhood",
				"city",
				"state",
				"createdAt",
			],
		});
	};

	getByEmail = async (email) => {
		return await this.model.findOne({
			where: { email },
			attributes: [
				"id",
				"nickname",
				"email",
				"password",
				"cep",
				"street",
				"neighborhood",
				"city",
				"state",
				"createdAt",
			],
		});
	};
}

module.exports = new UserRepository();
