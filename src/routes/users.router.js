import { Router } from 'express';
import controller from '#controllers/users.controller.js';

const router = Router();

// Create a new user
router.post('/', controller.createUser);
// Get a user by ID
router.get('/:userId', controller.getUserById);
// Get all users
router.get('/', controller.getAllUsers);
// Update a user
router.patch('/:userId', controller.updateUser);
// Delete a user
router.delete('/:userId', controller.deleteUser);

export default router;
