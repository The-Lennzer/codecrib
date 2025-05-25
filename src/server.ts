import { app, client } from './app';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server online at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();
