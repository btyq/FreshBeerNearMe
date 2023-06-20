const User = require('./class/user');
const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://Admin:admin123@fyp.qzlvrug.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const db = client.db('FreshBearNearMe');
const collection = db.collection('User');

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is up');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//=======================================All Route Functions=============================================

// Custom middleware to store 'user' object in a global variable
let globalUser = null;
app.use((req, res, next) => {
  if (req.url === '/') {
    globalUser = new User(client, "", "", "", "", "", false);
  } 
  next();
});

//Route to verify username and password
app.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!globalUser) {
    globalUser = new User(client, "", username, password, "", "", false);
  } else {
    globalUser.username = username;
    globalUser.password = password;
  }
  await globalUser.login(res, username, password);
});

//Route to verify username and password
app.post('/signup', async (req, res) => {
  const { username, password, email, mobileNumber, receiveNotification } = req.body;

  try {
    // Check if the username already exists
    const existingUsername = await collection.findOne({ username });
    if (existingUsername) {
      return res.json({ success: false, message: 'Username already exists' });
    }

    // Check if the email already exists
    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    // Check if the mobile number already exists
    const existingMobileNumber = await collection.findOne({ mobileNumber });
    if (existingMobileNumber) {
      return res.json({ success: false, message: 'Mobile number already exists' });
    }

    // Retrieve the last user document and get the next userID
    const lastUser = await collection.find().sort({ userID: -1 }).limit(1).toArray();
    const nextUserID = lastUser.length > 0 ? lastUser[0].userID + 1 : 1;

    // Insert the user data into the MongoDB collection with the next userID
    const result = await collection.insertOne({
      userID: nextUserID,
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

//Route to retrieve user data at userProfile
app.post('/getUserData', async (req, res) => {
  const { username } = req.body;

  try {
    // Find the user document that matches the provided username
    const user = await collection.findOne({ username });
    if (user) {
      // Extract the necessary data from the user document
      const { email, mobileNumber, password, receiveNotification } = user;

      // Send the user data as the response
      res.json({ success: true, email, mobileNumber, password, receiveNotification });
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while retrieving user data' });
  }
});

//Route to edit user's profile
app.post('/editProfile', async (req, res) => {
  try {
    if (globalUser) {
      // Store the existing user data in 'oldData'
      const oldData = {
        username: globalUser.username,
        password: globalUser.password,
        email: globalUser.email,
        mobileNumber: globalUser.mobileNumber,               
        //receiveNotification wait
      };
      const newData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber
      };
      
      await globalUser.editProfile(res, oldData, newData);
    } else {
      res.json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the profile' });
  }
});

//Route to retrieve beer data
app.get('/beerData', async (req, res) => {
  try{
    const beerData = await db.collection('Beer').find().toArray();
    res.json({success: true, beerData});
  } catch (error) {
    console.error("Error retrieving beer data:", error);
    res.status(500).json({ success: false, message: "An error occurred while retrieving beer data"});
  }
});
//===================================================================================================================
