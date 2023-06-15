const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://Admin:admin123@fyp.qzlvrug.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

//Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

//Call the MongoDB connection function
connectToMongoDB();

//Specify the database and collection to use
const db = client.db('FreshBearNearMe');
const collection = db.collection('User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());

//Route to verify username and password
app.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    //Find a document that matches the username and password
    const result = await collection.findOne({ username, password });

    if (result) {
      //Create a session token
      const sessionToken = 'testtoken123';

      //Set the session token in a cookie
      res.cookie('sessionToken', sessionToken, { httpOnly: true });

      //Set the username in a separate cookie
      res.cookie('username', result.username, { httpOnly: true });

      res.json({ success: true, username: result.username, password: result.password });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

//Route to signup user
app.post('/signup', async (req, res) => {
  const { username, password, email, mobileNumber, receiveNotification } = req.body;

  try {
    //Insert the user data into the MongoDB collection
    const result = await collection.insertOne({
      username,
      password,
      email,
      mobileNumber,
      receiveNotification: false
    });

    res.json({ success: true, message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'An error occurred during signup' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
