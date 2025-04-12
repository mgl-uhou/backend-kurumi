"use strict";

const { off } = require("../models/userModel");

// * Como criar validações no padrão: https://youtu.be/PknC5SCkwjo?si=kX9V8wmRcDA65H0r

class FluentValidator {
	#errors;
	#brazilianStates = [
        'Acre',
        'Alagoas',
        'Amapá',
        'Amazonas',
        'Bahia',
        'Ceará',
        'Distrito Federal',
        'Espírito Santo',
        'Goiás',
        'Maranhão',
        'Mato Grosso',
        'Mato Grosso do Sul',
        'Minas Gerais',
        'Pará',
        'Paraíba',
        'Paraná',
        'Pernambuco',
        'Piauí',
        'Rio de Janeiro',
        'Rio Grande do Norte',
        'Rio Grande do Sul',
        'Rondônia',
        'Roraima',
        'Santa Catarina',
        'São Paulo',
        'Sergipe',
        'Tocantins'
    ];
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

	/**
     * 
     * @param {string} value Valor a ser validado.
     * @param {string} message Mensagem que será posta no array em caso de erro.
     */
    isCEP(value, message) {
        const cepRegex = /^\d{5}-?\d{3}$/;
        if (!cepRegex.test(value))
            this.setPushError({ message: message || "CEP inválido." });
    }

    /**
     * Valida se o estado é válido usando o nome completo
     * @param {string} value Nome do estado a ser validado
     * @param {string} message Mensagem que será posta no array em caso de erro
     */
    isState(value, message) {
        const stateName = value.trim();
        const isValid = this.#brazilianStates
            .map(state => state.toLowerCase())
            .includes(stateName.toLowerCase());

        if (!isValid) {
            this.setPushError({ message: message || "Estado inválido." });
        }
    }

	getErrors = () => this.#errors;
	setPushError = error => this.#errors.push(error);
	clearErrors = () => this.#errors = [];
	isValid = () => this.#errors.length === 0;
}

module.exports = FluentValidator;
