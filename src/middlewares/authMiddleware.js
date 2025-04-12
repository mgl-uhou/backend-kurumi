"use strict";

const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization)
		return res.status(401).json({ message: "Não autorizado." });

	const token = authorization.split(" ")[1];

	try {
		const { id } = jwt.verify(token, process.env.JWT_PASS);
		const user = await userRepository.findById(id, [
			"id",
			"nickname",
			"email",
			"cep",
			"street",
			"neighborhood",
			"city",
			"state",
			"createdAt",
		]);

		if (!user)
			return res.status(401).json({ message: "Usuário não existente." });

		req.user = user;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				message: "Token expirado. Faça login novamente.",
				expiredAt: error.expiredAt,
			});
		} else if (error.name === "JsonWebTokenError") {
			return res.status(401).json({
				message: "Token inválido. Verifique suas credenciais.",
				error,
			});
		} else if (error.name === "NotBeforeError") {
			return res.status(401).json({
				message: "Token ainda não está válido.",
				notBefore: error.date,
			});
		} else {
			return res.status(500).json({
				message: "Erro interno ao validar o token.",
				error,
			});
		}
	}
};
