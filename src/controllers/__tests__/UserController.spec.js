// DESCRIBE -> bloco de testes - tests suites
// IT or TEST -> declara um único teste unitário - tests cases
// EXPECT -> asserções dos resultados - validar resultados
const request = require("supertest");
const app = require("../../app/app");
const { sequelize } = require("../../database/dbConnection");
const userRepository = require("../../repositories/userRepository");


describe("User Tests", () => {
	beforeEach(async () => {	
		await sequelize.sync({ force: true });
	});

	test("Should create a new user", async () => {
		// Arrange
		const newUser = {
			nickname: "JohnDoe",
			email: "john.doe@example.com",
			password: "Senha123!",
		};

		// Act
		const response = await request(app).post("/users").send(newUser);

		// Assert 
		expect(response.status).toBe(201);
		expect(response.body.message).toBe("Usuário cadastrado com sucesso.");
		expect(response.body.user).toHaveProperty("id");
		expect(response.body.user.nickname).toBe(newUser.nickname);
		expect(response.body.user.email).toBe(newUser.email);
	});

	test("Shouldn't create a new user with a invalid nickname", async () => {
		// Arrange
		const newUser = {
			nickname: "johnny doe",
			email: "johnny.doe@example.com",
			password: "Senha123!",
		};

		// Act
		const response = await request(app).post("/users").send(newUser);

		// Assert
		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("O apelido não pode conter espaços.");
	});

	test("Shouldn't create a new user with a invalid nickname minlength", async () => {
		// Arrange
		const newUser = {
			nickname: "Jo",
			email: "john.doe@example.com",
			password: "Senha123!",
		};

		// Act
		const response = await request(app).post("/users").send(newUser);

		// Assert
		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("O apelido deve conter pelo menos 3 caracteres.");
	});

	test("Shouldn't create a new user with a invalid nickname maxlength", async () => {
		// Arrange
		const newUser = {
			nickname: "JohnDoe123456789012345678901234567890",
			email: "john.doe@example.com",
			password: "Senha123!",
		};

		// Act
		const response = await request(app).post("/users").send(newUser);

		// Assert
		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("O apelido deve conter no máximo 30 caracteres.");
	});	


	test("Shouldn't create a new user with a invalid email", async () => {
		// Arrange
		const newUser = {
			nickname: "JohnDoe",
			email: "john.doe",
			password: "Senha123!",
		};

		// Act
		const response = await request(app).post("/users").send(newUser);

		// Assert
		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("E-mail inválido.");
	});

	test("Shouldn't create a new user with a invalid password", async () => {
		// Arrange
		const newUser = {
			nickname: "JohnDoe",
			email: "john.doe@example.com",
			password: "123456",
		};

		// Act
		const response = await request(app).post("/users").send(newUser);

		// Assert
		expect(response.status).toBe(400);
		expect(response.body[0].message).toBe("Senha inválida.");
	});
});
