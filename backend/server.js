const User = require('./class/user');
const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://Admin:admin123@fyp.qzlvrug.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Call the MongoDB connection function
connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to verify username and password
app.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = new User(client, "", username, password, "", "", false);
  await user.login(res, username, password);
});

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});