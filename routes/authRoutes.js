const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// Rota para registrar usuário
router.post('/register', register);

// Rota para login de usuário
router.post('/login', login);

module.exports = router;
