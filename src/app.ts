import express from 'express';
import { Request, Response } from 'express';
import authRouter from './routes/authRoutes';
import resourceRouter from './routes/resourceRoutes';
import client from './services/Database/setup';

const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/resource', resourceRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is active and running!');
});

export { app, client }; // Export both for testing
