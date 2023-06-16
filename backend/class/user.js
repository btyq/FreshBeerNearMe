class User {
  constructor(client, userID, username, password, email, mobileNumber, receiveNotification) {
    this.client = client;
    this.userID = userID;
    this.username = username;
    this.password = password;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.receiveNotification = receiveNotification;
  }

  async login(res, username, password) {
    try {
      const db = this.client.db('FreshBearNearMe');
      const collection = db.collection('User');
      //Find a document that matches the username and password
      const result = await collection.findOne({ username, password });

      if (result) {
        this.userID = result.userID;
        this.email = result.email;
        this.mobileNumber = result.mobileNumber;
        this.receiveNotification = result.receiveNotification;

        //Create a session token
        const sessionToken = 'testtoken123';

        //Set the session token in a cookie
        res.cookie('sessionToken', sessionToken, { httpOnly: true });

        //Set the username in a separate cookie
        res.cookie('username', result.username, { httpOnly: true });

        //Set object id in a separate cookie
        res.cookie('userID', result.userID, { httpOnly: true});
        
        res.json({ success: true, username: result.username, password: result.password });
      } else {
        res.json({ success: false, message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
  }

  async editProfile(res, oldData, newData) {
    try {
      const db = this.client.db('FreshBearNearMe');
      const collection = db.collection('User');
  
      // Check if the old data exists in the database
      const existingUser = await collection.findOne(oldData);
  
      if (existingUser) {
        // Update the user's profile in the database
        const result = await collection.updateOne(
          oldData,
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

  logout() {
    console.log("User logged out");
  }
}

module.exports = User;