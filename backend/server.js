const Beer = require("./class/beer");
const User = require("./class/user");
const Venue = require("./class/venue");
const VenueOwner = require("./class/venueowner");
const Review = require("./class/review");
const Brewery = require("./class/brewery");

const venueArray = [];
const beerArray = [];
const breweryArray = [];

const csv = require("csv-parser");
const path = require("path");
const fs = require("fs");

//===================================================================================================================
//==============================================Connect to MongoDB===================================================
const express = require("express");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const uri =
	"mongodb+srv://Admin:admin123@fyp.qzlvrug.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("FreshBearNearMe");
const collection = db.collection("User");

async function connectToMongoDB() {
	try {
		await client.connect();
		console.log("Connected to MongoDB successfully");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
}

//Call the MongoDB connection function
connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Server is up");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
//===================================================================================================================
//==============================================All Route Functions==================================================

//Route to verify username and password
app.post("/signup", async (req, res) => {
	const { username, password, email, mobileNumber, receiveNotification } =
		req.body;

	function generateRandomString(length) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let randomString = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomString += characters[randomIndex];
		}
		return randomString;
	}

	try {
		// Check if the username already exists
		const existingUsername = await collection.findOne({ username });
		if (existingUsername) {
			return res.json({ success: false, message: "Username already exists" });
		}

		// Check if the email already exists
		const existingEmail = await collection.findOne({ email });
		if (existingEmail) {
			return res.json({ success: false, message: "Email already exists" });
		}

		// Check if the mobile number already exists
		const existingMobileNumber = await collection.findOne({ mobileNumber });
		if (existingMobileNumber) {
			return res.json({
				success: false,
				message: "Mobile number already exists",
			});
		}

		// Retrieve the last user document and get the next userID
		const lastUser = await collection
			.find()
			.sort({ userID: -1 })
			.limit(1)
			.toArray();
		const nextUserID = lastUser.length > 0 ? lastUser[0].userID + 1 : 1;

		// Insert the user data into the MongoDB collection with the next userID
		const result = await collection.insertOne({
			userID: nextUserID,
			username,
			password,
			email,
			mobileNumber,
			receiveNotification: false,
			followArray: [],
			recommendationArray: [],
			referralCode: generateRandomString(8),
			referralPoints: 0,
			referralClaim: [],
			rewardArray: [],
			wishlistArray: [],
		});

		res.json({ success: true, message: "User signed up successfully" });
	} catch (error) {
		console.error("Error during signup:", error);
		res
			.status(500)
			.json({ success: false, message: "An error occurred during signup" });
	}
});

