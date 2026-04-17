"use strict";
// Responsável pela lógica de negócios e acesso aos dados (ler/escrever no arquivo JSON).
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
// Caminho absoluto para o arquivo JSON
const DB_PATH = path_1.default.join(__dirname, '../../../data/users.json');
class UserService {
    async findByEmail(email) {
        const users = await this.getUsers();
        return users.find((u) => u.email === email);
    }
    async findById(id) {
        const users = await this.getUsers();
        return users.find((u) => u.id === id);
    }
    async create(user) {
        const users = await this.getUsers();
        users.push(user);
        await promises_1.default.writeFile(DB_PATH, JSON.stringify(users, null, 2));
        return user;
    }
    // Helper privado para garantir que o arquivo e a pasta existam
    async getUsers() {
        try {
            const data = await promises_1.default.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            // Se o arquivo não existir, cria a pasta data e retorna array vazio
            await promises_1.default.mkdir(path_1.default.dirname(DB_PATH), { recursive: true });
            await promises_1.default.writeFile(DB_PATH, '[]');
            return [];
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map