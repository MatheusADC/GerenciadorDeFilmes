"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Usamos .bind(userController) para não perder o contexto do 'this'
router.post('/', userController.register.bind(userController)); // POST /users
router.post('/login', userController.login.bind(userController)); // POST /users/login
router.get('/validate-token', auth_middleware_1.authMiddleware, userController.validateToken.bind(userController)); // GET /users/validate-token
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map