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
	}, []);

	const data = [30, 40, 25, 50, 45, 20];
	const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

	const maxDataValue = Math.max(...data);
	const scaleY = 150 / maxDataValue;

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

					<View style={{ justifyContent: "center", alignItems: "center", marginTop: 5 }}>
						<Text
							style={{
								fontSize: 26,
								color: COLORS.black,
								marginTop: 10,
								marginBottom: 0,
								...GlobalStyle.headerFont,
							}}
						>
							Welcome Back!,
						</Text>
						<Text
							style={{
								fontSize: 26,
								color: COLORS.black,
								marginTop: -20,

								...GlobalStyle.headerFont,
							}}
						>
							{username}
						</Text>
						<Text
							style={{
								fontSize: 15,
								...GlobalStyle.headerFont,
								marginBottom: 5,
								marginTop: 5,
							}}
						>
							What would you like to do?
						</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<View style={{ marginTop: 20, width: '95%', borderWidth: 1, borderColor: COLORS.grey, borderRadius: 20 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 }}>
								<Text
									style={{
										flex: 1, // Take up remaining space
										marginLeft: 40,
										marginBottom: 10,
										fontSize: 15,
										// Add any additional styles from GlobalStyle.headerFont
										marginBottom: 5,
									}}
								>
									New inquiries & Feedback
								</Text>
								<TouchableOpacity
									onPress={() => { }}
									style={{
										marginRight: 40,
										marginBottom: 10,
										backgroundColor: COLORS.grey,
										paddingHorizontal: 10,
										paddingVertical: 5,
										borderRadius: 20,
									}}
								>
									<Text style={{ color: 'black', fontSize: 15 }}>See All</Text>
								</TouchableOpacity>
							</View>
							<View style={{ marginTop: 10 }}>
								<TouchableOpacity>
									<View style={{
										borderWidth: 1,
										borderColor: COLORS.grey,
										borderRadius: 10,
										paddingHorizontal: 10,
										paddingVertical: 10,
										marginHorizontal: 40,
										height: 60, // Set a fixed height for both containers,
										width: 300,

									}}>
										<Text style={styles.label}>User Ask:</Text>
										<Text style={{
											fontSize: 14,
										}}>What is the status of my inquiry?</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={{ marginTop: 10 }}>
								<TouchableOpacity>
									<View style={{
										borderWidth: 1,
										borderColor: COLORS.grey,
										borderRadius: 10,
										paddingHorizontal: 10,
										paddingVertical: 10,
										marginHorizontal: 40,
										height: 60, // Set a fixed height for both containers,
										width: 300,
										marginBottom: 30,

									}}>
										<Text style={styles.label}>User Feedback:</Text>
										<Text style={{
											fontSize: 14,
										}}>Thank you for your prompt response!</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
						<Text
							style={{
								marginLeft: 40,
								marginBottom: 10,
								fontSize: 15,
								// Add any additional styles from GlobalStyle.headerFont
								marginBottom: 5,
								flex: 1, // Take up remaining space
							}}
						>
							Profile
						</Text>
						<View style={{
							flex: 1,
							borderBottomWidth: 2, // Adjust the thickness as desired
							borderBottomColor: COLORS.grey,
							marginLeft: -260, // Adjust the value to prevent overlapping
						}} />
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
						<TouchableOpacity
							onPress={() => { }}
							style={{
								marginLeft: 40,
								marginBottom: 10,
								backgroundColor: COLORS.grey,
								paddingHorizontal: 30,
								paddingVertical: 10,
								borderRadius: 20,
							}}
						>
							<Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>Venue Profile</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => { }}
							style={{
								marginLeft: 70,
								marginBottom: 10,
								backgroundColor: COLORS.grey,
								paddingHorizontal: 10,
								paddingVertical: 10,
								borderRadius: 20,
							}}
						>
							<Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>Manage Inventory</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
						<Text
							style={{
								marginLeft: 40,
								marginBottom: 10,
								fontSize: 15,
								// Add any additional styles from GlobalStyle.headerFont
								marginBottom: 5,
								flex: 1, // Take up remaining space
							}}
						>
							Social
						</Text>
						<View style={{
							flex: 1,
							borderBottomWidth: 2, // Adjust the thickness as desired
							borderBottomColor: COLORS.grey,
							marginLeft: -260, // Adjust the value to prevent overlapping
						}} />
					</View>
					<View style={{ flex: 1, padding: 16 }}></View>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
						<TouchableOpacity
							onPress={() => { }}
							style={{
								marginLeft: 40,
								marginBottom: 10,
								backgroundColor: COLORS.grey,
								paddingHorizontal: 30,
								paddingVertical: 10,
								borderRadius: 20,
							}}
						>
							<Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>Manage Social</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => { }}
							style={{
								marginLeft: 90,
								marginBottom: 10,
								backgroundColor: COLORS.grey,
								paddingHorizontal: 10,
								paddingVertical: 10,
								borderRadius: 20,
							}}
						>
							<View style={{ alignItems: 'center' }}>
								<Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>Manage</Text>
								<Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>Promotion</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{
						flex: 1,
						borderBottomWidth: 2,
						borderBottomColor: COLORS.grey,
						marginTop: 30,
					}} />

					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<View style={{ flex: 1, alignItems: 'center', width: '98%' }}>
							<View style={{ flex: 1, padding: 20, borderWidth: 1, borderColor: COLORS.grey, marginTop: 50, borderRadius: 20, width: '98%' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text
										style={{
											marginLeft: 10,
											marginBottom: 10,
											fontSize: 15,
											// Add any additional styles from GlobalStyle.headerFont
											marginBottom: 5,
											flex: 1, // Take up remaining space
										}}
									>
										Analytics
									</Text>
									<TouchableOpacity
										onPress={() => { }}
										style={{
											marginLeft: 40,
											marginBottom: 10,
											backgroundColor: COLORS.grey,
											paddingHorizontal: 10,
											paddingVertical: 5,
											borderRadius: 20,
										}}
									>
										<Text style={{ color: 'black', fontSize: 15 }}>See More</Text>
									</TouchableOpacity>
								</View>
								<View style={{ flex: 1, padding: 16 }}>
									<View style={{ padding: 16 }}>
										<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
											Beer Popularity this week
										</Text>
										<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
											{data.map((value, index) => (
												<View
													key={index}
													style={{
														width: 30,
														marginLeft: 10,
														alignItems: 'center',
													}}
												>
													<View
														style={{
															height: value * scaleY,
															width: 4,
															backgroundColor: 'blue',
														}}
													/>
													<Text style={{ fontSize: 12, marginTop: 5 }}>{labels[index]}</Text>
												</View>
											))}
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>

					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<View style={{ flex: 1, alignItems: 'center', width: '98%' }}>
							<View style={{ flex: 1, padding: 16, borderWidth: 1, borderColor: COLORS.grey, marginTop: 20, borderRadius: 20, width: '98%' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text
										style={{
											marginLeft: 10,
											marginBottom: 10,
											fontSize: 15,
											// Add any additional styles from GlobalStyle.headerFont
											marginBottom: 5,
											flex: 1, // Take up remaining space
										}}
									>
										Venue Comparison
									</Text>
									<TouchableOpacity
										onPress={() => { }}
										style={{
											marginLeft: 40,
											marginBottom: 10,
											backgroundColor: COLORS.grey,
											paddingHorizontal: 10,
											paddingVertical: 5,
											borderRadius: 20,
										}}
									>
										<Text style={{ color: 'black', fontSize: 15 }}>See More</Text>
									</TouchableOpacity>
								</View>
								<View style={{ flex: 1, padding: 16 }}>
									<View style={{ padding: 16 }}>
										<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
											Venue Popularity this week
										</Text>
										<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
											{data.map((value, index) => (
												<View
													key={index}
													style={{
														width: 30,
														marginLeft: 10,
														alignItems: 'center',
													}}
												>
													<View
														style={{
															height: value * scaleY,
															width: 4,
															backgroundColor: 'blue',
														}}
													/>
													<Text style={{ fontSize: 12, marginTop: 5 }}>{labels[index]}</Text>
												</View>
											))}
										</View>
									</View>
								</View>
							</View>
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
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default VenueOwnerHome;
