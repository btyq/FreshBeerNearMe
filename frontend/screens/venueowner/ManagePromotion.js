import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Modal,
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
import ImagePicker from "react-native-image-picker";
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

const ManagePromotion = ({ navigation }) => {
	const { cookies } = useCookies();
	const [eventData, setEventData] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	
	const navigateToCreatePromotion = () => {
		navigation.navigate("CreatePromotion");
	};

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const handleRemove = (eventID) => {
		const data = {
			eventID: eventID,
		}
		axios
			.post("http://10.0.2.2:3000/removeEvent", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Successfully removed event!")
					toggleModal();
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message);
					toggleModal();
				}
			})
			.catch((error) => {
				console.error(error);
			})
	};

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getEvent", {
				params: {
					venueOwnerID: cookies.venueOwnerID,
				}
			})
			.then((response) => {
				setEventData(response.data);
			})
			.catch((error) => {
				console.error("Error retrieving Event", error);
			})
	}, [handleRemove])
	//=====================================================================================================
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
					<TouchableOpacity onPress={() => console.log(eventData)}>
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
				<View style={styles.container}>
					{eventData.map((event, index) => (
						<View key={index} style={styles.eventCard}>
						<Text>Title: {event.eventTitle}</Text>
						<Text>Date: {event.eventDate}</Text>
						<Text>
							Description: {event.eventDescription}
						</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								setSelectedEvent(event); // Set the selected event for removal
								toggleModal(); // Open the modal
							}}
						>
							<Text style={styles.buttonText}>Remove</Text>
						</TouchableOpacity>
						</View>						
					))}
					<TouchableOpacity
						style={styles.button}
						onPress={navigateToCreatePromotion}
					>
						<Text style={styles.buttonText}>Create</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Modal
				visible={isModalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={toggleModal}
			>
				<View style={styles.modalContainer}>
					<Card style={{ padding: 20, width: "80%" }}>
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>
							Confirm Removal
						</Text>
						<Text>Title: {selectedEvent?.eventTitle}</Text>
						<Text>Date: {selectedEvent?.eventDate}</Text>
						<Text>Description: {selectedEvent?.eventDescription}</Text>
						<View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
							<Button title="Cancel" onPress={toggleModal} />
							<Button
								title="Remove"
								color={COLORS.danger}
								onPress={() => {
									handleRemove(selectedEvent.eventID)
								}}
							/>
						</View>
					</Card>
				</View>
			</Modal>
		</View>
	);
};
	
const styles = StyleSheet.create({
	container: {
	width: "95%",
	alignSelf: "center",
	marginTop: 10,
	},
	eventCard: {
	borderWidth: 1,
	borderColor: COLORS.black,
	borderRadius: 10,
	padding: 10,
	marginBottom: 10,
	},
	eventTitle: {
	fontSize: 16,
	fontWeight: "bold",
	},
	eventDate: {
	fontSize: 16,
	fontWeight: "bold",
	},
	eventDescription: {
	fontSize: 16,
	},
	button: {
	backgroundColor: COLORS.grey,
	paddingHorizontal: 20,
	paddingVertical: 10,
	borderRadius: 20,
	alignSelf: "center",
	marginVertical: 10,
	},
	buttonText: {
	color: COLORS.black,
	fontSize: 16,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: COLORS.overlay,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ManagePromotion;
