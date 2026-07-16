const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const validateUserRequest = require('../middleware/validateUser');

const router = express.Router();

// Route to fetch all users.
router.get('/', getAllUsers);

// Route to fetch a single user by id.
router.get('/:id', getUserById);

// Route to create a new user.
router.post('/', validateUserRequest, createUser);

// Route to update an existing user.
router.put('/:id', validateUserRequest, updateUser);

// Route to delete a user.
router.delete('/:id', deleteUser);

module.exports = router;
