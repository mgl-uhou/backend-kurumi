"use strict";

/**
 *
 * @param {Object} res O objeto de resposta do express.
 * @param {string} error A mensagem de erro do express.
 * @param {string} message A mensagem da API.
 * @param {number} status O status da resposta.
 * @returns {string} Mensagem de erro.
 */
module.exports = function errorFunction(res, error, message, status) {
	res.status(status).json({
		message,
		error,
	});
	return error;
};
