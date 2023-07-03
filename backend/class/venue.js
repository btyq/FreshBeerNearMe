class Venue {
    constructor(client, venueID, venueName, venueAddress, venueContact, venueRating, venueImage, venueOperatingHours, venueMenu, venueReview){
        this.client = client;
        this.venueID = venueID;
        this.venueName = venueName;
        this.venueAddress = venueAddress;
        this.venueContact = venueContact;
        this.venueRating = venueRating;
        this.venueImage = venueImage;
        this.venueOperatingHours = venueOperatingHours;
        this.venueMenu = venueMenu;
        this.venueReview = venueReview;
    }

    static async getVenueData(client, venueArray, res) {
        try {
            const db = client.db('FreshBearNearMe');
            const venueData = await db.collection('Venue').find().toArray();
        
            const venues = venueData.map((data) => {
                const venue = new Venue(
                client,
                data.venueID,
                data.venueName,
                data.venueAddress,
                data.venueContact,
                data.venueRating,
                data.venueImage,
                data.venueOperatingHours,
                data.venueMenu,
                data.venueReview,
                );
        
                venueArray.push(venue);
        
                return venue;
            });
        
            res.json({ success: true, venueData });
            } catch (error) {
            console.error("Error retrieving venue data:", error);
            res.status(500).json({ success: false, message: "An error occurred while retrieving venue data" });
        }
    }

    static async getVenueMenu(client, venueID, venueArray, res) {
        try {
          const matchingVenue = venueArray.find(venue => venue.venueID === venueID);
          if (matchingVenue) {
            const beerID = matchingVenue.venueMenu;
            const collection = client.db('FreshBearNearMe').collection('Beer');
            const beers = await collection.find({ beerID: { $in: beerID } }).toArray();
            res.json({ success: true, beers });
          } else {
            res.status(404).json({ success: false, message: 'Venue not found' });
          }
        } catch (error) {
          console.error("Error retrieving beer menu:", error);
          res.status(500).json({ success: false, message: "An error occurred while retrieving beer menu" });
        }
      }
    
      static async getVenueReview(client, venueID, venueArray, res) {
        try {
          const matchingVenue = venueArray.find(venue => venue.venueID === venueID);
          if (matchingVenue) {
            const reviewID = matchingVenue.venueReview;
            const collection = client.db('FreshBearNearMe').collection('Reviews');
            const review = await collection.find({ reviewID: { $in: reviewID } }).toArray();

            const userCollection = client.db('FreshBearNearMe').collection('User');
            const userID = review.map(review => review.reviewUser);
            const users = await userCollection.find({ userID: { $in: userID} }).toArray();
            const userMap = users.reduce((map, user) => {
              map[user.userID] = user.username;
              return map;
              
            }, {});
            
            const updatedReviews = review.map(review => {
              const username = userMap[review.reviewUser];
              return { ...review, reviewUser: username };
            });
            
            res.json({ success: true, review: updatedReviews });
          } else {
            res.status(404).json({ success: false, message: 'Venue not found' });
          }
        } catch (error) {
          console.error("Error retrieving venue reviews:", error);
          res.status(500).json({ success: false, message: "An error occurred while retrieving beer menu" });
        }
      }

}

module.exports = Venue;