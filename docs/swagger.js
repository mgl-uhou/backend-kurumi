"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const swaggerDocs = {
	openapi: "3.1.0",
	info: {
		title: "FlagGame API",
		description:
			"API de CRUD para os usuários e modos de jogo do FlagGame para guiar os frontends.",
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
		{
			url: "https://backend-flaggame.onrender.com",
			description: "API de produção."
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
								allOf: [
									{
										type: "object",
										properties: {
											nickname: {
												type: "string",
											},
										},
									},
									{
										$ref: "#/components/schemas/UserLogin",
									},
								],
								example: {
									nickname: "JohnDoe",
									email: "john.doe@gmail.com",
									password: "@Dcba4321",
								},
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
											description:
												"Usuário criado com sucesso.",
										},
										user: {
											$ref: "#/components/schemas/User",
										},
									},
								},
								example: {
									message: "Usuário cadastrado com sucesso.",
									user: {
										nickname: "JohnDoe",
										email: "john.doe@gmail.com",
										id: "5e5e5e5e5e5e5e5e5e5e5e5e",
										createdAt: "2020-01-01T00:00:00.000Z",
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
									oneOf: [
										{
											type: "array",
											items: {
												type: "object",
												properties: {
													message: {
														type: "string",
														description:
															"Mensagem descrevendo um erro de validação",
													},
												},
											},
										},
										{
											$ref: "#/components/schemas/DefaultError",
										},
									],
								},
								example: {
									ValidationError: {
										summary: "Erro de validação",
										value: [
											{
												message: "E-mail inválido.",
											},
											{
												message: "Senha inválida.",
											},
										],
									},
									GeneralError: {
										summary: "Erro geral",
										value: {
											message: "Erro ao criar usuário.",
											error: "Mensagem de erro da aplicação.",
										},
									},
								},
							},
						},
					},
				},
			},
			put: {
				summary:
					"Atualiza o perfil do usuário com base no token de autenticação.",
				description:
					"Rota que atualiza os dados do usuário, podendo atualizar o nickname, o email, a senha ou todos de uma vez. \n\nRota protegida. Necessita de autenticação.",
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
									},
									email: {
										type: "string",
									},
									password: {
										type: "string",
									},
								},
							},
							example: {
								nickname: "johnnyS2",
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
											description: "Mensagem de sucesso.",
										},
									},
								},
								example: {
									message: "Usuário atualizado com sucesso.",
								},
							},
						},
					},
					400: {
						description: "Erro ao atualizar usuário.",
						content: {
							"application/json": {
								schema: {
									oneOf: [
										{
											type: "array",
											items: {
												type: "object",
												properties: {
													message: {
														type: "string",
														description:
															"Mensagem descrevendo um erro de validação",
													},
												},
											},
										},
										{
											$ref: "#/components/schemas/DefaultError",
										},
									],
								},
								example: {
									ValidationError: {
										summary: "Erro de validação",
										value: [
											{
												message: "E-mail inválido.",
											},
											{
												message: "Senha inválida.",
											},
										],
									},
									GeneralError: {
										summary: "Erro geral",
										value: {
											message:
												"Falha ao atualizar usuário.",
											error: "Mensagem de erro da aplicação.",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Usuário não autorizado.",
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
											description:
												"Erro retornado do JWT.",
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
									unauthorized: {
										message: "Usuário não autorizado.",
									},
									invalidToken: {
										message: "Usuário não autorizado.",
										error: {
											name: "JsonWebTokenError",
											message: "invalid token",
										},
									},
								},
							},
						},
					},
					500: {
						description: "Erro ao buscar usuário.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Falha ao buscar usuário.",
									error: "Usuário não encontrado.",
								},
							},
						},
					},
				},
			},
			delete: {
				summary:
					"Deleta o perfil do usuário com base no id do token de autenticação.",
				description:
					"Rota que deleta o perfil do usuário, podendo deletar o perfil de uma vez. \n\nRota protegida. Necessita de autenticação.",
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
											description: "Mensagem de sucesso.",
										},
									},
								},
								example: {
									message: "Usuário deletado com sucesso.",
								},
							},
						},
					},
					400: {
						description: "Erro ao deletar usuário.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Falha ao deletar usuário.",
								},
							},
						},
					},
					401: {
						description: "Usuário não autorizado.",
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
											description:
												"Erro retornado do JWT.",
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
									unauthorized: {
										message: "Usuário não autorizado.",
									},
									invalidToken: {
										message: "Usuário não autorizado.",
										error: {
											name: "JsonWebTokenError",
											message: "invalid token",
										},
									},
								},
							},
						},
					},
					500: {
						description: "Erro ao buscar usuário.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Falha ao buscar usuário.",
									error: "Usuário não encontrado.",
								},
							},
						},
					},
				},
			},
		},
		"/users/login": {
			post: {
				summary: "Faz o login do usuário.",
				description:
					"Rota post de login de usuário para obter o token de autenticação e outras informações.",
				tags: ["Users"],
				requestBody: {
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/UserLogin",
								example: {
									email: "john.doe@gmail.com",
									password: "@Dcba4321",
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: "Login realizada com sucesso.",
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
											description:
												"Token de autenticação.",
										},
									},
								},
								example: {
									user: {
										id: "5e5e5e5e5e5e5e5e5e5e5e5e",
										nickname: "JohnDoe",
										email: "john.doe@gmail.com",
										createdAt: "2020-01-01T00:00:00.000Z",
									},
									token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQxNDRjMzNhYWZjOWI1NGU0YWI2NGIiLCJpYXQiOjE3MzIzMzIzMjEsImV4cCI6MTczMjMzMjMyMn0.H1yCMXThYFxfL-yJt1RbGvJhzcQOMssKnjA2I53p9Rw",
								},
							},
						},
					},
					400: {
						description: "Erro ao realizar o login.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Erro ao realizar o login.",
									error: "E-mail ou senha inválidos.",
								},
							},
						},
					},
				},
			},
		},
		"/users/profile": {
			get: {
				summary:
					"Retorna o perfil do usuário com base no token de autenticação.",
				description:
					"Rota get que retorna os dados do usuário a partir do token de autenticação. \n\nRota protegida. Necessita de autenticação.",
				tags: ["Users"],
				security: [{ bearerAuth: [] }],
				responses: {
					200: {
						description: "Ok.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/User",
								},
								example: {
									id: "5e5e5e5e5e5e5e5e5e5e5e5e",
									nickname: "JohnDoe",
									email: "john.doe@gmail.com",
									createdAt: "2020-01-01T00:00:00.000Z",
								},
							},
						},
					},
					401: {
						description: "Usuário não autorizado.",
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
											description:
												"Erro retornado do JWT.",
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
									unauthorized: {
										message: "Usuário não autorizado.",
									},
									invalidToken: {
										message: "Usuário não autorizado.",
										error: {
											name: "JsonWebTokenError",
											message: "invalid token",
										},
									},
								},
							},
						},
					},
					500: {
						description: "Erro ao buscar usuário.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Falha ao buscar usuário.",
									error: "Usuário não encontrado.",
								},
							},
						},
					},
				},
			},
		},
		"/flags": {
			post: {
				summary: "Cria uma nova bandeira (somente administradores).",
				description: "Rota post para criar novas bandeiras.",
				tags: ["Flags"],
				security: [{ bearerAuth: [] }],
				requestBody: {
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Flag",
							},
							example: {
								name: "Alagoas",
								link: "https://th.bing.com/th/id/R.66644858928291e4453cb4f27297cc27?rik=HPMmhbSoUr1J1w&riu=http%3a%2f%2faimore.org%2fbrasil%2fAlagoas.jpg&ehk=OX%2f%2fuH2Wl%2b6nHSArgFsnVtcgeh60j9n4gLSTv10csQw%3d&risl=&pid=ImgRaw&r=0",
							},
						},
					},
				},
				responses: {
					201: {
						description: "Bandeira criada com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
										},
									},
								},
								example: {
									message: "Bandeira cadastrada com sucesso.",
								},
							},
						},
					},
					400: {
						description: "Erro ao criar bandeira.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Erro ao cadastrar bandeira.",
								},
							},
						},
					},
				},
			},
			get: {
				summary: "Retorna todas as bandeiras.",
				description:
					"Rota get para buscar todas as bandeiras cadastradas no banco.",
				tags: ["Flags"],
				responses: {
					200: {
						description: "Requisição realizada com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "array",
									items: {
										allOf: [
											{
												type: "object",
												properties: {
													id: {
														type: "string",
													},
												},
											},
											{
												$ref: "#/components/schemas/Flag",
											},
										],
									},
								},
								example: [
									{
										id: "5e5e5e5e5e5e5e5e5e5e5e5e",
										name: "Alagoas",
										link: "https://th.bing.com/th/id/R.66644858928291e4453cb4f27297cc27?rik=HPMmhbSoUr1J1w&riu=http%3a%2f%2faimore.org%2fbrasil%2fAlagoas.jpg&ehk=OX%2f%2fuH2Wl%2b6nHSArgFsnVtcgeh60j9n4gLSTv10csQw%3d&risl=&pid=ImgRaw&r=0",
									},
								],
							},
						},
					},
					400: {
						description: "Erro ao buscar bandeiras.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Erro ao buscar bandeiras.",
									error: "Erro ao buscar bandeiras.",
								},
							},
						},
					},
				},
			},
		},
		"/flags/{id}": {
			get: {
				summary: "Retorna uma bandeira.",
				description:
					"Rota get para buscar uma bandeira com base em seu id.",
				tags: ["Flags"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "ID da bandeira que será buscada.",
						require: true,
						schema: {
							type: "string",
						},
					},
				],
				responses: {
					200: {
						description: "Requisição realizada com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									allOf: [
										{
											type: "object",
											properties: {
												id: {
													type: "string",
												},
											},
										},
										{
											$ref: "#/components/schemas/Flag",
										},
									],
								},
							},
						},
					},
					400: {
						description: "Erro ao buscar bandeira.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Erro ao buscar bandeira.",
								},
							},
						},
					},
					404: {
						description: "Bandeira não encontrada.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Bandeira não encontrada.",
								},
							},
						},
					},
				},
			},
			put: {
				summary:
					"Atualiza os registros de bandeiras (somente adminstradores).",
				description: "Rota put para atualizar as bandeiras.",
				tags: ["Flags"],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "ID da bandeira que será atualizada.",
						require: true,
						schema: {
							type: "string",
						},
					},
				],
				requestBody: {
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Flag",
							},
							example: {
								name: "Alagoas",
							},
						},
					},
				},
				responses: {
					200: {
						description: "Requisição realizada com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
										},
									},
								},
								example: {
									message: "Bandeira atualizada com sucesso.",
								},
							},
						},
					},
					400: {
						description: "Erro ao atualizar bandeira.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Erro ao atualizar bandeira.",
								},
							},
						},
					},
					404: {
						description: "Bandeira não encontrada.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Bandeira não encontrada.",
								},
							},
						},
					},
				},
			},
			delete: {
				summary: "Deleta uma bandeira (somente administradores).",
				description:
					"Rota delete para deletar uma bandeira com base em seu id.",
				tags: ["Flags"],
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "ID da bandeira que é deletada.",
						require: true,
						schema: {
							type: "string",
						},
					},
				],
				responses: {
					200: {
						description: "Requisição realizada com sucesso.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
										},
									},
								},
								example: {
									message: "Bandeira deletada com sucesso.",
								},
							},
						},
					},
					400: {
						description:
							"Erro ao deletar bandeira, seja por erro do banco ou bandeira não encontrada.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Erro ao deletar bandeira.",
								},
							},
						},
					},
					404: {
						description: "Bandeira não encontrada.",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/DefaultError",
								},
								example: {
									message: "Bandeira não encontrada.",
								},
							},
						},
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
					createdAt: {
						type: "string",
					},
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
			},
			DefaultError: {
				type: "object",
				properties: {
					message: {
						type: "string",
						description: "Erro ao processar a requisição.",
					},
					error: {
						type: "string",
						description: "Erro relatado pela aplicação.",
					},
				},
			},
			Flag: {
				type: "object",
				properties: {
					name: {
						type: "string",
					},
					link: {
						type: "string",
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
