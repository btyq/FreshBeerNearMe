import { Ionicons, Octicons } from "@expo/vector-icons";
import DatePicker from "@react-native-community/datetimepicker";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCookies } from "../../CookieContext";
import COLORS from "../../constants/colors";
import GlobalStyle from "../../utils/GlobalStyle";
import axios from "axios";

const CreatePromotion = ({ navigation }) => {
	const { cookies } = useCookies();
	const [title, setTitle] = useState("");
	const [date, setDate] = useState(new Date());
	const [description, setDescription] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	
	const handleClearButton = () => {
		setTitle("");
		setDate(new Date());
		setDescription("");
	};

	const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDatePicker(false);

		const today = new Date().setHours(0, 0, 0, 0);

		if (currentDate < today) {
			setDate(new Date());
			setErrorMessage("Date cannot be set earlier than today");
		} 
		 else {
			setDate(currentDate);
			setErrorMessage("");
		}
	};

	const showDatePickerModal = () => {
		setShowDatePicker(true);
	};

	const formatDate = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	const handleSubmit = () => {
		const data = {
			eventTitle: title,
			eventDate: formatDate(date),
			eventDescription: description,
			eventCreator: cookies.venueOwnerID,
		}

		axios
			.post("http://10.0.2.2:3000/addEvent", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Successfully created event!")
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message)
				}
			})
			.catch((error) => {
				console.error(error);
			})
	};

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ marginTop: 20, marginLeft: 10 }}>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
						style={{
							backgroundColor: COLORS.grey,
							borderRadius: 10,
							paddingHorizontal: 8,
							paddingVertical: 5,
							borderWidth: 1,
							borderColor: COLORS.black,
							alignSelf: "flex-start",
						}}
					>
						<Text style={{ color: "black", fontSize: 15 }}>Back</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
				>
					<Text
						style={{
							marginLeft: 20,
							marginBottom: 10,
							fontSize: 17,
							marginBottom: 5,
							flex: 1,
						}}
					>
						Create Post
					</Text>
					<View
						style={{
							flex: 1,
							borderBottomWidth: 1,
							borderBottomColor: COLORS.black,
							marginLeft: -150,
						}}
					/>
				</View>
				<View
					style={{
						width: "95%",
						alignSelf: "center",
						marginTop: 10,
						borderWidth: 1,
						borderRadius: 10,
						padding: 10,
					}}
				>
					<Text style={{ fontSize: 16, fontWeight: "bold" }}>Title</Text>
					<TextInput
						style={{
							height: 40,
							backgroundColor: "white",
							borderRadius: 5,
							paddingHorizontal: 5,
							borderWidth: 1,
							borderRadius: 10,
						}}
						onChangeText={(text) => setTitle(text)}
						value={title}
					/>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 10,
						}}
					>
						<Text style={{ fontSize: 16, fontWeight: "bold", marginRight: 10 }}>
							Date
						</Text>
						{/* Error message */}
						{errorMessage ? (
							<Text style={styles.errorMessage}>{errorMessage}</Text>
						) : null}
					</View>

					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TextInput
							style={{
								flex: 1,
								height: 40,
								backgroundColor: "white",
								borderRadius: 5,
								paddingHorizontal: 5,
								borderWidth: 1,
								borderRadius: 10,
							}}
							value={formatDate(date)}
							placeholder="DD/MM/YYYY"
							onChangeText={(text) => {
								// Validate and set the date
								const [day, month, year] = text.split("/");
								const parsedDate = new Date(`${year}-${month}-${day}`);
								if (!isNaN(parsedDate.getTime())) {
									setDate(parsedDate);
									setErrorMessage("");
								} else {
									setErrorMessage("Invalid date format");
								}
							}}
						/>
						<TouchableOpacity
							onPress={showDatePickerModal}
							style={{ marginLeft: 5 }}
						>
							<Ionicons name="calendar" size={24} color={COLORS.black} />
						</TouchableOpacity>
					</View>
					{showDatePicker && (
						<DatePicker
							value={date}
							mode="date"
							display="default"
							onChange={handleDateChange}
						/>
					)}

					<Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
						Description
					</Text>
					<TextInput
						style={{
							height: 150,
							backgroundColor: "white",
							borderRadius: 5,
							paddingHorizontal: 5,
							borderWidth: 1,
							borderRadius: 5,
							textAlignVertical: "top",
						}}
						onChangeText={(text) => setDescription(text)}
						value={description}
						multiline={true}
						numberOfLines={5}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 10,
						marginBottom: 10,
						marginLeft: 10,
						marginRight: 10,
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.grey,
							paddingHorizontal: 20,
							paddingVertical: 10,
							borderRadius: 20,
							marginLeft: 50,
							borderWidth: 1,
							borderRadius: 20,
						}}
						onPress={handleClearButton}
					>
						<Text style={{ color: COLORS.black, fontSize: 16 }}>Clear</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							backgroundColor: COLORS.grey,
							paddingHorizontal: 20,
							paddingVertical: 10,
							borderRadius: 20,
							marginRight: 50,
							borderWidth: 1,
							borderRadius: 20,
						}}
						onPress={handleSubmit}
					>
						<Text style={{ color: COLORS.black, fontSize: 16 }}>Submit</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	textInput: {
		borderWidth: 1,
		borderColor: COLORS.black,
		borderRadius: 5,
		padding: 5,
		marginBottom: 10,
	},
	errorMessage: {
		color: COLORS.red,
		marginTop: 5,
		marginLeft: 10,
		fontStyle: "italic",
	},
});

export default CreatePromotion;
