const {
  getAllUsers: fetchAllUsers,
  findUserById,
  createUserRecord,
  updateUserRecord,
  deleteUserRecord,
} = require('../utils/userStore');

// Get all users from the in-memory storage.
async function getAllUsers(req, res, next) {
  try {
    const users = fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// Get a user by id.
async function getUserById(req, res, next) {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const user = findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// Create a new user.
async function createUser(req, res, next) {
  try {
    const user = createUserRecord(req.body.name, req.body.email);

    res.status(201).json({
      message: 'User Created',
      user,
    });
  } catch (error) {
    next(error);
  }
}

// Update an existing user.
async function updateUser(req, res, next) {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const updatedUser = updateUserRecord(userId, req.body.name, req.body.email);

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User Updated',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

// Delete a user by id.
async function deleteUser(req, res, next) {
  try {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const deletedUser = deleteUserRecord(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User Deleted',
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
