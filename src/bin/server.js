"use strict";

require("dotenv").config();
const app = require("../app/app");
const { connectDB, sequelize } = require("../database/dbConnection");

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.get("/", (req, res) => res.send("Hello World!"));

const startServer = async () => {
	try {
		await connectDB();
		await sequelize.sync(); // Sincroniza os modelos com o banco de dados

		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}/api-docs`);
		});
	} catch (error) {
		console.error("Erro ao iniciar o servidor:", error);
	}
};

startServer();
