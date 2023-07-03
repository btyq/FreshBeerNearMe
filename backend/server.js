const Beer = require('./class/beer');
const User = require('./class/user');
const Venue = require('./class/venue');
const VenueOwner = require('./class/venueowner');

const venueArray = [];
const beerArray = [];

//===================================================================================================================
//==============================================Connect to MongoDB===================================================
const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://Admin:admin123@fyp.qzlvrug.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const db = client.db('FreshBearNearMe');
const collection = db.collection('User');

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
//===================================================================================================================
//==============================================All Route Functions==================================================

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
//=======================================All User Routes=============================================
// Custom middleware to store 'user' object in a global variable
let globalUser = null;
app.use((req, res, next) => {
  if (req.url === '/userLogin') {
    globalUser = new User(client, "", "", "", "", "", false);
  } 
  next();
});
//Route to verify username and password
app.post('/userLogin', async (req, res) => {
  const { username, password } = req.body;

  if (!globalUser) {
    globalUser = new User(client, "", username, password, "", "", false);
  } else {
    globalUser.username = username;
    globalUser.password = password;
  }
  await globalUser.login(res, username, password);
});

//Route to retrieve user data at userProfile
app.post('/getUserData', async (req, res) => {
  try {
    await globalUser.getUserData(req,res);
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
        userID: globalUser.userID,
        username: globalUser.username,
        password: globalUser.password,
        email: globalUser.email,
        mobileNumber: globalUser.mobileNumber,               
        receiveNotification: globalUser.receiveNotification
      };
      const newData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        receiveNotification: req.body.receiveNotification
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
//===================================================================================================================
//=================================================All VenueOwner Routes=============================================
let globalVenueOwner = null;
app.use((req, res, next) => {
  if (req.url === '/venueOwnerLogin') {
    globalVenueOwner = new VenueOwner(client, "", "", "", "", "", "",);
  } 
  next();
});

app.post('/venueOwnerLogin', async (req, res) => {
  const { username, password } = req.body;

  if (!globalVenueOwner) {
    globalVenueOwner = new VenueOwner(client, "", username, password, "", "", "");
  } else {
    globalVenueOwner.username = username;
    globalVenueOwner.password = password;
  }
  await globalVenueOwner.login(res, username, password);
});

//===================================================================================================================
//=================================================All Beer Routes===================================================
//Route to retrieve beer data
app.get('/getBeerData', async (req, res) => {
  await Beer.getBeerData(client, beerArray, res);
});
//===================================================================================================================
//=================================================All Venue Routes===================================================
//Route to retrieve venue data
app.get('/getVenueData', async(req, res) => {
  await Venue.getVenueData(client, venueArray, res);
});

//Route to retrieve menu data inside venue container
app.get('/getVenueMenu', async (req, res) => {
  const venueID = parseInt(req.query.venueID);
  Venue.getVenueMenu(client, venueID, venueArray, res);
});

//Route to retrieve venue review data inside venue container
app.get('/getVenueReview', async (req, res) => {
  const venueID = parseInt(req.query.venueID);
  Venue.getVenueReview(client, venueID, venueArray, res);
})
//===================================================================================================================
