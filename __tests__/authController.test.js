import { singUp, signIn } from '../src/controllers/authController.js'; // Ajusta el path según tu estructura
import { Users } from '../src/models/user';
import Jwt from 'jsonwebtoken';
import { Roles } from '../src/models/roles';

jest.mock('../src/models/user');
jest.mock('jsonwebtoken');
jest.mock('../src/models/roles');

describe('Auth Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            header: jest.fn()
        };
    });

    describe('signUp', () => {
        it('should return 400 if passwords do not match', async () => {
            req.body = {
                password: '123456',
                repeatPassword: '654321'
            };

            await singUp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
        });

        it('should return 400 if password or repeatPassword is missing', async () => {
            req.body = {
                password: '123456'
            };

            await singUp(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Password and repeat password are required' });
        });

        it('should create a new user and return token', async () => {
            req.body = {
                name: 'John',
                lastName: 'Doe',
                userName: 'johndoe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                password: '123456',
                repeatPassword: '123456',
                roles: ['admin']
            };

            Users.encryptPassword.mockResolvedValue('hashedPassword');
            Roles.find.mockResolvedValue([{ _id: 'roleId', name: 'admin' }]);
            Users.prototype.save.mockResolvedValue({ _id: 'userId', roles: ['roleId'] });
            Jwt.sign.mockReturnValue('token');

            await singUp(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'token' });
        });
    });

    describe('signIn', () => {
        it('should return 400 if user not found', async () => {
            req.body = { email: 'johndoe@example.com' };

            Users.findOne.mockResolvedValue(null);

            await signIn(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should return 401 if password is invalid', async () => {
            req.body = { email: 'johndoe@example.com', password: 'wrongpassword' };

            Users.findOne.mockResolvedValue({ password: 'hashedPassword' });
            Users.comparePassword.mockResolvedValue(false);

            await signIn(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ token: null, message: 'Invalid password' });
        });

        it('should return token and roles if credentials are correct', async () => {
            req.body = { email: 'johndoe@example.com', password: '123456' };

            const userFound = { _id: 'userId', password: 'hashedPassword', roles: ['roleId'] };

            Users.findOne.mockResolvedValue(userFound);
            Users.comparePassword.mockResolvedValue(true);
            Jwt.sign.mockReturnValue('token');

            await signIn(req, res);

            expect(res.json).toHaveBeenCalledWith({ token: 'token', roles: userFound.roles });
        });
    });
});
