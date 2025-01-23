const authMiddleware = require("../authMiddleware");
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não encontrado ou inválido" });
    }

    try {
        const token = authHeader.split(' ')[1]; // Obtém o token após "Bearer"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.userId; // Adiciona o userId na requisição
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

module.exports = authMiddleware;
