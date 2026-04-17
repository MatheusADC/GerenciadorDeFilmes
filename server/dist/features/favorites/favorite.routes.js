"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRoutes = void 0;
const express_1 = require("express");
const favorite_controller_1 = require("./favorite.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const favoriteController = new favorite_controller_1.FavoriteController();
// Todas as rotas aqui são protegidas
router.use(auth_middleware_1.authMiddleware);
router.get('/', favoriteController.list.bind(favoriteController));
router.post('/:movieId', favoriteController.add.bind(favoriteController));
router.delete('/:movieId', favoriteController.remove.bind(favoriteController));
exports.favoriteRoutes = router;
//# sourceMappingURL=favorite.routes.js.map