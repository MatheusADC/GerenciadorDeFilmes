import { Request, Response } from 'express';
export declare class MovieController {
    list(req: Request, res: Response): Promise<void>;
    getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    rate(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=movie.controller.d.ts.map