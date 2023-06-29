import {
	Entypo,
	FontAwesome,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect } from "react";
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView, useFocusEffect } from "react-native-safe-area-context";
import { useCookies } from "../CookieContext";
import COLORS from "../constants/colors";

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

	useEffect(() => {
		const sessionToken = cookies.sessionToken;
		const userID = cookies.userID;
		// Use the sessionToken and username as needed
		console.log("Session Token:", sessionToken);
		console.log("UserID:", userID);
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
		<ScrollView contentContainerStyle={{ flexGrow: 1, height: 1110 }}>
			<SafeAreaView backgroundColor={COLORS.secondary}>
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
							color: COLORS.black,
							fontWeight: "bold",
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
							fontWeight: "bold",
							color: COLORS.black,
							marginTop: 20,
							marginBottom: 12,
						}}
					>
						Joe, Welcome Back!
					</Text>
					<Text
						style={{
							fontSize: 15,
							color: COLORS.black,
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
							justifyContent: "space-between",
							marginHorizontal: 15,
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
									marginVertical: 10,
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
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
								marginBottom: 10,
								width: 100,
								alignItems: "center",
								// marginHorizontal: 5,
								// marginVertical: 5,
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
										fontWeight: "bold",
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
									//		paddingBottom: 12,
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
								// marginHorizontal: 5,
								// marginVertical: 5,
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
										fontWeight: "bold",
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
									//			paddingBottom: 12,
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
										fontWeight: "bold",
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
									//			paddingBottom: 12,
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
								// marginHorizontal: 5,
								// marginVertical: 5,
							}}
						>
							<View
								style={{
									flexDirection: "column",
									paddingTop: 10,
									paddingHorizontal: 6,
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										textAlign: "center",
										width: 100,
									}}
								>
									My Journal &
								</Text>
								<Text
									style={{
										fontWeight: "bold",
										textAlign: "center",
										width: 100,
									}}
								>
									Achievements
								</Text>
							</View>
							<Ionicons
								name="md-people-circle"
								size={44}
								color={COLORS.foam}
								style={{
									paddingLeft: 35,
									//			paddingBottom: 12,
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
								// marginHorizontal: 5,
								// marginVertical: 5,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									paddingTop: 10,
									paddingHorizontal: 10,
									marginVertical: 10,
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
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
									//			paddingBottom: 12,
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
									backgroundColor: COLORS.foam, // Change the background color here
								},
							},
						}}
					>
						<TabView value={index} onChange={setIndex} animationType="spring">
							<TabView.Item style={{ width: "100%", marginTop: -30 }}>
								<Card containerStyle={styles.cardContainer}>
									<ImageBackground
										source={require("../assets/event1.png")}
										style={styles.cardImage}
									/>
								</Card>
							</TabView.Item>
							<TabView.Item style={{ width: "100%", marginTop: -30 }}>
								<Card containerStyle={styles.cardContainer}>
									<ImageBackground
										source={require("../assets/event2.png")}
										style={styles.cardImage}
									/>
								</Card>
							</TabView.Item>
							<TabView.Item style={{ width: "100%", marginTop: -30 }}>
								<Card containerStyle={styles.cardContainer}>
									<ImageBackground
										source={require("../assets/event3.png")}
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
					<Card.Title>Recommended Specially For You</Card.Title>
					<Card.Divider />
					<ThemeProvider
						theme={{
							Tab: {
								primary: {
									backgroundColor: COLORS.foam, // Change the background color here
								},
							},
						}}
					>
						<TabView value={index1} onChange={setIndex1} animationType="spring">
							<TabView.Item style={{ width: "100%", marginTop: -30 }}>
								<Card containerStyle={styles.cardContainer}>
									<ImageBackground
										source={require("../assets/beer1.png")}
										style={styles.cardImage}
									/>
								</Card>
							</TabView.Item>
							<TabView.Item style={{ width: "100%", marginTop: -30 }}>
								<Card containerStyle={styles.cardContainer}>
									<ImageBackground
										source={require("../assets/beer2.png")}
										style={styles.cardImage}
									/>
								</Card>
							</TabView.Item>
							<TabView.Item style={{ width: "100%", marginTop: -30 }}>
								<Card containerStyle={styles.cardContainer}>
									<ImageBackground
										source={require("../assets/beer3.png")}
										style={styles.cardImage}
									/>
								</Card>
							</TabView.Item>
						</TabView>
					</ThemeProvider>
				</Card>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	// grid: {
	// 	flexDirection: "row",
	// 	justifyContent: "space-between",
	// 	flexWrap: "wrap",
	// 	marginBottom: 10,
	// },
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
		height: 50,
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
		//backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 5,
		//marginBottom: 5,
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
		//backgroundColor: 'transparent',
		width: "100%",
		height: "100%",
	},
});

export default Dashboard;
