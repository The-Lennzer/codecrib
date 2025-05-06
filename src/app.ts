const express = require('express');
import client from "./services/Database/setup";
import { Request, Response,  NextFunction} from "express";
import  authRouter  from "./routes/authRoutes";
const app = express();
const PORT = 5000;  

app.use(express.json());
app.use(authRouter);

const connectServerandDB = async () => {
    try {
        await client.connect();
        console.log('Connected to the database');

        app.listen(PORT, () => {
            console.log(`Server online, up and running at "http://localhost:${PORT}"`);
        });

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}   


app.get('/', (req: Request, res: Response) => {
    res.send('Server is active and running!');
  });

connectServerandDB();