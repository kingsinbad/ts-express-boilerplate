import { Request, Response, NextFunction } from 'express';





export default function(req: any, res: Response, next: NextFunction) {
    req.body.authMiddleware = true;
    req.user = '<UserID>';
    next();
}