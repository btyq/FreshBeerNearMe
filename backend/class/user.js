class User {
    constructor(userID, username, password, email, mobileNumber, receiveNotification) {
      this.userID = userID;
      this.username = username;
      this.password = password;
      this.email = email;
      this.mobileNumber = mobileNumber;
      this.receiveNotification = receiveNotification;
    }
  
    login() {
      console.log("User logged in");
    }
  
    logout() {
      console.log("User logged out");
    }
  }
