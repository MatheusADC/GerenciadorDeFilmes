"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./features/users/user.routes");
const movie_routes_1 = require("./features/movies/movie.routes");
const favorite_routes_1 = require("./features/favorites/favorite.routes");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use((0, cors_1.default)()); // Libera acesso para o Angular
app.use(express_1.default.json()); // Permite ler JSON no corpo das requisições
// Servir arquivos estáticos
// // Ex: http://localhost:3000/uploads/minha-imagem.jpg
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
// Rotas
app.use('/users', user_routes_1.userRoutes);
app.use('/movies', movie_routes_1.movieRoutes);
app.use('/favorites', favorite_routes_1.favoriteRoutes);
// Rota de teste
app.get('/', (req, res) => {
    res.send('API Funcionando 🚀');
});
// Inicialização
app.listen(PORT, () => {
    console.log(`🎬 Servidor de filmes rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map