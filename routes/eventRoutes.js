const express = require("express");
const { createEvent, getEvents, getEventById } = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Rota para criar um evento (precisa estar autenticado)
router.post("/create", authMiddleware, createEvent);

// Rota para listar todos os eventos
router.get("/", getEvents);

// Rota para obter detalhes de um evento específico
router.get("/:id", getEventById);

module.exports = router;
