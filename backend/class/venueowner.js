class VenueOwner {
    constructor(client, venueOwnerID, username, password, email, mobileNumber, venueID) {
        this.client = client;
        this.venueOwnerID = venueOwnerID;
        this.username = username;
        this.password = password;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.venueID = venueID;
    }

    async login(res, username, password) {
        try {
            const db = this.client.db('FreshBearNearMe');
            const collection = db.collection('VenueOwners')

            //Find a data that matc hes the username and password
            const result = await collection.findOne({ username, password });

            if (result) {
                this.venueOwnerID = result.venueOwnerID;
                this.email = result.email;
                this.mobileNumber = result.mobileNumber;
                this.venueID = result.venueID;
                //Create a session token
                const sessionToken = 'testtoken123';

                //Set the session token in a cookie
                res.cookie('sessionToken', sessionToken, { httpOnly: true });

                //Set the username in a separate cookie
                res.cookie('username', result.username, { httpOnly: true });

                //Set object id in a separate cookie
                res.cookie('venueOwnerID', result.venueOwnerID, { httpOnly: true});

                res.json({ success: true, venueOwnerID: result.venueOwnerID, username: result.username});
            } else {
                res.json({ success: false, message: 'Invalid username or password' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ success: false, message: 'An error occurred during login'});
        }    
    }
}

module.exports = VenueOwner;