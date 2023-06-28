class Venue {
    constructor(client, venueID, venueName, venueAddress, venueContact, venueRating, venueImage, venueOperatingHours, venueMenu){
        this.client = client;
        this.venueID = venueID;
        this.venueName = venueName;
        this.venueAddress = venueAddress;
        this.venueContact = venueContact;
        this.venueRating = venueRating;
        this.venueImage = venueImage;
        this.venueOperatingHours = venueOperatingHours;
        this.venueMenu = venueMenu;
    }

    
}

module.exports = Venue;