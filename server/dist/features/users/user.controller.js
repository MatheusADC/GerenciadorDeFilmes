"use strict";
// Responsável por lidar com Requisição HTTP, Resposta e Orquestração do JWT.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("./user.service");
const userService = new user_service_1.UserService();
const JWT_SECRET = 'minha_chave_secreta_super_segura';
class UserController {
    // REGISTRO
    async register(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            return;
        }
        const userExists = await userService.findByEmail(email);
        if (userExists) {
            res.status(409).json({ message: 'E-mail já cadastrado' });
            return;
        }
        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // Nota: Em produção, nunca salve a senha pura. Use bcrypt!
        };
        await userService.create(newUser);
        // Remove a senha do retorno
        const response = this.toUserResponse(newUser);
        res.status(201).json(response);
    }
    // LOGIN
    async login(req, res) {
        const { email, password } = req.body;
        const user = await userService.findByEmail(email);
        // Validação simples (senha em texto puro para este exemplo)
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'E-mail ou senha inválidos' });
            return;
        }
        // Gerar Token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });
        // Remove a senha do retorno
        const userResponse = this.toUserResponse(user);
        res.json({
            token,
            user: userResponse,
        });
    }
    async validateToken(req, res) {
        // O authMiddleware já garantiu que req.user existe
        const userId = req.user.id;
        const user = await userService.findById(userId);
        if (!user) {
            // Caso raro: Token é válido, mas o usuário foi deletado do banco
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const userResponse = this.toUserResponse(user);
        res.json(userResponse);
    }
    toUserResponse(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map