app.post("/readCSV", async (req, res) => {
	const freshnessFilePath = path.join(
		__dirname,
		"../CSVfiles/Freshness Report.csv"
	);
	const refrigerationFilePath = path.join(
		__dirname,
		"../CSVfiles/Refrigeration Performance.csv"
	);
	const informationFilePath = path.join(
		__dirname,
		"../CSVfiles/Place List.csv"
	);
	const freshnessResults = [];
	const refrigerationResults = [];
	const informationResults = [];
	const pushResults = [];

	const readFreshnessPromise = new Promise((resolve, reject) => {
		fs.createReadStream(freshnessFilePath)
			.pipe(csv({}))
			.on("data", async (data) => {
				const newData = {
					venueID: data["Tracker ID"],
					venueName: data.Location,
					placeType: data["Place Type"],
					venueFreshness: parseFloat(data["Freshness (%)"]),
					venueTemperature: null,
					venueAddress: null,
					venueCountry: null,
				};

				const existingDataIndex = freshnessResults.findIndex(
					(item) => item.venueName === newData.venueName
				);

				if (existingDataIndex === -1) {
					freshnessResults.push(newData);
				} else {
					freshnessResults[existingDataIndex].venueFreshness =
						newData.venueFreshness;
				}
			})
			.on("end", () => {
				console.log("Reading of freshness done!");
				resolve();
			})
			.on("error", (error) => {
				reject(error);
			});
	});

	const readTemperaturePromise = new Promise((resolve, reject) => {
		fs.createReadStream(refrigerationFilePath)
			.pipe(csv({}))
			.on("data", async (data) => {
				const newData = {
					place: data.Place,
					temperature: parseFloat(data["Average Temperature In Fridge (°C)"]),
				};

				refrigerationResults.push(newData);
			})
			.on("end", () => {
				console.log("Reading of temperature done!");
				resolve();
			})
			.on("error", (error) => {
				reject(error);
			});
	});

	const readInformationPromise = new Promise((resolve, reject) => {
		fs.createReadStream(informationFilePath)
			.pipe(csv({}))
			.on("data", async (data) => {
				const newData = {
					venueName: data.Name,
					venueType: data["Place Type"],
					venueAddress:
						data.Address +
						"," +
						data.City +
						"," +
						data.State +
						"," +
						data.Postcode,
					venueCountry: data.Country,
				};
				if (newData.venueCountry === "Australia") {
					informationResults.push(newData);
				}
			})
			.on("end", () => {
				console.log("Reading of information done!");
				resolve();
			})
			.on("error", (error) => {
				reject(error);
			});
	});

	Promise.all([
		readFreshnessPromise,
		readTemperaturePromise,
		readInformationPromise,
	])
		.then(() => {
			for (const freshnessData of freshnessResults) {
				for (const refrigerationData of refrigerationResults) {
					if (freshnessData.venueName === refrigerationData.place) {
						freshnessData.venueTemperature = refrigerationData.temperature;
					}
				}
			}

			for (const freshnessData of freshnessResults) {
				if (freshnessData.venueTemperature === null) {
					freshnessData.venueTemperature =
						Math.round((Math.random() * (5 - 2) + 2) * 10) / 10;
				}
			}

			for (const informationData of informationResults) {
				for (const freshnessData of freshnessResults) {
					if (informationData.venueName === freshnessData.venueName) {
						freshnessData.venueAddress = informationData.venueAddress;
						freshnessData.venueCountry = informationData.venueCountry;
					}
				}
			}

			for (let i = freshnessResults.length - 1; i >= 0; i--) {
				const freshnessData = freshnessResults[i];
				if (freshnessData.venueAddress === null) {
					freshnessResults.splice(i, 1);
				}
			}

			for (let i = freshnessResults.length - 1; i >= 0; i--) {
				const freshnessData = freshnessResults[i];
				const newData = {
					venueID: freshnessData.venueID,
					venueName: freshnessData.venueName,
					venueAddress: freshnessData.venueAddress,
					venueContact: null,
					venueRating: Math.floor(Math.random() * 5) + 1,
					venueImage: null,
					venueOperatingHours: null,
					venueMenu: [],
					venueReview: [],
					venueLatitude: 1.0,
					venueLongtitude: 1.0,
					venueFreshness: freshnessData.venueFreshness,
					venueTemperature: freshnessData.venueTemperature,
				};
				pushResults.push(newData);
			}
			res
				.status(200)
				.json({ success: true, message: "Data processed successfully" });
		})
		.catch((error) => {
			console.error("An error occurred while reading CSV files:", error);
			res.status(500).json({
				success: false,
				message: "An error occurred while reading CSV files",
			});
		});
});
//=======================================All User Routes=============================================
// Custom middleware to store 'user' object in a global variable
let globalUser = null;
app.use((req, res, next) => {
	if (req.url === "/userLogin") {
		globalUser = new User(client, "", "", "", "", "", false);
	}
	next();
});
//Route to verify username and password
app.post("/userLogin", async (req, res) => {
	const { username, password } = req.body;

	if (!globalUser) {
		globalUser = new User(client, "", username, password, "", "", false);
	} else {
		globalUser.username = username;
		globalUser.password = password;
	}
	await globalUser.login(res, username, password);
});

//Route to retrieve user data at userProfile
app.post("/getUserData", async (req, res) => {
	try {
		await globalUser.getUserData(req, res);
	} catch (error) {
		console.error("Error retrieving user data:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while retrieving user data",
		});
	}
});

