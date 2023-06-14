const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Admin:admin123@fyp.qzlvrug.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

//Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

//Call the MongoDB connection function
connectToMongoDB();

//Specify the database and collection to use
const db = client.db('UserDB');
const collection = db.collection('User');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Route to verify username and password
app.post('/', async (req, res) => {
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

app.get('/', (req, res) => {
  res.send('fk how do i do this');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

