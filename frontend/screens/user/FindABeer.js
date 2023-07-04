import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
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
import COLORS from "../../constants/colors";
import GlobalStyle from "../../utils/GlobalStyle";

const Button = (props) => {
	const filledBgColor = props.color || COLORS.primary;
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
			<Text
				style={{
					fontSize: 12,
					...GlobalStyle.bodyFont,
					...{ color: textColor },
				}}
			>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

const CustomText = (props) => {
	return (
		<Text style={{ ...GlobalStyle.bodyFont, ...props.style }}>
			{props.children}
		</Text>
	);
};

// for popup
const BeerItem = ({
	beerName,
	price,
	rating,
	beerDescription,
	beerImage,
	ABV,
	IBU,
	communityReviews,
	venueAvailability,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupVisible2, setPopupVisible2] = useState(false); // created 2nd modal
	const [popupVisible3, setPopupVisible3] = useState(false); // created 3rd modal

	// review summary
	const data = [
		{ label: "5*", value: 100 },
		{ label: "4*", value: 70 },
		{ label: "3*", value: 50 },
		{ label: "2*", value: 20 },
		{ label: "1*", value: 5 },
	];

	const HorizontalBarChart = () => {
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
		setPopupVisible3(!popupVisible3); // created 3rd modal
	};

	return (
		<View style={styles.subContainer}>
			<TouchableOpacity style={styles.itemContainer} onPress={handlePopupOpen}>
				<View style={{ flex: 1, paddingHorizontal: 6, paddingTop: 6 }}>
					<CustomText>{beerName}</CustomText>
					<CustomText>Price: ${price}</CustomText>
				</View>
				<View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingTop: 6,
						}}
					>
						{[1, 2, 3, 4, 5].map((star) => (
							<Ionicons
								key={star}
								name="star"
								size={16}
								color={star <= rating ? COLORS.foam : COLORS.grey}
							/>
						))}
					</View>
				</View>
			</TouchableOpacity>

			<Modal visible={popupVisible} transparent animationType="slide">
				<View style={styles.modalContainer}>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: COLORS.secondary,
							borderRadius: 10,
							paddingHorizontal: 20,
							elevation: 5,
						}}
					>
						<ScrollView showsVerticalScrollIndicator={false}>
							<Image source={{ uri: beerImage }} style={styles.beerImage} />
							<CustomText
								style={{
									fontSize: 18,
									textAlign: "center",
								}}
							>
								{beerName} -- ${price}
							</CustomText>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View
									style={{
										flex: 1,
										flexDirection: "row",
										justifyContent: "flex-end",
										paddingTop: 16,
										marginBottom: 15,
									}}
								>
									{[1, 2, 3, 4, 5].map((star) => (
										<Ionicons
											key={star}
											name="star"
											size={16}
											color={star <= rating ? COLORS.foam : COLORS.grey}
											style={{ marginBottom: 4 }}
										/>
									))}
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									elevation: 5,
								}}
							>
								<CustomText style={{ marginBottom: 12 }}>
									Alcohol%: {ABV}
								</CustomText>
								<CustomText>Bitter Units: {IBU}</CustomText>
							</View>
							<CustomText style={{ fontSize: 17 }}>Description</CustomText>
							<CustomText>{beerDescription}</CustomText>
							<CustomText
								style={{
									fontSize: 17,
									marginBottom: 10,
									marginTop: 10,
								}}
							>
								Locations
							</CustomText>
							{venueAvailability &&
								venueAvailability.map((location, index) => (
									<CustomText key={index}>{location}</CustomText>
								))}
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									elevation: 5,
								}}
							>
								<CustomText
									style={{
										fontSize: 17,
										marginBottom: 10,
										marginTop: 10,
									}}
								>
									Community Reviews
								</CustomText>
								<Button
									title="View Reviews"
									filled
									style={{
										width: "40%",
										borderRadius: 10,
										borderColor: 0,
										elevation: 2,
									}}
									onPress={handlePopUp2}
								/>
							</View>
							{communityReviews &&
								communityReviews.map((review, index) => (
									<Text key={index}>{review}</Text>
								))}

							<Button
								title="Close"
								onPress={handlePopupClose}
								filled
								style={{
									marginTop: 12,
									marginBottom: 12,
									borderColor: 0,
									elevation: 2,
									borderRadius: 12,
								}}
							/>

							{/* 2nd popup */}
							<Modal visible={popupVisible2} transparent animationType="slide">
								<View style={styles.modalContainer}>
									<View
										style={{
											flex: 1,
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: COLORS.secondary,
											borderRadius: 10,
											paddingHorizontal: 20,
											elevation: 5,
										}}
									>
										<ScrollView style={{ marginTop: 12 }}>
											<TouchableOpacity onPress={handlePopUp2}>
												<Ionicons name="arrow-back" size={24} color="black" />
											</TouchableOpacity>
											<View style={{ marginHorizontal: 12 }}>
												<View
													style={{
														flexDirection: "row",
														marginLeft: 22,
														marginTop: 5,
														marginBottom: 12,
													}}
												>
													<Image
														source={require("../../assets/brewlander.jpg")}
														style={{
															height: 150,
															width: 250,
															borderRadius: 15,
															borderWidth: 5,
															borderColor: 0,
														}}
													/>
												</View>
												<View style={{ flexDirection: "row" }}>
													<View
														style={{
															flex: 1,
															marginHorizontal: 12,
															marginBottom: 12,
														}}
													>
														<Text style={{ ...GlobalStyle.bodyFont }}>
															Beer name
														</Text>
														<Text style={{ ...GlobalStyle.bodyFont }}>
															Address
														</Text>
													</View>
													<Button
														title="Write Reviews"
														filled
														style={{
															width: "40%",
															borderRadius: 10,
															marginBottom: 15,
															marginRight: 32,
															borderColor: 0,
															elevation: 2,
														}}
														onPress={handlePopUp3}
													/>
													{/* 3rd popup */}
													<Modal
														visible={popupVisible3}
														transparent
														animationType="slide"
													>
														<View style={styles.modalContainer}>
															<View
																style={{
																	width: "100%",
																	height: 700,
																	backgroundColor: COLORS.secondary,
																	borderRadius: 10,
																	padding: 20,
																	elevation: 5,
																}}
															>
																<View
																	style={{
																		marginHorizontal: 22,
																		flexDirection: "row",
																		justifyContent: "space-between",
																		marginTop: 32,
																	}}
																></View>
																<View
																	style={{
																		width: "100%",
																		borderColor: 0,
																		paddingHorizontal: 20,
																		paddingVertical: 10,
																		borderRadius: 30,
																		marginBottom: 25,
																		backgroundColor: COLORS.grey,
																		elevation: 2,
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
																				...GlobalStyle.headerFont,
																			}}
																		>
																			Beer Name:
																		</Text>
																		<View
																			style={{
																				flex: 1,
																				alignItems: "flex-end",
																			}}
																		>
																			<AirbnbRating
																				count={5}
																				defaultRating={4}
																				size={18}
																				showRating={false}
																				isDisabled={true}
																			/>
																		</View>
																	</View>
																</View>
																<View
																	style={{
																		flexDirection: "column",
																		height: 300,
																		width: 320,
																		elevation: 2,
																		backgroundColor: COLORS.grey,
																		marginTop: 10,
																		borderRadius: 15,
																		borderColor: COLORS.black,
																		marginBottom: 10,
																		paddingHorizontal: 12,
																	}}
																>
																	<Text
																		style={{
																			fontSize: 15,
																			...GlobalStyle.headerFont,
																			marginTop: 20,
																			marginLeft: 12,
																		}}
																	>
																		Review:
																	</Text>
																	<View
																		style={{
																			flex: 1,
																			borderColor: 0,
																			borderWidth: 1,
																			borderRadius: 12,
																			resizeMode: "contain",
																			paddingLeft: 12,
																			marginTop: 10,
																			backgroundColor: COLORS.grey,
																		}}
																	>
																		<TextInput
																			placeholder="Write your reviews here"
																			style={{ ...GlobalStyle.bodyFont }}
																		></TextInput>
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
																			...GlobalStyle.headerFont,
																			marginLeft: 10,
																		}}
																	>
																		Your rating:
																	</Text>
																	<View
																		style={{
																			flex: 1,
																			alignItems: "flex-end",
																		}}
																	>
																		<AirbnbRating
																			count={5}
																			defaultRating={4}
																			size={18}
																			showRating={false}
																		/>
																	</View>
																</View>
																<Button
																	title="Submit"
																	onPress={handlePopUp3}
																	filled
																	style={{
																		elevation: 2,
																		borderColor: 0,
																	}}
																/>
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
													<CustomText style={{ marginBottom: 12 }}>
														Review Summary
													</CustomText>
													<HorizontalBarChart />
													<CustomText>Posted by User</CustomText>
												</View>
												<View style={{ marginRight: 12, marginHorizontal: 12 }}>
													<View
														style={{
															flexDirection: "row",
															height: 100,
															elevation: 2,
															backgroundColor: COLORS.grey,
															marginTop: 10,
															borderRadius: 15,
															borderColor: COLORS.black,
															marginBottom: 10,
															marginHorizontal: 12,
															alignItems: "center",
															//			marginLeft: 12,
														}}
													>
														<View
															style={{
																marginHorizontal: 12,
																flexDirection: "row",
																paddingHorizontal: 10,
															}}
														>
															<CustomText>Beer is nice</CustomText>
														</View>
													</View>
												</View>
											</View>
										</ScrollView>
									</View>
								</View>
							</Modal>
						</ScrollView>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const FindABeer = ({ navigation }) => {
	const [sortedBeerData, setSortedBeerData] = useState([]);
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchInput, setSearchInput] = useState("");
	const [beerData, setBeerData] = useState([]);

	useEffect(() => {
		const fetchBeerData = async () => {
			try {
				const response = await axios.get("http://10.0.2.2:3000/getBeerData");
				const { success, beerData } = response.data;
				if (success) {
					let sortedData = [...beerData];
					switch (sortBy) {
						case "name":
							sortedData.sort((a, b) => a.beerName.localeCompare(b.beerName));
							break;
						case "price":
							sortedData.sort((a, b) => a.price - b.price);
							break;
						case "rating":
							sortedData.sort((a, b) => a.rating - b.rating);
							break;
						default:
							break;
					}
					if (sortOrder === "desc") {
						sortedData.reverse();
					}
					setSortedBeerData(sortedData);
					setBeerData(beerData);
				} else {
					console.error("Error retrieving beer data:", response.data.message);
				}
			} catch (error) {
				console.error("Error retrieving beer data:", error);
			}
		};

		fetchBeerData();
	}, [sortBy, sortOrder]);

	const handleSortBy = (by) => {
		if (by === sortBy) return;
		setSortBy(by);
	};

	const handleSortOrder = (order) => {
		if (order === sortOrder) return;
		setSortOrder(order);
		let sortedData = [...sortedBeerData];
		if (order === "desc") {
			sortedData.reverse();
		}
		setSortedBeerData(sortedData);
	};

	const handleSearch = (text) => {
		setSearchInput(text);
		const filteredData = beerData.filter((beer) =>
			beer.beerName.toLowerCase().includes(text.toLowerCase())
		);
		setSortedBeerData(filteredData);
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
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("BeersVenue")}
						/>
						<Button
							title="Find a Beer"
							color={COLORS.foam}
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
							title="Sort by Name"
							color={COLORS.foam}
							filled={sortBy === "name"}
							style={styles.shortButton}
							onPress={() => handleSortBy("name")}
						/>
						<Button
							title="Sort by Price"
							color={COLORS.foam}
							filled={sortBy === "price"}
							style={styles.shortButton}
							onPress={() => handleSortBy("price")}
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
							{sortedBeerData.map((beer) => (
								<BeerItem
									key={beer._id}
									beerName={beer.beerName}
									price={beer.price}
									rating={beer.rating}
									beerDescription={beer.beerDescription}
									beerImage={beer.beerImage}
									ABV={beer.abv}
									IBU={beer.ibu}
									communityReviews={beer.communityReviews}
									venueAvailability={beer.venueAvailability}
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
		borderColor: 0,
		marginRight: 0,
		elevation: 2,
	},
	shortButton: {
		width: "30%",
		height: 40,
		marginVertical: 5,
		borderRadius: 30,
		// marginHorizontal: "1%",
		// marginTop: 10, // Adjust the top spacing here
		borderColor: 0,
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
		borderRadius: 12,
		borderWidth: 1,
		shadowColor: COLORS.black, // Add shadow color
		shadowOffset: { width: 0, height: 2 }, // Add shadow offset
		shadowOpacity: 0.3, // Add shadow opacity
		shadowRadius: 3, // Add shadow radius
		elevation: 5, // Add elevation for Android
		borderColor: 0,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		borderColor: 0,
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
	beerName: {
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
	beerImage: {
		height: 230,
		width: 250,
		borderRadius: 15,
		borderWidth: 5,
		borderColor: 0,
		marginTop: 20,
		marginLeft: 25,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	closeButton: {
		backgroundColor: COLORS.foam,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginTop: "50%", // Adjust the marginTop to shift the close button down
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

export default FindABeer;