//Route to edit user's profile
app.post("/editProfile", async (req, res) => {
	try {
		if (globalUser) {
			// Store the existing user data in 'oldData'
			const oldData = {
				userID: globalUser.userID,
				username: globalUser.username,
				password: globalUser.password,
				email: globalUser.email,
				mobileNumber: globalUser.mobileNumber,
				receiveNotification: globalUser.receiveNotification,
			};
			const newData = {
				username: req.body.username,
				password: req.body.password,
				email: req.body.email,
				mobileNumber: req.body.mobileNumber,
				receiveNotification: req.body.receiveNotification,
			};

			await globalUser.editProfile(res, oldData, newData);
		} else {
			res.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while updating the profile",
		});
	}
});

//Route to get user's Feed
app.get("/getFeed", async (req, res) => {
	const userID = req.query.userID;
	globalUser.getFeed(client, res, userID);
})

//Route for user's follow button
app.post("/followUser", async (req, res) => {
	const { userID, reviewUserID } = req.body;
	globalUser.followUser(client, res, userID, reviewUserID)
})

//Route for user's unfollow button
app.post("/unfollowUser", async (req, res) => {
	const { userID, reviewUserID } = req.body;
	globalUser.unfollowUser(client, res, userID, reviewUserID)
})

//Route to get user's Recommendation
app.get("/getRecommendation", async (req, res) => {
	const userID = req.query.userID;
	globalUser.getRecommendation(client, res, userID)	
})

//Route to get user's search recommendation
app.get("/getSearch", async (req, res) => {
	globalUser.getSearch(client, res)
})

//Route to get user's referral Code
app.get("/getReferralCode", async (req, res) => {
	const userID = req.query.userID;
	globalUser.getReferralCode(client, res, userID)
})

//Route to submit user's inputted referral Code
app.post("/submitReferralCode", async (req, res) => {
	const { userID, referralCode } = req.body;
	globalUser.submitReferralCode(client, res, userID, referralCode)
})

//Route to retrieve user's reward selection
app.get("/getRewards", async(req, res) => {
	globalUser.getRewards(client, res)
})

//Route for user to claim reward
app.post("/redeemRewards", async(req, res) => {
	const { userID, rewardID, rewardPrice } = req.body;
	globalUser.redeemRewards(client, res, userID, rewardID, rewardPrice)
})

//Route for user to retrieve forum's post
app.get("/getPosts", async(req, res) => { 
	globalUser.getPosts(client, res)
})

//Route to submit comment for a forum's post
app.post("/submitComment", async(req, res) => {
	const { userID, postID, commentDescription, commentDate } = req.body;
	globalUser.submitComment(client, res, userID, postID, commentDescription, commentDate)
})

//Route to submit new psot for forum
app.post("/submitPost", async(req, res) => {
	const { userID, postTitle, postDate, postDescription } = req.body;
	globalUser.submitPost(client, res, userID, postTitle, postDate, postDescription)
})

//Route to add item to wishlist for user
app.post("/addToWishlist", async(req, res) => {
	const { beerID, venueID, userID } = req.body;
	globalUser.addToWishlist(client, res, beerID, venueID, userID)
})

//Route to retrieve wishlist for user
app.get("/getWishlist", async (req, res) => {
	const userID = req.query.userID;
	globalUser.getWishlist(client, res, userID)
})

//Route for user to remove item from wishlist
app.post("/removeWishlist", async(req, res) => {
	const { beerID, venueID, userID } = req.body;
	globalUser.removeWishlist(client, res, beerID, venueID, userID)
})

//Route for user to submit issue
app.post("/submitIssue", async (req, res) => {
	const { userID, issueDate, issueDescription } = req.body;
	globalUser.submitIssue(client, res, userID, issueDate, issueDescription)
})

//Route for user to submit feedback
app.post("/submitFeedback", async (req, res) => {
	const { userID, venueName, feedbackDate, feedbackDescription } = req.body;
	globalUser.submitFeedback(client, res, userID, venueName, feedbackDate, feedbackDescription);
})

//Route for user to submit journal
app.post("/submitJournal", async (req, res) => {
	const { userID, journalDate, journalBeer, journalNotes, journalRating} = req.body;
	globalUser.submitJournal(client, res, userID, journalDate, journalBeer, journalNotes, journalRating);
})

