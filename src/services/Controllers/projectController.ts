import {Request, Response, NextFunction} from 'express';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    res.status(200).send('Project created successfully!');
}