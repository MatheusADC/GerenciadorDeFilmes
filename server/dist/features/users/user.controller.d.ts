import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
export declare class UserController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    validateToken(req: AuthenticatedRequest, res: Response): Promise<void>;
    private toUserResponse;
}
//# sourceMappingURL=user.controller.d.ts.map