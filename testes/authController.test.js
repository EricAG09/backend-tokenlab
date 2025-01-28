const { login } = require('../controllers/authController');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

jest.mock('../models/User'); // Mock do modelo User

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    describe('Login', () => {
        it('should return 401 if user is not found', async () => {
            User.findOne.mockResolvedValue(null); // Simula que o usuário não foi encontrado

            const req = { body: { email: 'test@gmail.com', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        });

        it('should return 401 if password is invalid', async () => {
            const mockUser  = {
                email: 'test@gmail.com',
                password: await bcrypt.hash('123', 10), // Senha correta
            };
            User.findOne.mockResolvedValue(mockUser ); // Simula que o usuário foi encontrado

            const req = { body: { email: 'test@gmail.com', password: 'wrongPassword' } }; // Senha errada
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Credenciais inválidas' });
        });

        it('should return 200 and a token if login is successful', async () => {
            const mockUser  = {
                email: 'test@gmail.com',
                password: await bcrypt.hash('123', 10), // Senha correta
            };
            User.findOne.mockResolvedValue(mockUser ); // Simula que o usuário foi encontrado

            const req = { body: { email: 'test@gmail.com', password: '123' } }; // Senha correta
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Login bem-sucedido' }));
        });
    });
});