class User {
  constructor(client, userID, username, password, email, mobileNumber, receiveNotification, followArray) {
    this.client = client;
    this.userID = userID;
    this.username = username;
    this.password = password;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.receiveNotification = receiveNotification;
    this.followArray = followArray;
  }

  async login(res, username, password) {
    try {
      const db = this.client.db('FreshBearNearMe');
      const collection = db.collection('User');
      //Find a data that matches the username and password
      const result = await collection.findOne({ username, password });

      if (result) {
        this.userID = result.userID;
        this.email = result.email;
        this.mobileNumber = result.mobileNumber;
        this.receiveNotification = result.receiveNotification;
        this.followArray = result.followArray;

        //Create a session token
        const sessionToken = 'testtoken123';

        //Set the session token in a cookie
        res.cookie('sessionToken', sessionToken, { httpOnly: true });

        //Set the username in a separate cookie
        res.cookie('username', result.username, { httpOnly: true });

        //Set object id in a separate cookie
        res.cookie('userID', result.userID, { httpOnly: true});
        
        res.json({ success: true, userID: result.userID, username: result.username });
      } else {
        res.json({ success: false, message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
  }

  async getUserData(req, res) {
    const { userID } = req.body;

    try {
      const db = this.client.db('FreshBearNearMe');
      const collection = db.collection('User');
      //Find the user document that matches the provided userID
      const user = await collection.findOne({ userID });
      if (user) {
        //Extract the necessary data from the user document
        const { username, email, mobileNumber, password, receiveNotification } = user;
        //Send the user data as the response
        res.json({ success: true, username, email, mobileNumber, password, receiveNotification });
      } else {
        res.json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ success: false, message: 'An error occurred while retrieving user data' });
    }
  }

  async editProfile(res, oldData, newData) {
    try {
      const db = this.client.db('FreshBearNearMe');
      const collection = db.collection('User');
      
      // Check if the old data exists in the database
      const existingUser = await collection.findOne({ userID: oldData.userID });
  
      if (existingUser) {
        // Update the user's profile in the database
        const result = await collection.updateOne(
          { userID: oldData.userID }, // Use userID as the filter
          { $set: newData }
        );
  
        if (result.modifiedCount > 0) {
          // Profile update successful
          res.json({ success: true, message: 'Profile updated successfully' });
        } else {
          // No changes made
          res.json({ success: false, message: 'No changes made to the profile' });
        }
      } else {
        // User not found in the database
        res.json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error during profile update:', error);
      res.status(500).json({ success: false, message: 'An error occurred during profile update' });
    }
  }

  async getFeed(client, res, userID) {
    try {
      const db = client.db("FreshBearNearMe");
      const feedData = await db.collection("Reviews").find().toArray();
      const promises = feedData.map(async (data) => {
        const user = await db.collection("User").findOne({ userID: data.reviewUser });
        if (user) {
          data.reviewUsername = user.username;
        }
        return data;
      });
  
      const updatedFeedData = await Promise.all(promises);
  
      const user2 = await db.collection("User").findOne({ userID: parseInt(userID) });
      if (user2) {
        updatedFeedData.forEach((data) => {
          data.followArray = user2.followArray;
        });
      }
      res.json({ reviews: updatedFeedData });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving feed" });
    }
  }

  async followUser(client, res, userID, reviewUserID) {
    try {
      const db = client.db('FreshBearNearMe');
      const collection = db.collection('User');
  
      const userToFollow = await collection.findOne({ userID: reviewUserID });
  
      if (userToFollow) {
        const currentUser = await collection.findOne({ userID });
  
        if (currentUser) {
          if (!currentUser.followArray.includes(reviewUserID)) {
            currentUser.followArray.push(reviewUserID);
            const result = await collection.updateOne(
              { userID },
              { $set: { followArray: currentUser.followArray } }
            );
            res.json({ success: true, message: `You are now following user with ID ${reviewUserID}` });
          } else {
            res.json({ success: false, message: `You are already following user with ID ${reviewUserID}` });
          }
        } else {
          res.json({ success: false, message: 'Current user not found' });
        }
      } else {
        res.json({ success: false, message: 'User to follow not found' });
      }
    } catch (error) {
      console.error('Error during followUser:', error);
      res.status(500).json({ success: false, message: 'An error occurred during followUser' });
    }
  }

  logout() {
    console.log("User logged out");
  }
}

module.exports = User;