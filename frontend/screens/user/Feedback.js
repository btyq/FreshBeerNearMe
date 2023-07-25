import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
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
					fontSize: 14,
					textAlign: "center",
					flexWrap: "wrap",
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

const Feedback = ({ navigation }) => {
	const [activeButton, setActiveButton] = useState("issues"); // selected button
	const [issueDescription, setIssueDescription] = useState("");
	const [feedbackDescription, setFeedbackDescription] = useState("");
	const [venueData, setVenueData] = useState([]);
	const [selectedVenue, setSelectedVenue] = useState(null);
	const { cookies } = useCookies();

	const handleButton = (title) => {
		setActiveButton(title);
	};

	const handleSubmitIssue = () => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;

		const data = {
			userID: cookies.userID,
			issueDate: formattedDate,
			issueDescription: issueDescription,
		};

		axios
			.post("http://10.0.2.2:3000/submitIssue", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Issue submitted!");
					setIssueDescription("");
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleSubmitFeedback = () => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;

		const data = {
			userID: cookies.userID,
			venueName: selectedVenue,
			feedbackDate: formattedDate,
			feedbackDescription: feedbackDescription,
		};

		axios
			.post("http://10.0.2.2:3000/submitFeedback", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Feedback submitted!");
					setFeedbackDescription("");
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		const fetchVenueData = async () => {
			try {
				const response = await axios.get("http://10.0.2.2:3000/getVenueData");
				const { success, venueData } = response.data;
				if (success) {
					setVenueData(venueData);
				} else {
					console.error("Error retrieving venue data:", response.data.message);
				}
			} catch (error) {
				console.error("Error retrieving venue data:", error);
			}
		};

		fetchVenueData();
	}, []);

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
				<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
					<View style={{ marginHorizontal: 20 }}>
						<View style={{ flexDirection: "row", marginVertical: 18 }}>
							{/* for reporting issues */}
							<Button
								title="Report an issue"
								onPress={() => handleButton("issues")}
								style={
									activeButton === "issues"
										? styles.activeFilterButton
										: styles.filterButton
								}
							/>
							<Button
								title="Submit feedback & requests"
								onPress={() => handleButton("feedback")}
								style={
									activeButton === "feedback"
										? styles.activeFilterButton
										: styles.filterButton
								}
							/>
						</View>

						{/* for reporting issues */}
						{activeButton === "issues" ? (
							<SafeAreaView>
								<Text style={{ ...GlobalStyle.headerFont }}>
									Please describe the issue:
								</Text>
								<View
									style={{
										flexDirection: "column",
										height: 300,
										width: "100%",
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginTop: 10,
										borderRadius: 15,
										borderColor: 0,
										marginBottom: 10,
										paddingHorizontal: 12,
									}}
								>
									<View
										style={{
											flex: 1,
											borderColor: 0,
											borderWidth: 1,
											borderRadius: 12,
											resizeMode: "contain",
											paddingLeft: 12,
											marginTop: 15,
											backgroundColor: COLORS.grey,
										}}
									>
										<TextInput
											placeholder="Write your issues here"
											multiline
											style={{ ...GlobalStyle.bodyFont }}
											value={issueDescription}
											onChangeText={(text) => setIssueDescription(text)}
										></TextInput>
									</View>
								</View>
								<Button
									title="Submit"
									onPress={handleSubmitIssue}
									filled
									style={{
										elevation: 2,
										borderColor: 0,
										marginTop: 12,
									}}
								/>
							</SafeAreaView>
						) : (
							// for sending feedback
							activeButton === "feedback" && (
								<SafeAreaView>
									<Text style={{ ...GlobalStyle.headerFont }}>
										Select Venue:
									</Text>
									<View
										style={{
											position: "relative",
											zIndex: 1,
											marginBottom: 12,
										}}
									>
										<SelectList
											data={venueData.map((venue) => ({
												label: venue.venueName,
												value: venue.venueName,
											}))}
											value={selectedVenue}
											setSelected={(value) => setSelectedVenue(value)}
											boxStyles={{
												borderRadius: 12,
												borderColor: 0,
												backgroundColor: COLORS.grey,
												opacity: 1,
											}}
											dropdownStyles={{
												right: 0,
												borderColor: 0,
												backgroundColor: COLORS.grey,
												opacity: 1,
											}}
											defaultOption={selectedVenue}
											search={true}
										/>
									</View>
									<Text style={{ ...GlobalStyle.headerFont }}>
										Send us feedback / request:
									</Text>
									<View
										style={{
											flexDirection: "column",
											height: 300,
											width: "100%",
											elevation: 2,
											backgroundColor: COLORS.grey,
											marginTop: 10,
											borderRadius: 15,
											borderColor: 0,
											marginBottom: 10,
											paddingHorizontal: 12,
											position: "relative",
										}}
									>
										<View
											style={{
												flex: 1,
												borderColor: 0,
												borderWidth: 1,
												borderRadius: 12,
												resizeMode: "contain",
												paddingLeft: 12,
												marginTop: 15,
												backgroundColor: COLORS.grey,
											}}
										>
											<TextInput
												placeholder="Write your feedback here"
												multiline
												style={{ ...GlobalStyle.bodyFont }}
												value={feedbackDescription}
												onChangeText={(text) => setFeedbackDescription(text)}
											/>
										</View>
									</View>
									<Button
										title="Submit"
										onPress={handleSubmitFeedback}
										filled
										style={{
											elevation: 2,
											borderColor: 0,
											marginBottom: 12,
										}}
									/>
								</SafeAreaView>
							)
						)}
					</View>
				</ScrollView>
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
	activeFilterButton: {
		width: "50%",
		height: 60,
		marginVertical: 12,
		borderRadius: 20,
		marginRight: 5,
		borderColor: 0,
		elevation: 2,
		backgroundColor: COLORS.foam,
	},
	filterButton: {
		width: "50%",
		height: 60,
		marginVertical: 12,
		borderRadius: 20,
		marginRight: 5,
		borderColor: 0,
		elevation: 2,
		backgroundColor: COLORS.white,
	},
});

export default Feedback;
