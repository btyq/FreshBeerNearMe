import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
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
import { useCookies } from "../CookieContext";
import COLORS from "../constants/colors";
import GlobalStyle from "../utils/GlobalStyle";

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

const VenueOwnerHome = ({ navigation }) => {
	const { cookies } = useCookies();
	const [index, setIndex] = React.useState(0);
	const [index1, setIndex1] = React.useState(0);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const sessionToken = cookies.sessionToken;
		const venueOwnerID = cookies.venueOwnerID;
		setUsername(cookies.username);
		// Use the sessionToken and username as needed
		console.log("Session Token:", sessionToken);
		console.log("VenueOwnerID:", venueOwnerID);
		console.log("Username: ", username);
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
                </View>
			</SafeAreaView>
		</ScrollView>
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

export default VenueOwnerHome;
