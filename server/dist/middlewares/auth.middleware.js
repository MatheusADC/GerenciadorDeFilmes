"use strict";
// Esse código verifica se o cabeçalho Authorization veio com o formato Bearer <token> e valida a assinatura.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// DICA: Em um projeto real, mova isso para um arquivo de configuração ou .env
const JWT_SECRET = 'minha_chave_secreta_super_segura';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }
    // O formato geralmente é "Bearer <TOKEN>"
    const [, token] = authHeader.split(' ');
    if (!token) {
        res.status(401).json({ message: 'Formato de token inválido' });
        return;
    }
    try {
        // Verifica se o token é válido
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next(); // Tudo certo, pode passar para o Controller!
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido ou expirado' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map