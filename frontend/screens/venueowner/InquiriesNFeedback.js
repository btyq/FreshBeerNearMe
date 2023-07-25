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

const InquiriesNFeedback = ({ navigation }) => {
	const { cookies } = useCookies();
	const [index, setIndex] = React.useState(0);
	const [index1, setIndex1] = React.useState(0);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const sessionToken = cookies.sessionToken;
		const venueOwnerID = cookies.venueOwnerID;
		setUsername(cookies.username);
	}, []);

	const data = [30, 40, 25, 50, 45, 20];
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

	const maxDataValue = Math.max(...data);
	const scaleY = 150 / maxDataValue;

	const navigateToRespond = () => {
		navigation.navigate("Respond");
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
							flexDirection: "row",
							alignItems: "center",
							marginTop: 30,
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
							Profile
						</Text>
						<View
							style={{
								flex: 1,
								borderBottomWidth: 1, // Adjust the thickness as desired
								borderBottomColor: COLORS.black,
								marginLeft: -290, // Adjust the value to prevent overlapping
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
						{/* Sub-container 1 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 2 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 3 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 4 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 5 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>
					</View>
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
						{/* Sub-container 1 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 2 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 3 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 4 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>

						{/* Sub-container 5 */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderWidth: 1,
								borderColor: COLORS.black,
								padding: 10,
								marginBottom: 10,
								borderRadius: 10,
							}}
						>
							<Text style={{ flex: 1 }}>Description</Text>
							<TouchableOpacity
								onPress={navigateToRespond}
								style={{
									backgroundColor: COLORS.grey,
									padding: 10,
									borderRadius: 50,
									borderWidth: 1,
									borderColor: COLORS.black,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text style={{ color: COLORS.black, fontSize: 12 }}>
									Respond
								</Text>
							</TouchableOpacity>
						</View>
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
