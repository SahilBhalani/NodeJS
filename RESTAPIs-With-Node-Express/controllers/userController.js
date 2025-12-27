const User = require('../models/User')

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
};

const createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message })
    }
}

const updateUser = async (req, res) => {
  try {
    const updated = await User.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };