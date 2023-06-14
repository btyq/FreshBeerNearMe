const express = require('express');
const router = express.Router();

// Import the necessary dependencies
const { collection } = require('./server'); // Assuming the collection variable is exported from server.js

// Route to verify username and password
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find a document that matches the username and password
    const result = await collection.findOne({ username, password });

    if (result) {
      res.json({ success: true, username: result.username, id: result.password });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

module.exports = router;