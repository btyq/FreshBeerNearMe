import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCookies } from "../../CookieContext";
import COLORS from "../../constants/colors";
import GlobalStyle from "../../utils/GlobalStyle";

// CODES TO STYLE BUTTON
const Button = (props) => {
	const filledBgColor = props.color || COLORS.primary;
	const outlinedColor = COLORS.white;
	const bgColor = props.filled ? filledBgColor : outlinedColor;
	const textColor = props.filled ? COLORS.black : COLORS.primary;

	return (
		<TouchableOpacity
			style={{
				...styles.button,
				...{ backgroundColor: bgColor },
				...props.style,
			}}
			onPress={props.onPress}
		>
			<Text style={{ fontSize: 14, ...{ color: textColor } }}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

const Dashboard = ({ navigation }) => {
	const { cookies } = useCookies();
	const [index, setIndex] = React.useState(0);
	const [index1, setIndex1] = React.useState(0);
	const [username, setUsername] = useState("");
	const [personalisedData, setPersonalisedData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const sessionToken = cookies.sessionToken;
		const userID = cookies.userID;
		setUsername(cookies.username);
	}, []);

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getPersonalisedRecommendation", {
				params: {
					userID: cookies.userID,
				},
			})
			.then((response) => {
				setPersonalisedData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error retrieving personalised reccommendation", error);
				setIsLoading(false);
			});
	}, []);

	// ================================== Functions for different button ==================================
	const handleUpcomingEventsClick = () => {
		// Handle click for "Upcoming Events" here
	};

	const handleRecommendedSpecialtyClick = () => {
		// Handle click for "Recommended Specialty for You" here
	};

	//=====================================================================================================
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
					<ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginTop: 5,
							}}
						>
							<Text
								style={{
									fontSize: 26,
									color: COLORS.black,
									marginTop: 20,
									marginBottom: 12,
									...GlobalStyle.headerFont,
								}}
							>
								{username}, Welcome Back!
							</Text>
							<Text
								style={{
									fontSize: 15,
									...GlobalStyle.headerFont,
									marginBottom: 5,
								}}
							>
								What would you like to do?
							</Text>

							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 10,
									alignContent: "center",
									justifyContent: "center",
									marginHorizontal: 22,
								}}
							>
								<TouchableOpacity
									onPress={() => navigation.navigate("Profile")}
									style={{
										height: 100,
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginTop: 10,
										borderRadius: 15,
										marginBottom: 10,
										width: 100,
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "row",
											paddingTop: 10,
											paddingHorizontal: 10,
											marginVertical: 8,
										}}
									>
										<Text
											style={{
												fontSize: 14,
												...GlobalStyle.bodyFont,
											}}
										>
											My Profile
										</Text>
									</View>
									<MaterialIcons
										name="face"
										size={44}
										color={COLORS.foam}
										style={{
											paddingLeft: 35,
											alignItems: "flex-end",
										}}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => navigation.navigate("BeersVenue")}
									style={{
										height: 100,
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginLeft: 10,
										marginTop: 10,
										borderRadius: 15,
										marginBottom: 3,
										width: 100,
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "row",
											paddingTop: 10,
											paddingHorizontal: 10,
										}}
									>
										<Text
											style={{
												fontSize: 13,
												...GlobalStyle.bodyFont,
											}}
										>
											Beers & Venues
										</Text>
									</View>
									<Ionicons
										name="beer"
										size={44}
										color={COLORS.foam}
										style={{
											paddingLeft: 35,
											alignItems: "flex-end",
										}}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => navigation.navigate("Social")}
									style={{
										height: 100,
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginLeft: 10,
										marginTop: 10,
										borderRadius: 15,
										marginBottom: 10,
										width: 100,
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "row",
											paddingTop: 10,
											paddingHorizontal: 8,
										}}
									>
										<Text
											style={{
												fontSize: 13,
												...GlobalStyle.bodyFont,
											}}
										>
											Social & Community
										</Text>
									</View>
									<Ionicons
										name="md-people-circle"
										size={44}
										color={COLORS.foam}
										style={{
											paddingLeft: 35,
											alignItems: "flex-end",
										}}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => navigation.navigate("Feedback")}
									style={{
										height: 100,
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginTop: 10,
										borderRadius: 15,
										marginBottom: 10,
										width: 100,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "row",
											paddingTop: 10,
											paddingHorizontal: 10,
										}}
									>
										<Text
											style={{
												fontSize: 13,
												...GlobalStyle.bodyFont,
											}}
										>
											Feedback & Requests
										</Text>
									</View>
									<MaterialIcons
										name="feedback"
										size={44}
										color={COLORS.foam}
										style={{
											paddingLeft: 35,
											alignItems: "flex-end",
										}}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => navigation.navigate("Journal")}
									style={{
										height: 100,
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginLeft: 10,
										marginTop: 10,
										borderRadius: 15,
										marginBottom: 10,
										width: 100,
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "column",
											paddingTop: 10,
											paddingHorizontal: 4,
											alignItems: "center",
										}}
									>
										<Text
											style={{
												fontSize: 13,
												...GlobalStyle.bodyFont,
												textAlign: "center",
												width: 100,
											}}
										>
											My Journal &
										</Text>
										<Text
											style={{
												fontSize: 13,
												...GlobalStyle.bodyFont,
												textAlign: "center",
												width: 100,
											}}
										>
											Achievements
										</Text>
									</View>
									<Ionicons
										name="journal"
										size={40}
										color={COLORS.foam}
										style={{
											paddingLeft: 35,
											alignItems: "flex-end",
										}}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => navigation.navigate("Wishlist")}
									style={{
										height: 100,
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginLeft: 10,
										marginTop: 10,
										borderRadius: 15,
										marginBottom: 10,
										width: 100,
										alignItems: "center",
									}}
								>
									<View
										style={{
											flexDirection: "row",
											paddingTop: 10,
											paddingHorizontal: 8,
											marginVertical: 10,
										}}
									>
										<Text
											style={{
												fontSize: 14,
												...GlobalStyle.bodyFont,
											}}
										>
											My Wishlist
										</Text>
									</View>
									<Ionicons
										name="list-circle"
										size={44}
										color={COLORS.foam}
										style={{
											paddingLeft: 35,
											alignItems: "flex-end",
										}}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<Card
							containerStyle={{
								marginTop: 5,
								height: 280,
								backgroundColor: "transparent",
								borderColor: "transparent",
							}}
						>
							<Card.Title>Upcoming Events</Card.Title>
							<Card.Divider />
							<ThemeProvider
								theme={{
									Tab: {
										primary: {
											backgroundColor: COLORS.grey,
										},
									},
								}}
							>
								<TabView
									value={index}
									onChange={setIndex}
									animationType="spring"
								>
									<TabView.Item style={{ width: "100%", marginTop: -30 }}>
										<Card containerStyle={styles.cardContainer}>
											<ImageBackground
												source={require("../../assets/event1.png")}
												style={styles.cardImage}
											/>
										</Card>
									</TabView.Item>
									<TabView.Item style={{ width: "100%", marginTop: -30 }}>
										<Card containerStyle={styles.cardContainer}>
											<ImageBackground
												source={require("../../assets/event2.png")}
												style={styles.cardImage}
											/>
										</Card>
									</TabView.Item>
									<TabView.Item style={{ width: "100%", marginTop: -30 }}>
										<Card containerStyle={styles.cardContainer}>
											<ImageBackground
												source={require("../../assets/event3.png")}
												style={styles.cardImage}
											/>
										</Card>
									</TabView.Item>
								</TabView>
							</ThemeProvider>
						</Card>

						<Card
							containerStyle={{
								marginTop: 5,
								height: 280,
								backgroundColor: "transparent",
								borderColor: "transparent",
							}}
						>
							{isLoading ? (
								<View style={{ alignItems: "center", marginTop: 20 }}>
									<ActivityIndicator size="large" color={COLORS.primary} />
									<Text>Loading...</Text>
								</View>
							) : (
								<ThemeProvider
									theme={{
										Tab: {
											primary: {
												backgroundColor: COLORS.grey,
											},
										},
									}}
								>
									<Card.Title>
										Since you like {personalisedData.mostFrequentCategory}...
									</Card.Title>
									<Card.Divider />
									<TabView
										value={index1}
										onChange={setIndex1}
										animationType="spring"
									>
										{personalisedData.recommendedBeers.map((beer, index) => (
											<TabView.Item
												key={index}
												style={{ width: "100%", marginTop: -30 }}
											>
												<Card containerStyle={styles.cardContainer}>
													<TouchableOpacity onPress={() => console.log(beer)}>
														<ImageBackground
															source={{ uri: beer.beerImage }}
															style={styles.cardImage}
														></ImageBackground>
													</TouchableOpacity>
												</Card>
											</TabView.Item>
										))}
									</TabView>
								</ThemeProvider>
							)}
						</Card>
					</ScrollView>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 3, // increased padding
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		elevation: 20,
	},
	cardContainer: {
		height: 10,
		borderRadius: 10,
		marginBottom: 5,
		borderWidth: 0, // Make the border transparent
		shadowColor: "transparent", // Make the shadow color transparent
		elevation: 0, // Remove the elevation (shadow effect)
	},
	card: {
		width: "100%",
		height: 150,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 5,
	},
	cardImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderRadius: 10,
		overflow: "hidden",
	},
	tabContent: {
		width: "100%",
		height: 50, // Adjust the height as per your requirement
	},
	tabView: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		position: "absolute",
		top: 0,
		left: 0,
	},
	tabViewItem: {
		width: "100%",
		height: "100%",
	},
});

export default Dashboard;
