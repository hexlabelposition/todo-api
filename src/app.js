import express from 'express';
import connectDB from './database.js';

const app = express();

connectDB();

export default app;