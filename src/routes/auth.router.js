import { Router } from 'express';
import controller from '#controllers/auth.controller.js';

const router = Router();

// Register a new user
router.post('/register', controller.register);
// Login an existing user
router.post('/login', controller.login);

export default router;
