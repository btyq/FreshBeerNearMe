class Venue {
    constructor(client, venueID, venueName, venueAddress, venueContact, venueRating, venueImage){
        this.client = client;
        this.venueID = venueID;
        this.venueName = venueName;
        this.venueAddress = venueAddress;
        this.venueContact = venueContact;
        this.venueRating = venueRating;
        this.venueImage = venueImage;
    }
}

module.exports = User;