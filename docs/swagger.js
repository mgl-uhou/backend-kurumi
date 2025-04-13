"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const swaggerDocs = {
	openapi: "3.1.0",
	info: {
		title: "Kurumi API",
		description:
			"API de CRUD para os usuários do Kurumi para guiar os frontends.",
		termsOfService: `http://${HOST}:${PORT}/terms`,
		contact: {
			email: "mfl10@aluno.ifal.edu.br",
		},
		version: "1.0.0",
	},
	servers: [
		{
			url: `http://${HOST}:${PORT}`,
			description: "API de testes para os devs.",
		},
	],
	paths: {
		"/users": {
			post: {
				summary: "Cria um novo usuário.",
				description: "Rota post para criar novos usuários.",
				tags: ["Users"],
				requestBody: {
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									nickname: {
										type: "string",
										example: "JohnDoe",
									},
									email: {
										type: "string",
										example: "john.doe@gmail.com",
									},
									password: {
										type: "string",
										example: "@Dcba4321",
									},
									cep: {
										type: "string",
										example: "57000123",
									},
									street: {
										type: "string",
										example: "Rua Example",
									},
									neighborhood: {
										type: "string",
										example: "Centro",
									},
									city: {
										type: "string",
										example: "Maceió",
									},
									state: {
										type: "string",
										example: "Alagoas",
									},
								},
								required: [
									"nickname",
									"email",
									"password",
									"cep",
									"street",
									"neighborhood",
									"city",
									"state",
								],
							},
						},
					},
				},
				responses: {
					201: {
						description: "Usuário criado com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Usuário cadastrado com sucesso.",
										},
										user: {
											$ref: "#/components/schemas/User",
										},
									},
								},
							},
						},
					},
					400: {
						description: "Erro ao criar usuário.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ValidationError",
								},
							},
						},
					},
				},
			},
			put: {
				summary: "Atualiza o perfil do usuário.",
				description: "Atualiza os dados do usuário autenticado.",
				tags: ["Users"],
				security: [{ bearerAuth: [] }],
				requestBody: {
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									nickname: {
										type: "string",
										example: "JohnDoe2",
									},
									email: {
										type: "string",
										example: "john2.doe@gmail.com",
									},
									password: {
										type: "string",
										example: "@Dcba4321",
									},
									cep: {
										type: "string",
										example: "57000123",
									},
									street: {
										type: "string",
										example: "Rua Example",
									},
									neighborhood: {
										type: "string",
										example: "Centro",
									},
									city: {
										type: "string",
										example: "Maceió",
									},
									state: {
										type: "string",
										example: "AL",
									},
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: "Usuário atualizado com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Usuário atualizado com sucesso.",
										},
									},
								},
							},
						},
					},
					400: {
						$ref: "#/components/responses/ValidationError",
					},
					401: {
						$ref: "#/components/responses/UnauthorizedError",
					},
				},
			},
			delete: {
				summary: "Deleta o perfil do usuário.",
				description: "Deleta o usuário autenticado.",
				tags: ["Users"],
				security: [{ bearerAuth: [] }],
				responses: {
					200: {
						description: "Usuário deletado com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Usuário deletado com sucesso.",
										},
									},
								},
							},
						},
					},
					401: {
						$ref: "#/components/responses/UnauthorizedError",
					},
					400: {
						$ref: "#/components/responses/ValidationError",
					},
				},
			},
		},
		"/users/login": {
			post: {
				summary: "Realiza login do usuário.",
				description: "Autentica o usuário e retorna um token JWT.",
				tags: ["Users"],
				requestBody: {
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/UserLogin",
							},
						},
					},
				},
				responses: {
					200: {
						description: "Login realizado com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										user: {
											$ref: "#/components/schemas/User",
										},
										token: {
											type: "string",
											example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
										},
									},
								},
							},
						},
					},
					400: {
						$ref: "#/components/responses/ValidationError",
					},
				},
			},
		},
		"/users/profile": {
			get: {
				summary: "Retorna o perfil do usuário.",
				description: "Retorna os dados do usuário autenticado.",
				tags: ["Users"],
				security: [{ bearerAuth: [] }],
				responses: {
					200: {
						description: "Dados do usuário.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/User",
								},
							},
						},
					},
					401: {
						$ref: "#/components/responses/UnauthorizedError",
					},
				},
			},
		},
	},
	components: {
		schemas: {
			User: {
				type: "object",
				properties: {
					id: {
						type: "string",
					},
					nickname: {
						type: "string",
					},
					email: {
						type: "string",
					},
					cep: {
						type: "string",
					},
					street: {
						type: "string",
					},
					neighborhood: {
						type: "string",
					},
					city: {
						type: "string",
					},
					state: {
						type: "string",
					},
					createdAt: {
						type: "string",
					},
				},
				example: {
					id: "1",
					nickname: "JohnDoe",
					email: "john.doe@gmail.com",
					cep: "57000123",
					street: "Rua Example",
					neighborhood: "Centro",
					city: "Maceió",
					state: "AL",
					createdAt: "2024-04-12T00:00:00.000Z",
				},
			},
			UserLogin: {
				type: "object",
				properties: {
					email: {
						type: "string",
					},
					password: {
						type: "string",
					},
				},
				example: {
					email: "john.doe@gmail.com",
					password: "@Dcba4321",
				},
			},
			ValidationError: {
				type: "array",
				items: {
					type: "object",
					properties: {
						message: {
							type: "string",
						},
					},
				},
				example: [
					{
						message: "O apelido deve conter pelo menos 3 caracteres.",
					},
					{
						message: "E-mail inválido.",
					},
				],
			},
		},
		responses: {
			UnauthorizedError: {
				description: "Acesso não autorizado",
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								message: {
									type: "string",
								},
								error: {
									type: "object",
									properties: {
										name: {
											type: "string",
										},
										message: {
											type: "string",
										},
									},
								},
							},
						},
						example: {
							message: "Usuário não autorizado.",
							error: {
								name: "JsonWebTokenError",
								message: "invalid token",
							},
						},
					},
				},
			},
			ValidationError: {
				description: "Erro de validação",
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/ValidationError",
						},
					},
				},
			},
		},
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
};

module.exports = swaggerDocs;
