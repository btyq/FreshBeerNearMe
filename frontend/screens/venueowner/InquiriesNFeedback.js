import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
	Alert,
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
import axios from "axios";

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

const InquiriesNFeedback = ({ navigation }) => {
	const { cookies } = useCookies();
	const [index, setIndex] = React.useState(0);
	const [index1, setIndex1] = React.useState(0);
	const [username, setUsername] = useState("");

	const [feedbackData, setFeedbackData] = useState([]);
	const [loading, setLoading] = useState(true);

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
				setFeedbackData(feedbacks)
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error retrieving data", error);
				setLoading(false);
			});
	}, []);

	const data = [30, 40, 25, 50, 45, 20];
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

	const maxDataValue = Math.max(...data);
	const scaleY = 150 / maxDataValue;

	const navigateToRespond = (feedbackItem) => {
		navigation.navigate("Respond", {feedbackData: feedbackItem})
	};

	// ================================== Functions for different button ==================================
	const handleUpcomingEventsClick = () => {
		// Handle click for "Upcoming Events" here
	};

	const handleRecommendedSpecialtyClick = () => {
		// Handle click for "Recommended Specialty for You" here
	};

	//=====================================================================================================
	return (
		<SafeAreaView backgroundColor={COLORS.secondary} style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1 }}>
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
								<TouchableOpacity onPress={()=>console.log(feedbackData)}>
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
							flexDirection: "row",
							alignItems: "center",
							marginTop: 10,
						}}
					>
						<Text
							style={{
								marginLeft: 20,
								marginBottom: 10,
								fontSize: 15,
								// Add any additional styles from GlobalStyle.headerFont
								marginBottom: 5,
								flex: 1, // Take up remaining space
							}}
						>
							Feedback
						</Text>
						<View
							style={{
								flex: 1,
								borderBottomWidth: 1, // Adjust the thickness as desired
								borderBottomColor: COLORS.black,
								marginLeft: -240, // Adjust the value to prevent overlapping
							}}
						/>
					</View>
					{/* Container with sub-containers */}
					<View
						style={{
							marginTop: 10,
							borderWidth: 1,
							borderColor: COLORS.black,
							borderRadius: 5,
							padding: 10,
							margin: 20,
							borderRadius: 10,
						}}
					>
						{loading ? (
							<View style={{ alignItems: "center" }}>
								<Text>Loading...</Text>
							</View>
							) : (
							// Map through feedbackData and display each feedback item
							feedbackData.map((feedbackItem, index) => (
								<View
								key={index}
								style={{
									borderWidth: 1,
									borderColor: COLORS.black,
									borderRadius: 10,
									paddingHorizontal: 10,
									paddingVertical: 10,
									width: 300,
									marginBottom: 30,
								}}
								>
								{/* Display the description of the feedback item */}
								<Text style={styles.label}>Location:</Text>
								<Text style={{ fontSize: 14 }}>{feedbackItem.venueName}</Text>
								<Text style={styles.label}>Date:</Text>
								<Text style={{ fontSize: 14 }}>
									{feedbackItem.feedback.feedbackDate}
								</Text>
								<Text style={styles.label}>
									{feedbackItem.feedback.username} sent a feedback:
								</Text>
								<Text style={{ fontSize: 14 }}>
									{feedbackItem.feedback.feedbackDescription}
								</Text>
								<TouchableOpacity
									onPress={
									feedbackItem.feedback.feedbackResponseBool
										? null // If feedbackResponseBool is true, make the button unclickable
										: () => navigateToRespond(feedbackItem)
									}
									style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
									}}
									disabled={feedbackItem.feedback.feedbackResponseBool}
								>
									<Text style={{ color: COLORS.black, fontSize: 12 }}>
									{feedbackItem.feedback.feedbackResponseBool
										? "Responded"
										: "Respond"}
									</Text>
								</TouchableOpacity>
							</View>
							))
						)}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>					
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
	label: {
		marginBottom: 5,
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default InquiriesNFeedback;
