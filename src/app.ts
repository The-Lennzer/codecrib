import express from 'express';
import { Request, Response } from 'express';
import authRouter from './routes/authRoutes';
import resourceRouter from './routes/resourceRoutes';
import client from './services/Database/setup';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/resource', resourceRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is active and running!');
});

export { app, client }; // Export both for testing
