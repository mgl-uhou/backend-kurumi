"use string";

const ValidationContract = require("../validators/fluentValidators");
const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorFunction = require("../validators/errorFunction");
require("dotenv").config();

class UserController {
    async post(req, res){
        const { nickname, email, password, cep, street, neighborhood, city, state } = req.body;
        const validationContract = new ValidationContract();

        validationContract.hasMinLen(nickname, 3, "O apelido deve conter pelo menos 3 caracteres.");
        validationContract.hasMaxLen(nickname, 30, "O apelido deve conter no máximo 30 caracteres.");
        validationContract.haveSpaces(nickname, "O apelido não pode conter espaços.");
        validationContract.isEmail(email);
        validationContract.isPassword(password);
        validationContract.isCEP(cep, "CEP inválido.");
        validationContract.isRequired(street, "Rua é obrigatória.");
        validationContract.isRequired(neighborhood, "Bairro é obrigatório.");
        validationContract.isRequired(city, "Cidade é obrigatória.");
        validationContract.isState(state, "Estado inválido.");

        if(!validationContract.isValid()){
            res.status(400).json(validationContract.getErrors());
            return;
        }
        
        try {
            const userExists = await userRepository.getByEmail(email);
            if(userExists) throw new Error("E-mail já cadastrado.");

            const hashPassword = await bcrypt.hash(password + process.env.SALT, 10);
            const user = await userRepository.create({
                nickname,
                email,
                password: hashPassword,
                cep,
                street,
                neighborhood,
                city,
                state
            })
            const { password: _, ...userData } = user.toJSON();
            res.status(201).json({
                message: "Usuário cadastrado com sucesso.",
                user: userData
            });
        } catch (e) {
            errorFunction(res, e.message, "Falha ao cadastrar usuário.", 400);
        }
    }

	async login(req, res) {
		const { email, password } = req.body;
		
		try {
			const user = await userRepository.getByEmail(email);
			if(!user) throw new Error("E-mail ou senha inválidos.");

			const verifyPass = await bcrypt.compare(password + process.env.SALT, user.password);
			if(!verifyPass) throw new Error("E-mail ou senha inválidos.");

			const token = jwt.sign({
				id: user.toJSON().id,
			}, process.env.JWT_PASS, { expiresIn: "30d" });

			const {password: _, ...userData} = user.toJSON();
			res.status(200).json({ user: userData, token });
			
		} catch (error) {
			errorFunction(res, error.message, "Falha ao realizar o login.", 400);	
		}
	}

	getProfile = async (req, res) => res.status(200).json(req.user);

    async put(req, res){
        const data = req.body;
        delete data.createdAt;
        delete data.id;

        const validationContract = new ValidationContract();

        if(data.nickname) {
            validationContract.hasMinLen(data.nickname, 3, "O apelido deve conter pelo menos 3 caracteres.");
            validationContract.hasMaxLen(data.nickname, 30, "O apelido deve conter no máximo 30 caracteres.");
            validationContract.haveSpaces(data.nickname, "O apelido não pode conter espaços.");
        }
        if(data.email) validationContract.isEmail(data.email);
        if(data.password) validationContract.isPassword(data.password);
        if(data.cep) validationContract.isCEP(data.cep, "CEP inválido.");
        if(data.state) validationContract.isState(data.state, "Estado inválido.");

        if(!validationContract.isValid()){
            res.status(400).json(validationContract.getErrors());
            return;
        }

        try {
            if(data.password) data.password = await bcrypt.hash(data.password + process.env.SALT, 10);
            if(data.state) data.state = data.state.toUpperCase();
            
            await userRepository.update(req.user.id, data);
            res.status(200).json({ message: "Usuário atualizado com sucesso."});	
        } catch (error) {
            errorFunction(res, error.message, "Falha ao atualizar o usuário.", 400);
        }
    }

	async delete (req, res){
		try {
			await userRepository.delete(req.user.id);
			res.status(200).json({ message: "Usuário deletado com sucesso."});	
		} catch (error) {
			errorFunction(res, error.message, "Falha ao deletar o usuário.", 400);
		}
	}
}

module.exports = new UserController();
