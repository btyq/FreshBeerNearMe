class Beer {
    constructor(client, beerID, beerName, abv, ibu, venueAvailability, price, rating, beerDescription, beerImage, communityReviews, beerLocation) {
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
        this.beerLocation = beerLocation;
    }

    static async getBeerData(client, beerArray, res) {
        try {
            const db = client.db('FreshBearNearMe');
            const beerData = await db.collection('Beer').find().toArray();

            const beers = beerData.map((data) => {
                const beer = new Beer(
                    client,
                    data.beerID,
                    data.beerName,
                    data.abv,
                    data.ibu,
                    data.venueAvailability,
                    data.price,
                    data.rating,
                    data.beerDescription,
                    data.beerImage,
                    data.communityReviews,
                    data.beerLocation
                );

                beerArray.push(beer);
                return beer;
            });

            res.json({ success: true, beerData});
            } catch (error) {
                console.error("Error retrieving beer data:", error);
                res.status(500).json({ success: false, message: "An error occurred while retrieving beer data"});
            }       
    }

    static async getBeerLocation(client, beerID, beerArray, res) {
        try {
            const matchingBeer = beerArray.find(beer => beer.beerID === beerID);
            if (matchingBeer) {
                const venueID = matchingBeer.beerLocation;
                console.log(venueID);
                const collection = client.db('FreshBearNearMe').collection('Venue');
                const venues = await collection.find({ venueID: {$in: venueID } }).toArray();
                res.json({ success: true, venues });
            } else {
                res.status(404).json({ success: false, message: 'Venue not found'});
            }
        } catch (error) {
            console.error("Error retrieving beer menu:", error);
            res.status(500).json({ success: false, message: "An error occurred while retrieving beer menu" });
        }
    }

    
}

module.exports = Beer;
