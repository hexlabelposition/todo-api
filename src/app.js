import express from 'express';
import compression from '#middlewares/compression.js';
import apiRouter from '#routes/api.router.js';
import errorHandler from '#middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(compression);
app.use('/api', apiRouter);
app.use(errorHandler);

export default app;
