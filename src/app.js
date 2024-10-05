import express from 'express';
import compression from './middleware/compression.middleware.js'
import usersRouter from './components/users/users.router.js';
import errorHandler from './middleware/errorHandler.middleware.js';

const app = express();

app.use(express.json());
app.use(compression)
app.use("/api/users", usersRouter);
app.use(errorHandler);

export default app;