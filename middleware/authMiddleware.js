// middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
  // Verifique se o token de autenticação está presente no cabeçalho
  const token = req.headers['authorization'];

  // Para fins de demonstração, vamos usar um token fixo
  const validToken = 'JWT_SECRET'; // Substitua por um token real

  if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Verifique se o token é válido
  if (token !== validToken) {
      return res.status(403).json({ message: 'Token inválido' });
  }

  // Se o token for válido, continue para o próximo middleware ou rota
  next();
};

module.exports = authMiddleware;