//Route for user to retrieve Journal
app.get("/getJournal", async (req, res) => {
	const userID = req.query.userID;
	globalUser.getJournal(client, res, userID)
})

//Route for user to edit Journal
app.post("/editJournal", async (req, res) => {
	const { journalID, journalNotes, journalRating } = req.body;
	globalUser.editJournal(client, res, journalID, journalNotes, journalRating)
})

//Route to retrieve user's statistics
app.get("/getStatistics", async (req, res) => {
	const userID = req.query.userID;
	globalUser.getStatistics(client, res, userID)
})
//===================================================================================================================
//=================================================All VenueOwner Routes=============================================
let globalVenueOwner = null;
app.use((req, res, next) => {
	if (req.url === "/venueOwnerLogin") {
		globalVenueOwner = new VenueOwner(client, "", "", "", "", "", "");
	}
	next();
});

app.post("/venueOwnerLogin", async (req, res) => {
	const { username, password } = req.body;

	if (!globalVenueOwner) {
		globalVenueOwner = new VenueOwner(
			client,
			"",
			username,
			password,
			"",
			"",
			""
		);
	} else {
		globalVenueOwner.username = username;
		globalVenueOwner.password = password;
	}
	await globalVenueOwner.login(res, username, password);
});

//===================================================================================================================
//=================================================All Beer Routes===================================================
//Route to retrieve beer data
app.get("/getBeerData", async (req, res) => {
	await Beer.getBeerData(client, beerArray, res);
});

//Route to retrieve beer location
app.get("/getBeerLocation", async (req, res) => {
	const beerID = parseInt(req.query.beerID);
	await Beer.getBeerLocation(client, beerID, beerArray, res);
});

//Route to retrieve beer review
app.get("/getBeerReview", async (req, res) => {
	const beerID = parseInt(req.query.beerID);
	Beer.getBeerReview(client, beerID, beerArray, res);
});
//===================================================================================================================
//=================================================All Venue Routes===================================================
//Route to retrieve venue data
app.get("/getVenueData", async (req, res) => {
	await Venue.getVenueData(client, venueArray, res);
});

//Route to retrieve menu data inside venue container
app.get("/getVenueMenu", async (req, res) => {
	const venueID = req.query.venueID;
	Venue.getVenueMenu(client, venueID, venueArray, res);
});

//Route to retrieve venue review data inside venue container
app.get("/getVenueReview", async (req, res) => {
	const venueID = req.query.venueID;
	Venue.getVenueReview(client, venueID, venueArray, res);
});

//Route to retrieve venue coordinates
app.get("/getVenueCoordinates", async (req, res) => {
	Venue.getVenueCoordinates(client, venueArray, res);
})
//===================================================================================================================
//=================================================All Review Routes=================================================
app.post("/addVenueReview", async (req, res) => {
	const reviewDescription = req.body.reviewText;
	const rating = req.body.rating;
	const userID = req.body.userID;
	const reviewDate = req.body.reviewDate;
	const venueID = req.body.venueID;

	Review.addVenueReview(
		client,
		reviewDescription,
		rating,
		userID,
		reviewDate,
		venueID,
		res
	);
});

app.post("/addBeerReview", async (req, res) => {
	const reviewDescription = req.body.reviewText;
	const rating = req.body.rating;
	const userID = req.body.userID;
	const reviewDate = req.body.reviewDate;
	const beerID = req.body.beerID;

	Review.addBeerReview(
		client,
		reviewDescription,
		rating,
		userID,
		reviewDate,
		beerID,
		res
	);
});
//===================================================================================================================
//=================================================All Brewery Routes===================================================
//Route to retrieve brewery data
app.get("/getBreweryData", async (req, res) => {
	await Brewery.getBreweryData(client, breweryArray, res);
});

//Route to retrieve brewery coordiantes
app.get("/getBreweryCoordinates", async (req, res) => {
	try {
		const breweryData = await db.collection("Brewery").find().toArray();
		res.json({ success: true, breweries: breweryData });
	} catch (error) {
		console.error("Error retrieving breweries:", error);
		res.status(500).json({
		success: false,
		message: "An error occurred while retrieving breweries",
	  });
	}
  });
