import express from 'express';
import { Request, Response } from 'express';
import authRouter from './routes/authRoutes';
import client from './services/Database/setup';
import cors from 'cors';
import projectRouter from './routes/projectRoutes';
import postRouter from './routes/postRoutes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/posts', postRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is active and running!');
});

export { app, client }; // Export both for testing
