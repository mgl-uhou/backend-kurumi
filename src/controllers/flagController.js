"use strict";

const flagRepository = require("../repositories/flagRepository");
const errorFunction = require("../validators/errorFunction");

class FlagController {
	async getAll(_req, res) {
		try {
			const data = await flagRepository.getAll();
			res.status(200).json(data);	
		} catch (error) {
			errorFunction(res, error.message, "Erro ao buscar as bandeiras.", 400);
		}
	}

	async getById(req, res) {
		try {
			const data = await flagRepository.findById(req.params.id, ["name", "link"]);
			if(!data) return res.status(404).json({ message: "Bandeira não encontrada." });

			res.status(200).json(data);
		} catch (error) {
			errorFunction(res, error.message, "Erro ao buscar bandeira.", 400);
		}
	}

	async post(req, res) {
		try {
			if(!req.user.isAdmin) throw new Error("Usuário não autorizado.");
			const flag = await flagRepository.create(req.body);
			res.status(201).json({ message: "Bandeira cadastrada com sucesso.", flag });
		} catch (error) {
			errorFunction(res, error.message, "Erro ao cadastrar bandeira.", 400);
		}
	}

	async put(req, res) {
		try {
			if(!req.user.isAdmin) throw new Error("Usuário não autorizado.");
			const flag = await flagRepository.findById(req.params.id);
			if(!flag) return res.status(404).json({ message: "Bandeira não encontrada." });

			await flagRepository.update(req.params.id, req.body);
			res.status(200).json({ message: "Bandeira atualizada com sucesso." });
		} catch (error) {
			errorFunction(res, error.message, "Erro ao atualizar bandeira.", 400);
		}
	}

	async delete(req, res) {
		try {
			if(!req.user.isAdmin) throw new Error("Usuário não autorizado.");
			const flag = await flagRepository.findById(req.params.id);
			if(!flag) return res.status(404).json({ message: "Bandeira não encontrada." });

			await flagRepository.delete(req.params.id);
			res.status(200).json({ message: "Bandeira deletada com sucesso." });
		} catch (error) {
			errorFunction(res, error.message, "Erro ao deletar bandeira.", 400);
		}
	}
}

module.exports = new FlagController();
