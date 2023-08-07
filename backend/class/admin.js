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
}

module.exports = Admin;
