"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRoutes = void 0;
const express_1 = require("express");
const movie_controller_1 = require("./movie.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware"); // <--- Importamos o guarda
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = (0, express_1.Router)();
const movieController = new movie_controller_1.MovieController();
// GET /movies (Lista todos)
router.get('/', auth_middleware_1.authMiddleware, movieController.list.bind(movieController));
// GET /movies/:id (Busca um específico)
router.get('/:id', auth_middleware_1.authMiddleware, movieController.getById.bind(movieController));
// POST /movies/:id/rate (Avaliar um específico)
router.post('/:id/rate', auth_middleware_1.authMiddleware, movieController.rate.bind(movieController));
router.post('/', auth_middleware_1.authMiddleware, upload_middleware_1.upload.single('image'), // 'image' é o nome do campo que o Front deve enviar
movieController.create.bind(movieController));
exports.movieRoutes = router;
//# sourceMappingURL=movie.routes.js.map