"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path"); 
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../../docs/swagger");
const usersRoute = require("../routes/usersRoute");
const flagsRoute = require("../routes/flagsRoute");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* app.use(cors({
    origin: 'https://backend-flaggame.onrender.com/', 
    credentials: true, 
})); */

// Lista de domínios permitidos
const allowedOrigins = ['http://127.0.0.1:5500', 'https://backend-flaggame.onrender.com'];

/* // Configuração do CORS
app.use(cors({
  origin: function (origin, callback) {
    // Permite a solicitação se o domínio estiver na lista ou for undefined (como em ferramentas locais)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir cookies e credenciais
})); */
app.use(cors());

app.use("/users", usersRoute);
app.use("/flags", flagsRoute);
app.use(express.static(path.join(__dirname, "../../../public")));

module.exports = app;
