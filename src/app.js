import express from 'express';
import connectDB from './database.js';
import usersRouter from './components/users/users.router.js';
import errorHandler from './middleware/errorHandler.middleware.js';

const app = express();

connectDB();

app.use(express.json());
app.use("/api/users", usersRouter);
app.use(errorHandler);

export default app;