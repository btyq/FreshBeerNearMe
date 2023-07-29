import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
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
import { SelectList } from "react-native-dropdown-select-list";

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

	const [venueProfile, setVenueProfile] = useState([])
	const [selectedVenue, setSelectedVenue] = useState(null);
	const [selectedVenueData, setSelectedVenueData] = useState([]);

	useEffect(() => {
		setUsername(cookies.username);
		axios
			.get("http://10.0.2.2:3000/getVenueProfile", {
				params: {
					venueOwnerID: cookies.venueOwnerID,
				}
			})
			.then((response) => {
				setVenueProfile(response.data);
			})
			.catch((error) => {
				console.error("Error retrieving Venue Profile", error);
			})
	}, []);

	useEffect(() => {
		const selectedVenueObject = venueProfile.find((venue) => venue.venueName === selectedVenue);
		if (selectedVenueObject) {
			setSelectedVenueData({ ...selectedVenueObject });
		} else {
			setSelectedVenueData(null);
		}
	}, [selectedVenue]);
	
	const handleUpdate = () => {
		const updateData = {
		  venueID: selectedVenueData.venueID,
		  venueName: selectedVenueData.venueName,
		  venueContact: selectedVenueData.venueContact,
		  venueAddress: selectedVenueData.venueAddress,
		  venueOperatingHours: selectedVenueData.venueOperatingHours,
		};
	  
		axios
		  .post("http://10.0.2.2:3000/updateVenue", updateData)
		  .then((response) => {
			if (response.data.success) {
			  Alert.alert("Successfully updated venue!");
			} else {
			  const { message } = response.data;
			  Alert.alert("Error!", message);
			}
		  })
		  .catch((error) => {
			console.error(error);
		  });
	};
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
						<TouchableOpacity onPress={()=>console.log(selectedVenueData)}>
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
				<View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
					<Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
						Venue Profile
					</Text>
					<View
						style={{
							position: "relative",
							zIndex: 1,
							marginBottom: 12,
						}}
					>
						<SelectList
							data={venueProfile.map((venue) => ({
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
					{selectedVenueData ? (
						<View>
							<Image
								source={{ uri: selectedVenueData.venueImage }}
								style={{ width: 200, height: 200, marginTop: 10 }}
							/>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 50,
								}}
							>
								<Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
									Name:
								</Text>
								<TextInput
									style={{
										marginLeft: 10,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: COLORS.black,
										padding: 5,
										width: 310,
									}}
									value={selectedVenueData.venueName}
									onChangeText={(value) =>
										setSelectedVenueData({ ...selectedVenueData, venueName: value })
									}
								/>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 30,
								}}
							>
								<Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
									Contact:
								</Text>
								<TextInput
									style={{
										marginLeft: 10,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: COLORS.black,
										padding: 5,
										width: 310,
									}}
									value={selectedVenueData.venueContact}
									onChangeText={(value) =>
										setSelectedVenueData({ ...selectedVenueData, venueContact: value })
									}
								/>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 30,
								}}
							>
								<Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
									Address:
								</Text>
								<TextInput
									style={{
										marginLeft: 10,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: COLORS.black,
										padding: 5,
										width: 310,
									}}
									value={selectedVenueData.venueAddress}
									onChangeText={(value) =>
										setSelectedVenueData({ ...selectedVenueData, venueAddress: value })
									}
								/>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 30,
								}}
							>
								<Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
									Operating Hours:
								</Text>
								<TextInput
									style={{
										marginLeft: 10,
										borderWidth: 1,
										borderRadius: 10,
										borderColor: COLORS.black,
										padding: 5,
										width: 310,
									}}
									value={selectedVenueData.venueOperatingHours}
									onChangeText={(value) =>
										setSelectedVenueData({ ...selectedVenueData, venueOperatingHours: value })
									}
								/>
							</View>
							<TouchableOpacity
									onPress={handleUpdate}
									style={{
										marginRight: 40,
										marginBottom: 10,
										backgroundColor: COLORS.grey,
										paddingHorizontal: 10,
										paddingVertical: 5,
										borderRadius: 20,
									}}
								>
									<Text style={{ color: "black", fontSize: 15 }}>Update</Text>
							</TouchableOpacity>					
						</View>
					) : (
						<Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 50 }}>
							Select a venue!
						</Text>
					)}	
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({});

export default InquiriesNFeedback;
