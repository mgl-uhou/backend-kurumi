"use strict";

const { off } = require("../models/userModel");

// * Como criar validações no padrão: https://youtu.be/PknC5SCkwjo?si=kX9V8wmRcDA65H0r

class FluentValidator {
	#errors;
	constructor(){
		this.#errors = [];
	}

	/**
	 * 
	 * @param {any} value Valor a ser validado.
	 * @param {String} message Mensagem que será posta no array em caso de erro.
	 */
	isRequired(value, message){
		if(!value || value.length <= 0)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {String} value Valor a ser validado.
	 * @param {Number} min Valor mínimo da string.  
	 * @param {String} message Mensagem que será posta no array em caso de erro.
	 */
	hasMinLen(value, min, message){
		if(!value || value.length < min)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {*} value Valor a ser validado.
	 * @param {*} max Valor máximo da string. 
	 * @param {*} message Mensagem que será posta no array em caso de erro.
	 */
	hasMaxLen(value, max, message){
		if(!value || value.length > max)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {*} value Valor a ser validado.
	 * @param {*} len Valor fixo da string. 
	 * @param {*} message Mensagem que será posta no array em caso de erro.
	 */
	isFixedLen(value, len, message){
		if(!value || value.length !== len)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {string} value Valor a ser validado. 
	 * @param {string} message Mensagem que será posta no array em caso de erro.
	 */
	haveSpaces(value, message){
		const hasSpaces = new RegExp(/\s/);
		if(hasSpaces.test(value))
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {*} value Valor a ser validado.
	 */
	isEmail(value){
		let regex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm);
		if(!regex.test(value))
			this.setPushError({ message: "E-mail inválido." });
	}

	/**
	 * 
	 * @param {String} value Valor a ser validado.
	 */
	isPassword(value){
		let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,75}$/);
		if(!regex.test(value)){
			this.setPushError({
				message: "Senha inválida."
			})
		}
	}

	getErrors = () => this.#errors;
	setPushError = error => this.#errors.push(error);
	clearErrors = () => this.#errors = [];
	isValid = () => this.#errors.length === 0;
}

module.exports = FluentValidator;
