import jwt, { JwtPayload } from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";

interface AuthenticatedRequest extends Request {
    userId?: string
}

export default async function userAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>{
    const token = req.header('Auth-Token');
    if(!token) {
        res.status(401).json({error: 'Access Denied!'})
        return;
    };
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY! as string) as JwtPayload;
        req.userId = verified.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid Token');
        return;
    }
    return;
}
