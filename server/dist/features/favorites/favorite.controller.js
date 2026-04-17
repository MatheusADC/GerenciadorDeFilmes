"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const favorites_service_1 = require("./favorites.service");
const favoritesService = new favorites_service_1.FavoritesService();
class FavoriteController {
    // POST /favorites/:movieId
    async add(req, res) {
        const userId = req.user.id; // O '!' diz: tenho certeza que o middleware auth preencheu isso
        const movieId = parseInt(req.params.movieId);
        if (isNaN(movieId)) {
            res.status(400).json({ message: 'ID do filme inválido' });
            return;
        }
        await favoritesService.add(userId, movieId);
        res.status(201).json({ message: 'Filme adicionado aos favoritos' });
    }
    // DELETE /favorites/:movieId
    async remove(req, res) {
        const userId = req.user.id;
        const movieId = parseInt(req.params.movieId);
        if (isNaN(movieId)) {
            res.status(400).json({ message: 'ID do filme inválido' });
            return;
        }
        await favoritesService.remove(userId, movieId);
        res.status(204).send(); // Sucesso sem conteúdo
    }
    // GET /favorites
    async list(req, res) {
        const userId = req.user.id;
        const movies = await favoritesService.listByUser(userId);
        res.json(movies);
    }
}
exports.FavoriteController = FavoriteController;
//# sourceMappingURL=favorite.controller.js.map