// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes); // Adiciona as rotas de eventos

// Conexão ao banco de dados
connectDB();

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

// Inicializa o servidor
const PORT = process.env.PORT || 8000; // Define um valor padrão para a porta
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});