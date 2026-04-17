"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
const movie_service_1 = require("../movies/movie.service"); // Reutilizamos o service de filmes
const DB_PATH = path_1.default.join(__dirname, '../../../data/favorites.json');
class FavoritesService {
    movieService = new movie_service_1.MovieService();
    // Adicionar Favorito
    async add(userId, movieId) {
        const allFavorites = await this.getAll();
        // Busca registro do usuário ou cria novo
        let userFav = allFavorites.find((f) => f.userId === userId);
        if (!userFav) {
            userFav = { userId, movieIds: [] };
            allFavorites.push(userFav);
        }
        // Evita duplicados
        if (!userFav.movieIds.includes(movieId)) {
            userFav.movieIds.push(movieId);
            await promises_1.default.writeFile(DB_PATH, JSON.stringify(allFavorites, null, 2));
        }
    }
    // Remover Favorito
    async remove(userId, movieId) {
        const allFavorites = await this.getAll();
        const userFav = allFavorites.find((f) => f.userId === userId);
        if (userFav) {
            userFav.movieIds = userFav.movieIds.filter((id) => id !== movieId);
            await promises_1.default.writeFile(DB_PATH, JSON.stringify(allFavorites, null, 2));
        }
    }
    // Listar Filmes Favoritos (Retorna objetos Movie completos)
    async listByUser(userId) {
        const allFavorites = await this.getAll();
        const userFav = allFavorites.find((f) => f.userId === userId);
        if (!userFav || userFav.movieIds.length === 0) {
            return [];
        }
        // Busca TODOS os filmes do sistema
        const allMovies = await this.movieService.findAll();
        // Filtra apenas os que estão na lista de IDs do usuário
        return allMovies.filter((movie) => userFav.movieIds.includes(movie.id));
    }
    async getAll() {
        try {
            const data = await promises_1.default.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data);
        }
        catch {
            // Se não existir, cria
            await promises_1.default.mkdir(path_1.default.dirname(DB_PATH), { recursive: true });
            await promises_1.default.writeFile(DB_PATH, '[]');
            return [];
        }
    }
}
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map