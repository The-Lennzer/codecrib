import {Request, Response, NextFunction} from 'express';

export const getThatResource = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('Resource fetched successfully!');
}