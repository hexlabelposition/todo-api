import { Router } from 'express';
import authRouter from '#routes/auth.router.js';
import usersRouter from '#routes/users.router.js';
import tasksRouter from '#routes/tasks.router.js';

const app = Router();
const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);

export default router;
