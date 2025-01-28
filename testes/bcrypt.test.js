const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user'); // Ajuste o caminho conforme necessário
const authController = require('../controllers/authController'); // Ajuste o caminho conforme necessário

const app = express();
app.use(express.json());
app.post('/api/auth/login', authController.login);

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
}, 10000); // Aumenta o tempo limite para 10 segundos

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('POST /api/auth/login', () => {
    it('should return 401 for invalid password', async () => {
        const userData = {
            email: 'testuser@example.com',
            password: 'password123'
        };

        // Cria um usuário para testar
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({ email: userData.email, password: hashedPassword });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: userData.email, password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Credenciais inválidas');
    });
});