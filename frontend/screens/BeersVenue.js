import {
	Entypo,
	FontAwesome,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { AirbnbRating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import GlobalStyle from "../utils/GlobalStyle";
import { useCookies } from "../CookieContext";

const Button = (props) => {
	const filledBgColor = props.color || COLORS.orange;
	const outlinedColor = COLORS.white;
	const bgColor = props.filled ? filledBgColor : outlinedColor;
	const textColor = COLORS.black;

	return (
		<TouchableOpacity
			style={{
				...styles.button,
				...{ backgroundColor: bgColor },
				...props.style,
			}}
			onPress={props.onPress}
		>
			<Text style={{ fontSize: 12, ...{ color: textColor } }}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

// for popup
const VenueItem = ({
	venueID,
	venueName,
	venueAddress,
	venueContact,
	venueRating,
	venueImage,
	venueOperatingHours,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupVisible2, setPopupVisible2] = useState(false); // created 2nd modal
	const [popupVisible3, setPopupVisible3] = useState(false); // created 3rd modal
	const [venueMenu, setVenueMenu] = useState([]);
	const [venueReview, setVenueReview] = useState([]);
	const [ratingCounter, setRatingCounter] = useState({});
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(0);
	const { cookies } = useCookies();
	const [userID, setUserID] = useState("");

	// // review summary
	const data = Object.entries(ratingCounter).map(([key, value]) => {
		return { label: key + "*", value: parseInt(value) };
	  });

	const HorizontalBarChart = ({ data }) => {
		// Find the maximum value in the data array
		const maxValue = Math.max(...data.map((item) => item.value));
	  
		return (
		  <View>
			{data.map((item, index) => (
			  <View key={index} style={styles.barContainer}>
				<Text
				  style={{
					marginRight: 8,
				  }}
				>
				  {item.label}
				</Text>
				<View
				  style={[
					styles.bar,
					{ width: (item.value / maxValue) * 100 + "%" },
				  ]}
				/>
			  </View>
			))}
		  </View>
		);
	  };

	const handlePopupOpen = () => {
		setPopupVisible(true);
	};

	const handlePopupClose = () => {
		setPopupVisible(false);
	};

	const handlePopUp2 = () => {
		setPopupVisible2(!popupVisible2); // created 2nd modal
	};

	const handlePopUp3 = () => {
		setPopupVisible3(!popupVisible3); // created 2nd modal
	};

	const handleReviewTextChange = (text) => {
		setReviewText(text);
	  };
	
	const handleRatingChange = (ratingValue) => {
	setRating(ratingValue);
	};

	const handleSubmit = () => {
	const currentDate = new Date();
	
	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1;
	const year = currentDate.getFullYear();

	const formattedDate = `${day}/${month}/${year}`;
	
	const data = {
		reviewText: reviewText,
		rating: rating,
		userID: userID,
		reviewDate: formattedDate,
		venueID: venueID,
	}

	axios.post("http://10.0.2.2:3000/addReview", data)
		 .then((response) => {
			if (response.data.success) {
				console.log("review");
			}
		 })
		 .catch((error) => {
			console.error(error);
		});

	setReviewText("");
	setRating(0);
	handlePopUp3();
	};
	
	useEffect(() => {
		setUserID(cookies.userID);

		const fetchVenueMenu = async () => {
			try {
				const response = await axios.get("http://10.0.2.2:3000/getVenueMenu", {
					params: { venueID },
				});
				const { success, beers } = response.data;

				if (success) {
					setVenueMenu(beers);
				}
			} catch (error) {
				console.error("Error fetching venue menu:", error);
			}
		};

		const fetchVenueReview = async () => {
			try {
			  const response = await axios.get("http://10.0.2.2:3000/getVenueReview", {
				params: { venueID },
			  });
			  const { success, review } = response.data;
		  
			  if (success) {
				setVenueReview(review);
		  
				const counter = {};
				review.forEach((item) => {
				  const { reviewRating } = item;
				  if (counter.hasOwnProperty(reviewRating)) {
					counter[reviewRating] += 1;
				  } else {
					counter[reviewRating] = 1;
				  }
				});
				setRatingCounter(counter);
			  }
			} catch (error) {
			  console.error("Error fetching venue reviews:", error);
			}
		  };

		if (popupVisible) {
			fetchVenueMenu();
			fetchVenueReview();
		}
		
	}, [popupVisible, venueID]);

	return (
		<View style={styles.subContainer}>
			<TouchableOpacity style={styles.itemContainer} onPress={handlePopupOpen}>
				<View style={styles.leftContainer}>
					<Text style={styles.venueName}>{venueName}</Text>
				</View>
				<View style={styles.rightContainer}>
					<View style={styles.starRatingContainer}>
						{[1, 2, 3, 4, 5].map((star) => (
							<Ionicons
								key={star}
								name="star"
								size={16}
								color={star <= venueRating ? COLORS.foam : COLORS.grey}
								style={{ marginBottom: 4 }}
							/>
						))}
					</View>
				</View>
			</TouchableOpacity>

			<Modal visible={popupVisible} transparent animationType="fade">
				<View style={styles.modalContainer}>
					<View style={styles.popup}>
						<ScrollView>
							<Image source={{ uri: venueImage }} style={styles.venueImage} />
							<Text style={styles.popupTitle}>{venueName}</Text>
							<Entypo name="location-pin" size={24} color="black" />
							<Text style>{venueAddress}</Text>
							<FontAwesome
								name="phone"
								size={24}
								color="black"
								style={{ marginLeft: 2 }}
							/>
							<Text style>{venueContact}</Text>
							<Text style={{ ...styles.popupTitle, marginTop: 5 }}>
								Operating Hours{" "}
							</Text>
							<Text style>{venueOperatingHours}</Text>
							<View
								style={{
									borderTopColor: "black",
									borderBottomWidth: 1,
									marginTop: 10,
								}}
							></View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View style={{ ...styles.starRatingContainer }}>
									<Text style={styles.popupTitle}>Ratings: </Text>
									{[1, 2, 3, 4, 5].map((star) => (
										<Ionicons
											key={star}
											name="star"
											size={16}
											color={star <= venueRating ? COLORS.foam : COLORS.grey}
											style={{ marginBottom: 9 }}
										/>
									))}
								</View>
								<Button
									title="View Reviews"
									style={{
										...styles.shortButton,
										width: "40%",
										borderRadius: 10,
										marginBottom: 15,
									}}
									onPress={handlePopUp2}
								/>
								<Modal
									visible={popupVisible2}
									transparent
									animationType="slide"
								>
									<View style={styles.modalContainer}>
										<ScrollView style={styles.popup}>
											<TouchableOpacity onPress={handlePopUp2}>
												<Ionicons name="arrow-back" size={24} color="black" />
											</TouchableOpacity>
											<View
												style={{
													justifyContent: "center",
													alignItems: "center",
													marginHorizontal: 32,
													marginTop: 5,
													marginBottom: 12,
												}}
											>
												<Image source={{ uri: venueImage }} style={styles.venueImage} />
											</View>
											<View
												style={{ flexDirection: "row", alignItems: "center" }}
											>
												<View
													style={{
														flex: 1,
														marginHorizontal: 12,
														marginBottom: 12,
													}}
												>
													<Text>{venueName}</Text>
													<Text>{venueAddress}</Text>
												</View>
												<Button
													title="Write Reviews"
													style={{
														...styles.shortButton,
														width: "40%",
														borderRadius: 10,
														marginBottom: 15,
													}}
													onPress={handlePopUp3}
												/>
												<Modal
													visible={popupVisible3}
													transparent
													animationType="slide"
												>
													<View style={styles.modalContainer}>
														<View style={styles.popup}>
															<View
																style={{
																	flexDirection: "row",
																	justifyContent: "space-between",
																	flexWrap: "wrap",
																}}
															></View>
															<View
																style={{
																	width: "100%",
																	borderWidth: 1,
																	borderColor: COLORS.grey,
																	paddingHorizontal: 20,
																	paddingVertical: 10,
																	borderRadius: 30,
																	marginBottom: 25,
																}}
															>
																<View
																	style={{
																		flexDirection: "row",
																		alignItems: "center",
																	}}
																>
																	<Text
																		style={{
																			flex: 1,
																			fontSize: 16,
																			fontWeight: "bold",
																			color: COLORS.black,
																		}}
																	>
																		Venue Name: {venueName}
																	</Text>
																	<View
																		style={{
																			flex: 1,
																			alignItems: "flex-end",
																		}}
																	>
																		<View style={{ ...styles.starRatingContainer }}>
																			{[1, 2, 3, 4, 5].map((star) => (
																				<Ionicons
																					key={star}
																					name="star"
																					size={16}
																					color={star <= venueRating ? COLORS.foam : COLORS.grey}
																					style={{ marginBottom: 9 }}
																				/>
																			))}
																		</View>
																	</View>
																</View>
															</View>
															<View
																style={{
																	marginBottom: 25,
																	flexDirection: "row",
																	alignItems: "center",
																	justifyContent: "space-between",
																}}
															>
																<Text
																	style={{
																		fontSize: 14,
																		color: COLORS.black,
																		marginLeft: 20,
																	}}
																>
																	Review
																</Text>
																<TextInput
																	style={{
																		width: "60%",
																		height: 95,
																		borderColor: COLORS.black,
																		borderWidth: 1,
																		borderRadius: 8,
																		paddingLeft: 22,
																		marginTop: 10,
																		backgroundColor: COLORS.secondary,
																	}}
																	value={reviewText}
																	onChangeText={handleReviewTextChange}
																></TextInput>
															</View>
															<View
																style={{
																	marginBottom: 25,
																	flexDirection: "row",
																	alignItems: "center",
																	justifyContent: "space-between",
																}}
															>
																<Text
																	style={{
																		fontSize: 14,
																		color: COLORS.black,
																		marginLeft: 20,
																	}}
																>
																	Rating
																</Text>
																<View
																	style={{
																		flex: 1,
																		alignItems: "flex-end",
																	}}
																>
																	<AirbnbRating
																		count={5}
																		defaultRating={rating}
																		size={20}
																		showRating={false}
																		onFinishRating={handleRatingChange}
																	/>
																</View>
															</View>
															<Button title="Submit" onPress={handleSubmit} />
														</View>
													</View>
												</Modal>
											</View>
											<View
												style={{
													borderTopColor: "black",
													borderTopWidth: 1,
													marginBottom: 12,
												}}
											></View>
											<View
												style={{
													flex: 1,
													marginHorizontal: 12,
													marginBottom: 12,
												}}
											>
												<Text>Review Summary</Text>
												{Object.keys(ratingCounter).length > 0 && (
													<HorizontalBarChart data={data} />
												)}
											</View>
											<View>
												{venueReview.map((reviews) => (
													<View key={reviews.reviewID} style={styles.container}>
														<Text>Posted By: {reviews.reviewUser}</Text>
														<Text>Date: {reviews.reviewDate}</Text>
														<Text>Review: {reviews.reviewDescription}</Text>
														<Text>Ratings: {reviews.reviewRating}</Text>
													</View>
												))}
											</View>
											{/* <Button title="Submit" onPress={handlePopUp2} /> */}
										</ScrollView>
									</View>
								</Modal>
							</View>
							<View
								style={{
									borderTopColor: "black",
									borderTopWidth: 1,
								}}
							>
								<Text style={{ ...styles.popupTitle, marginTop: 5 }}>Menu</Text>
								{venueMenu.map((beer) => (
									<View key={beer.beerID}>
										<Text>{beer.beerName}</Text>
										<Text>{beer.abv}</Text>
										<Text>{beer.ibu}</Text>
										<Text>{beer.price}</Text>
										<Image
											source={{ uri: beer.beerImage }}
											style={styles.venueImage}
										/>
									</View>
								))}
							</View>
							<Button
								title="Close"
								onPress={handlePopupClose}
								color={COLORS.yellow}
								filled
								style={styles.closeButton}
							/>
						</ScrollView>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const BeersVenue = ({ navigation }) => {
	const [sortedVenueData, setSortedVenueData] = useState([]);
	const [sortBy, setSortBy] = useState("dist");
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchInput, setSearchInput] = useState("");
	const [venueData, setVenueData] = useState([]);

	useEffect(() => {
		const fetchVenueData = async () => {
			try {
				const response = await axios.get("http://10.0.2.2:3000/getVenueData");
				const { success, venueData } = response.data;
				if (success) {
					let sortedData = [...venueData];
					switch (sortBy) {
						case "name":
							sortedData.sort((a, b) => a.venueName.localeCompare(b.venueName));
							break;
						case "rating":
							sortedData.sort((a, b) => a.venueRating - b.venueRating);
							break;
						default:
							break;
					}
					if (sortOrder === "desc") {
						sortedData.reverse();
					}
					setSortedVenueData(sortedData);
					setVenueData(venueData);
				} else {
					console.error("Error retrieving venue data:", response.data.message);
				}
			} catch (error) {
				console.error("Error retrieving venue data:", error);
			}
		};
		fetchVenueData();
	}, [sortBy, sortOrder]);

	// for sorting and search function
	const handleSortBy = (by) => {
		if (by === sortBy) return;a
		setSortBy(by);
	};

	const handleSortOrder = (order) => {
		if (order === sortOrder) return;
		setSortOrder(order);
		let sortedData = [...sortedVenueData];
		if (order === "desc") {
			sortedData.reverse();
		}
		setSortedVenueData(sortedData);
	};

	const handleSearch = (text) => {
		setSearchInput(text);
		const filteredData = venueData.filter((venue) =>
			venue.venueName.toLowerCase().includes(text.toLowerCase())
		);
		setSortedVenueData(filteredData);
	};

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }} backgroundColor={COLORS.secondary}>
				<Header
					placement="left"
					backgroundColor={COLORS.primary}
					containerStyle={{
						height: 100,
						borderBottomLeftRadius: 40,
						borderBottomRightRadius: 40,
					}}
					leftComponent={
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<MaterialIcons
									name="keyboard-arrow-left"
									size={24}
									color={COLORS.black}
								/>
							</TouchableOpacity>
						</View>
					}
					centerComponent={{
						text: "FreshBeer",
						style: {
							fontSize: 20,
							...GlobalStyle.headerFont,
							flexDirection: "row",
							justifyContent: "flex-start",
						},
					}}
					rightComponent={
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<TouchableOpacity>
								<Octicons
									name="bookmark"
									size={24}
									color={COLORS.black}
									style={{ marginRight: 10 }}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Ionicons
									name="notifications-outline"
									size={24}
									color={COLORS.black}
								/>
							</TouchableOpacity>
						</View>
					}
				/>

				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.grid}>
						<Button
							title="Find a Venue"
							color={COLORS.foam}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("BeersVenue")}
						/>
						<Button
							title="Find a Beer"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("FindABeer")}
						/>
						<Button
							title="Nearby Venues"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("NearbyVenues")}
						/>
						<Button
							title="Top Rated"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("TopRated")}
						/>
						<Button
							title="Breweries"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("Breweries")}
						/>
					</View>
					<View style={styles.searchContainer}>
						<TextInput
							placeholder="Search..."
							style={styles.searchInput}
							onChangeText={handleSearch}
							value={searchInput}
						/>
					</View>
					<View style={styles.grid}>
						<Button
							title="Sort by Distance"
							color={COLORS.foam}
							filled={sortBy === "dist"}
							style={styles.shortButton}
							onPress={() => handleSortBy("dist")}
						/>
						<Button
							title="Sort by Name"
							color={COLORS.foam}
							filled={sortBy === "name"}
							style={styles.shortButton}
							onPress={() => handleSortBy("name")}
						/>
						<Button
							title="Sort by Rating"
							color={COLORS.foam}
							filled={sortBy === "rating"}
							style={styles.shortButton}
							onPress={() => handleSortBy("rating")}
						/>
					</View>
					<View style={styles.grid}>
						<Button
							title="Ascending"
							color={COLORS.foam}
							filled={sortOrder === "asc"}
							style={styles.shortButton}
							onPress={() => handleSortOrder("asc")}
						/>
						<Button
							title="Descending"
							color={COLORS.foam}
							filled={sortOrder === "desc"}
							style={styles.shortButton}
							onPress={() => handleSortOrder("desc")}
						/>
					</View>

					<View style={styles.container}>
						<ScrollView contentContainerStyle={{ flexGrow: 1, height: 600 }}>
							{sortedVenueData.map((venue) => (
								<VenueItem
									key={venue._id}
									venueID={venue.venueID}
									venueName={venue.venueName}
									venueAddress={venue.venueAddress}
									venueContact={venue.venueContact}
									venueRating={venue.venueRating}
									venueImage={venue.venueImage}
									venueOperatingHours={venue.venueOperatingHours}
								/>
							))}
						</ScrollView>
					</View>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	grid: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		marginHorizontal: 20,
	},
	longButton: {
		width: "20%",
		height: 55,
		marginVertical: 0,
		borderRadius: 20,
		marginRight: 0,
		borderColor: 0,
		elevation: 2,
	},
	shortButton: {
		width: "30%",
		height: 40,
		marginVertical: 5,
		borderRadius: 30,
		borderColor: 0,
		marginHorizontal: "1%",
		marginTop: 10, // Adjust the top spacing here
		elevation: 2,
	},
	button: {
		paddingVertical: 10,
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginTop: 20, // Adjust the top spacing here
	},
	searchInput: {
		flex: 1,
		height: 45,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 20,
		paddingHorizontal: 10,
		marginRight: 10,
		backgroundColor: COLORS.grey,
	},
	container: {
		flex: 1,
		width: "95%",
		alignSelf: "center",
		marginTop: 10,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 10,
		padding: 10,
		minHeight: 50, // Adjust the height as per your requirement
		backgroundColor: COLORS.grey,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	subContainer: {
		marginBottom: 10,
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		shadowColor: COLORS.black, // Add shadow color
		shadowOffset: { width: 0, height: 2 }, // Add shadow offset
		shadowOpacity: 0.3, // Add shadow opacity
		shadowRadius: 3, // Add shadow radius
		elevation: 5, // Add elevation for Android
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	leftContainer: {
		flex: 1,
	},
	rightContainer: {
		flex: 0.3,
		marginRight: 12,
		flexDirection: "row-reverse",
		alignItems: "center",
	},
	venueName: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.black,
	},
	starRatingContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 4,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: COLORS.overlay,
		justifyContent: "center",
		alignItems: "center",
	},
	popup: {
		width: "90%", // Adjust the width of the popup
		height: 500, // Adjust the height of the popup
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 20,
		elevation: 5,
	},
	popupTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	popupContent: {
		fontSize: 16,
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: COLORS.orange,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginTop: "50%", // Adjust the marginTop to shift the close button down
	},
	closeButtonText: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 16,
	},
	venueImage: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginBottom: 10,
	},
	barContainer: {
		marginHorizontal: 2,
		flexDirection: "row",
		marginBottom: 8,
	},
	bar: {
		height: 20,
		backgroundColor: COLORS.foam, // Set the desired color for the bars
	},
});

export default BeersVenue;
