import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
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

const VenueOwnerHome = ({ navigation }) => {
	const { cookies } = useCookies();
	const [index, setIndex] = React.useState(0);
	const [index1, setIndex1] = React.useState(0);
	const [username, setUsername] = useState("");

	const [feedbackData, setFeedbackData] = useState([]);
	const [newFeedbackData, setNewFeedbackData] = useState([]);
	const [loading, setLoading] = useState(true);

	const [popularData, setPopularData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	function parseDate(dateString) {
		const [day, month, year] = dateString.split("/");
		return new Date(`${year}-${month}-${day}`);
	}

	useEffect(() => {
		setUsername(cookies.username);
		axios
			.get("http://10.0.2.2:3000/getFeedback", {
				params: {
					venueOwnerID: cookies.venueOwnerID,
				},
			})
			.then((response) => {
				const { feedbacks } = response.data;

				let latestFeedback = null;
				for (const feedback of feedbacks) {
					const feedbackDate = parseDate(feedback.feedback.feedbackDate);
					if (
						!latestFeedback ||
						feedbackDate > parseDate(latestFeedback.feedback.feedbackDate)
					) {
						latestFeedback = feedback;
					}
				}
				setNewFeedbackData(latestFeedback);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error retrieving data", error);
				setLoading(false);
			});
	}, []);

	// for most popular beer
	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getMostPopularBeer", {
				params: {
					venueOwnerID: cookies.venueOwnerID,
				},
			})
			.then((response) => {
				console.log("API response:", response.data);
				setPopularData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error retrieving POPULAR BEER", error);
				setIsLoading(false);
			});
	}, []);

	const data = [30, 40, 25, 50, 45, 20];
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

	const maxDataValue = Math.max(...data);
	const scaleY = 150 / maxDataValue;

	const navigateToRespond = () => {
		navigation.navigate("Respond", { feedbackData: newFeedbackData });
	};

	// ================================== Functions for different button ==================================
	const handleUpcomingEventsClick = () => {
		// Handle click for "Upcoming Events" here
	};

	const handleRecommendedSpecialtyClick = () => {
		// Handle click for "Recommended Specialty for You" here
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
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity onPress={() => console.log(newFeedbackData)}>
								<Octicons
									name="bookmark"
									size={24}
									color={COLORS.black}
									style={{ marginRight: 10 }}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => console.log(popularData)}>
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
					<ScrollView>
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
								Welcome, {username}
							</Text>
							<Text style={{ ...GlobalStyle.headerFont, marginBottom: 25 }}>
								What would you like to do?
							</Text>
						</View>

						<View style={{ marginHorizontal: 22 }}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontSize: 18,
										...GlobalStyle.headerFont,
										marginBottom: 12,
									}}
								>
									Latest Feedback
								</Text>
								<Button
									title="View all"
									onPress={() => navigation.navigate("InquiriesNFeedback")}
									filled
									style={{
										width: "30%",
										alignContent: "center",
										borderColor: 0,
										elevation: 2,
										borderRadius: 12,
									}}
								/>
							</View>

							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 10,
									alignContent: "center",
									justifyContent: "center",
								}}
							>
								{loading ? (
									<Text>Loading latest feedback...</Text>
								) : (
									<TouchableOpacity
										onPress={navigateToRespond}
										style={{
											height: 200,
											elevation: 2,
											backgroundColor: COLORS.grey,
											marginTop: 10,
											borderRadius: 15,
											marginBottom: 10,
											width: "100%",
											padding: 20,
										}}
									>
										<Text style={{ ...GlobalStyle.headerFont }}>Location:</Text>
										<CustomText>{newFeedbackData.venueName}</CustomText>
										<Text style={{ ...GlobalStyle.headerFont }}>Date:</Text>
										<CustomText>
											{newFeedbackData.feedback.feedbackDate}
										</CustomText>
										<View style={{ flexDirection: "row" }}>
											<Text style={{ fontStyle: "italic" }}>
												{newFeedbackData.feedback.username}
											</Text>
											<Text style={{ ...GlobalStyle.headerFont }}>
												{"  "} sent a feedback:
											</Text>
										</View>
										<CustomText>
											{newFeedbackData.feedback.feedbackDescription}
										</CustomText>
									</TouchableOpacity>
								)}
							</View>

							<Text
								style={{
									fontSize: 18,
									...GlobalStyle.headerFont,
									marginVertical: 12,
								}}
							>
								Profile
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 10,
								}}
							>
								{/* venue profile */}
								<TouchableOpacity
									onPress={() => navigation.navigate("VenueProfile")}
									style={styles.container}
								>
									<CustomText>Venue Profile</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="house-user"
											size={34}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>

								{/* manage inventory */}
								<TouchableOpacity
									onPress={() => navigation.navigate("ManageInventory")}
									style={styles.container}
								>
									<CustomText>Manage Inventory</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="warehouse"
											size={34}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>
							</View>

							{/* social */}
							<Text
								style={{
									fontSize: 18,
									...GlobalStyle.headerFont,
									marginVertical: 12,
								}}
							>
								Social
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 10,
								}}
							>
								{/* create events */}
								<TouchableOpacity
									onPress={() => navigation.navigate("CreateEvents")}
									style={styles.container}
								>
									<CustomText>Create Events</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="speakap"
											size={44}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>
							</View>

							{/* analytics */}
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginTop: 12,
								}}
							>
								<Text
									style={{
										fontSize: 18,
										...GlobalStyle.headerFont,
										marginVertical: 12,
									}}
								>
									Analytics
								</Text>
								<Button
									title="See more"
									onPress={() => navigation.navigate("Analytics")}
									filled
									style={{
										width: "30%",
										alignContent: "center",
										borderColor: 0,
										elevation: 2,
										borderRadius: 12,
									}}
								/>
							</View>
							<TouchableOpacity
								onPress={() => console.log("popularData:", popularData)}
								style={{
									height: 250,
									elevation: 2,
									backgroundColor: COLORS.grey,
									marginTop: 10,
									borderRadius: 15,
									marginBottom: 10,
									width: "100%",
									padding: 20,
								}}
							>
								<Text
									style={{
										...GlobalStyle.headerFont,
										fontSize: 16,
										marginBottom: 16,
									}}
								>
									Most Popular Beer
								</Text>
								<View style={{ flexDirection: "row", alignItems: "flex-end" }}>
									{isLoading ? (
										<Text>Loading...</Text>
									) : popularData ? (
										<View>
											<Text style={{ ...GlobalStyle.bodyFont }}>
												Beer Name: {popularData.mostPopularBeerID}
											</Text>
											<View
												style={{ borderBottomWidth: 1, marginVertical: 10 }}
											/>
										</View>
									) : (
										<Text>No most popular beer data found.</Text>
									)}
								</View>
							</TouchableOpacity>

							{/* venue comparison  */}
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginTop: 12,
								}}
							>
								<Text
									style={{
										fontSize: 18,
										...GlobalStyle.headerFont,
										marginVertical: 12,
									}}
								>
									Venue Comparison
								</Text>
								<Button
									title="See more"
									onPress={() => navigation.navigate("VenueComparison")}
									filled
									style={{
										width: "30%",
										alignContent: "center",
										borderColor: 0,
										elevation: 2,
										borderRadius: 12,
									}}
								/>
							</View>
							<View
								style={{
									height: 250,
									elevation: 2,
									backgroundColor: COLORS.grey,
									marginTop: 10,
									borderRadius: 15,
									marginBottom: 10,
									width: "100%",
									padding: 20,
								}}
							>
								<Text
									style={{
										...GlobalStyle.headerFont,
										fontSize: 16,
										marginBottom: 16,
									}}
								>
									Venue Popularity this week
								</Text>
								<View style={{ flexDirection: "row", alignItems: "flex-end" }}>
									{data.map((value, index) => (
										<View
											key={index}
											style={{
												flex: 1,
												marginLeft: 10,
												alignItems: "center",
											}}
										>
											<View
												style={{
													height: value * scaleY,
													width: 10,
													backgroundColor: COLORS.foam,
												}}
											/>
											<Text style={{ fontSize: 12, marginTop: 5 }}>
												{labels[index]}
											</Text>
										</View>
									))}
								</View>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		marginBottom: 5,
		fontWeight: "bold",
		fontSize: 16,
	},
	container: {
		height: 100,
		elevation: 2,
		backgroundColor: COLORS.grey,
		marginLeft: 10,
		marginTop: 10,
		borderRadius: 15,
		marginBottom: 3,
		width: "45%",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default VenueOwnerHome;
