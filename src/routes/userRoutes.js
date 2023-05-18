const express = require('express');
const router = express.Router();

// Sample user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Get all users
router.get('/users', (req, res) => {
  res.json(users);
});

// Get a specific user by ID
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json(user);
  }
});

// Create a new user
router.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Generate a new unique ID
  const id = users.length + 1;

  // Create the new user object
  const newUser = { id, name, email };

  // Add the new user to the array
  users.push(newUser);

  res.status(201).json(newUser);
});

// Update an existing user
router.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(user => user.id === userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    user.name = name;
    user.email = email;
    res.json(user);
  }
});

// Delete a user
router.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === userId);

  if (index === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  }
});

module.exports = router;
