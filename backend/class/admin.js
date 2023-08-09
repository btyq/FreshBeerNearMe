class Admin {
	constructor(client, adminID, username, password, email, mobileNumber) {
		this.client = client;
		this.adminID = adminID;
		this.username = username;
		this.password = password;
		this.email = email;
		this.mobileNumber = mobileNumber;
	}

	async login(res, username, password) {
		try {
			const db = this.client.db("FreshBearNearMe");
			const collection = db.collection("Admin");

			//Find a data that matc hes the username and password
			const result = await collection.findOne({ username, password });

			if (result) {
				this.adminID = result.adminID;
				this.email = result.email;
				this.mobileNumber = result.mobileNumber;
				//Create a session token
				const sessionToken = "testtoken123";

				//Set the session token in a cookie
				res.cookie("sessionToken", sessionToken, { httpOnly: true });

				//Set the username in a separate cookie
				res.cookie("username", result.username, { httpOnly: true });

				//Set object id in a separate cookie
				res.cookie("adminID", result.adminID, { httpOnly: true });

				res.json({
					success: true,
					adminID: result.adminID,
					username: result.username,
				});
			} else {
				res.json({ success: false, message: "Invalid username or password" });
			}
		} catch (error) {
			console.error("Error during login:", error);
			res
				.status(500)
				.json({ success: false, message: "An error occurred during login" });
		}
	}

	async getBugs(client, res) {
		try {
			const db = client.db('FreshBearNearMe');
			const issuesCollection = db.collection('Issue');
	
			const issues = await issuesCollection.find({}).toArray();
	
			if (issues.length > 0) {
				res.send(issues);
			} else {
				res.status(500).json({ error: "Error getting bugs" });
			}
		} catch (error) {
			res.status(500).json({ error: "Error getting bugs" });
		}
	}

	async resolveBugs(client, res, issueID) {
		try {
			const db = client.db("FreshBearNearMe");
			const collection = db.collection("Issue");
	
			const query = { issueID: issueID };
			const update = { $set: { issueStatus: true } };
	
			const result = await collection.updateOne(query, update);
	
			if (result.modifiedCount > 0) {
				res.json({ success: true, message: "Bug resolved successfully." });
			} else {
				res.json({ success: false, message: "Bug not found or not updated." });
			}
		} catch (error) {
			console.error("Error resolving bug:", error);
			res.json({ success: false, message: "An error occurred while resolving the bug." });
		}
	}
	
	async getUser(client, res) {
		try {
			const db = client.db('FreshBearNearMe');
			const userCollection = db.collection('User');
			const venueOwnersCollection = db.collection('VenueOwners');
			const adminCollection = db.collection('Admin');
	
			const [users, venueOwners, admins] = await Promise.all([
				userCollection.find().toArray(),
				venueOwnersCollection.find().toArray(),
				adminCollection.find().toArray(),
			]);
	
			const allDocuments = {
				users,
				venueOwners,
				admins,
			};
	
			res.json(allDocuments);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while fetching documents.' });
		}
	}
}

module.exports = Admin;
