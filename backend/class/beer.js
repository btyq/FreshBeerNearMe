class Beer {
    constructor(client, beerID, beerName, abv, ibu, venueAvailability, price, rating, beerDescription, beerImage, communityReviews) {
        this.client = client;
        this.beerID = beerID;
        this.beerName = beerName;
        this.abv = abv;
        this.ibu = ibu;
        this.venueAvailability = venueAvailability;
        this.price = price;
        this.rating = rating;
        this.beerDescription = beerDescription;
        this.beerImage = beerImage;
        this.communityReviews = communityReviews;
    }
}

module.exports = Beer;
