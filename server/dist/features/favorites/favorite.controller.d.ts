import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
export declare class FavoriteController {
    add(req: AuthenticatedRequest, res: Response): Promise<void>;
    remove(req: AuthenticatedRequest, res: Response): Promise<void>;
    list(req: AuthenticatedRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=favorite.controller.d.ts.map