// controllers/authController.js
const User = require('../models/user'); // Importa o modelo de usuário
const jwt = require('jsonwebtoken');

// Controlador de registro
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar se o e-mail já está registrado
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Usuário já registrado com esse e-mail" });
        }

        // Criar o usuário sem criptografar a senha
        const user = new User({ name, email, password }); // Armazenando a senha diretamente
        await user.save();

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao registrar usuário", details: error });
    }
};

// Controlador de login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (user.password !== password) { // Use hash para senhas em produção
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user._id }, 'JWT_SECRET', { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login bem-sucedido',
            userId: user._id,
            username: user.name,
            token: token,
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor', error });
    }
};