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

    async getFeedback(client, res, venueOwnerID) {
        try {
            const db = client.db('FreshBearNearMe');
            const venueOwnersCollection = db.collection('VenueOwners');
            const venueCollection = db.collection('Venue');
            const feedbackCollection = db.collection('Feedback');
            const userCollection = db.collection('User');
    
            const venueOwnerDocument = await venueOwnersCollection.findOne({ venueOwnerID: parseInt(venueOwnerID) });
    
            if (!venueOwnerDocument) {
                return res.status(404).json({ success: false, message: 'Venue owner not found' });
            }
    
            const ownedVenueIDs = venueOwnerDocument.venueID || [];
            if (ownedVenueIDs.length === 0) {
                return res.json({ success: true, message: 'No venues found for the venue owner' });
            }
    
            const feedbacks = [];
            for (const venueID of ownedVenueIDs) {
                const venueDocument = await venueCollection.findOne({ venueID: venueID });
                if (venueDocument && venueDocument.venueFeedback) {
                    const feedbackIDs = venueDocument.venueFeedback;
                    for (const feedbackID of feedbackIDs) {
                        const feedbackDocument = await feedbackCollection.findOne({ feedbackID: feedbackID });
                        if (feedbackDocument) {
                            const feedbackUserID = feedbackDocument.feedbackUser;
                            const userDocument = await userCollection.findOne({ userID: feedbackUserID });
                            if (userDocument) {
                                feedbacks.push({
                                    venueID: venueDocument.venueID,
                                    venueName: venueDocument.venueName,
                                    feedback: {
                                        ...feedbackDocument,
                                        username: userDocument.username
                                    }                                   
                                });
                            }
                        }
                    }
                }
            }
    
            return res.json({ success: true, feedbacks });
        } catch (error) {
            console.error('Error fetching feedback:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async replyFeedback(client, res, feedbackID, feedbackResponse) {
        try {
          const db = client.db("FreshBearNearMe");
          const feedbackCollection = db.collection("Feedback");
      
          const feedbackToUpdate = await feedbackCollection.findOne({ feedbackID: feedbackID });
      
          if (!feedbackToUpdate) {
            return res.json({ success: false, message: "Feedback not found." });
          }
      
          if (feedbackToUpdate.feedbackResponseBool) {
            return res.json({ success: false, message: "Feedback has already been responded!" });
          }
      
          await feedbackCollection.updateOne(
            { feedbackID: feedbackID },
            { $set: { feedbackResponse: feedbackResponse, feedbackResponseBool: true } }
          );
          res.json({ success: true, message: "Feedback response updated successfully." });
        } catch (error) {
          console.error("Error updating feedback:", error);
          res.json({ success: false, error: "An error occurred while updating the feedback." });
        }
    }

    async getVenueProfile(client, res, venueOwnerID) {
        try {
          const db = client.db("FreshBearNearMe");
      
          const venueOwnersCollection = db.collection("VenueOwners");
          const venueOwner = await venueOwnersCollection.findOne({
            venueOwnerID: parseInt(venueOwnerID),
          });
      
          if (!venueOwner) {
            return res.json({ success: false, message: "Venue owner not found." });
          }
      
          
          const venuesCollection = db.collection("Venue");
          const venueIDs = venueOwner.venueID; 
      
          const venues = await venuesCollection.find({
            venueID: { $in: venueIDs },
          }).toArray();
      
          res.send(venues);
        } catch (error) {
          console.error("Error getting venue profile:", error);
          res.json({
            success: false,
            error: "An error occurred while retrieving venue profile.",
          });
        }
    }

    async updateVenue(client, res, venueID, venueName, venueContact, venueAddress, venueOperatingHours) {
        try {
            const venueCollection = client.db("FreshBearNearMe").collection("Venue");
            const updateResult = await venueCollection.updateOne(
                { venueID: venueID },
                {
                $set: {
                    venueName: venueName,
                    venueContact: venueContact,
                    venueAddress: venueAddress,
                    venueOperatingHours: venueOperatingHours,
                },
                }
            );
        
            if (updateResult.modifiedCount === 1) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: "Venue not found" });
            }
            } catch (error) {
            console.error("Error updating venue:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    
}

module.exports = VenueOwner;