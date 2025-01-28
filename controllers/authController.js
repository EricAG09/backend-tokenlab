// controllers/authController.js
const User = require('../models/user'); // Importa o modelo de usuário

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
        // Verifica se o usuário existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se a senha corresponde (sem criptografia, apenas comparação direta)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Se as credenciais forem válidas, você pode retornar o ID do usuário ou uma mensagem de sucesso
        res.status(200).json({ message: 'Login bem-sucedido', userId: user._id });
    } catch (error) {
        console.error("Erro ao realizar login:", error.message);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
};