import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
	Modal,
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

const ManageInventory = ({ navigation }) => {
	const { cookies } = useCookies();
	const [index, setIndex] = React.useState(0);
	const [index1, setIndex1] = React.useState(0);
	const [username, setUsername] = useState("");

	const [venueProfile, setVenueProfile] = useState([]);
	const [selectedVenue, setSelectedVenue] = useState(null);
	const [selectedVenueData, setSelectedVenueData] = useState([]);
	const [selectedVenueMenu, setSelectedVenueMenu] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [beerName, setBeerName] = useState("");
	const [beerDescription, setBeerDescription] = useState("");
	const [beerImage, setBeerImage] = useState("");
	const [beerCategory, setBeerCategory] = useState("");
	const beerCategories = ["Lager", "Stout", "Porter", "IPA", "Pale Ale"];
	const [abv, setAbv] = useState("");
	const [ibu, setIbu] = useState("");
	const [price, setPrice] = useState("");

	useEffect(() => {
		setUsername(cookies.username);
		axios
			.get("http://10.0.2.2:3000/getVenueProfile", {
				params: {
					venueOwnerID: cookies.venueOwnerID,
				},
			})
			.then((response) => {
				setVenueProfile(response.data);
			})
			.catch((error) => {
				console.error("Error retrieving Venue Profile", error);
			});
	}, []);

	useEffect(() => {
		const selectedVenueObject = venueProfile.find(
			(venue) => venue.venueName === selectedVenue
		);
		if (selectedVenueObject) {
			setSelectedVenueData({ ...selectedVenueObject });
		} else {
			setSelectedVenueData(null);
		}
	}, [selectedVenue]);

	useEffect(() => {
		if (selectedVenueData && selectedVenueData.venueMenu) {
			axios
				.get("http://10.0.2.2:3000/getVenueMenu", {
				params: {
					venueMenu: selectedVenueData.venueMenu,
					},
				})
				.then((response) => {
					setSelectedVenueMenu(response.data);
				})
				.catch((error) => {
					console.error("Error retrieving Venue Menu", error);
				});
		}
	}, [selectedVenueData]);

	const handleEdit = (beerID, beerName, abv, ibu, price) => {
		const data = {
			beerID: beerID,
			beerName: beerName,
			abv: abv,
			ibu: ibu,
			price: price
		}

		axios
			.post("http://10.0.2.2:3000/editVenueMenu", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Successfully editted item!")
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message)
				}
			})
			.catch((error) => {
				console.error(error);
			})
	};

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible);
	};

	const addProduct = (beerName, beerLocation, beerDescription, beerImage, beerCategory, abv, ibu, price) => {
		const data = {
			beerName: beerName,
			beerLocation: beerLocation,
			beerDescription: beerDescription,
			beerImage: beerImage,
			beerCategory: beerCategory,
			abv: abv,
			ibu: ibu,
			price: price
		}

		axios
			.post("http://10.0.2.2:3000/addVenueMenu", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Success!")
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message)
				}
			})
			.catch((error) => {
				console.error(error);
			})
	}

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
						<TouchableOpacity onPress={()=>console.log(selectedVenueMenu)}>
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
				<View style={{ alignItems: "center", marginTop: 20 }}>
					<Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
						Manage Inventory
					</Text>
				</View>
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
				{selectedVenueData ? (
					selectedVenueMenu.map((menuItem) => (						
						<View
							key={menuItem.beerID}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginTop: 5,
								marginBottom: 10,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 10,
								}}
							>
								<Image
									source={{uri: menuItem.beerImage}}
									style={{
										width: 140,
										height: 140,
										marginLeft: 20,
										borderRadius: 10,
									}}
								/>

								<View
									style={{
										marginLeft: 10,
										borderWidth: 1,
										borderColor: COLORS.black,
										borderRadius: 10,
										padding: 10,
										width: 240,
									}}
								>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "bold",
												marginBottom: 5,
											}}
										>
											Name:
										</Text>
										<TextInput
											style={{
												borderWidth: 1,
												borderColor: COLORS.black,
												borderRadius: 10,
												padding: 5,
												marginBottom: 10,
												marginTop: 5,
												marginLeft: 5,
												width: "76%",
											}}
											value={menuItem.beerName}
											onChangeText={(text) => {
												setSelectedVenueMenu((prevMenu) =>
												  prevMenu.map((item) =>
													item.beerID === menuItem.beerID ? { ...item, beerName: text } : item
												  )
												);
											}}
										> 
										</TextInput>
									</View>

									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "bold",
												marginBottom: 5,
											}}
										>
											ABV:
										</Text>
										<TextInput
											style={{
												borderWidth: 1,
												borderColor: COLORS.black,
												borderRadius: 10,
												padding: 5,
												marginBottom: 10,
												marginTop: 5,
												marginLeft: 5,
												width: "50%",
											}}
											value={menuItem.abv.toString()}
											onChangeText={(text) => {
												setSelectedVenueMenu((prevMenu) =>
												  prevMenu.map((item) =>
													item.beerID === menuItem.beerID ? { ...item, abv: text } : item
												  )
												);
											}}
										>
										</TextInput>
									</View>

									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "bold",
												marginBottom: 5,
											}}
										>
											IBU
										</Text>
										<TextInput
											style={{
												borderWidth: 1,
												borderColor: COLORS.black,
												borderRadius: 10,
												padding: 5,
												marginBottom: 10,
												marginTop: 5,
												marginLeft: 5,
												width: "80%",
											}}
											value={menuItem.ibu.toString()}
											onChangeText={(text) => {
												setSelectedVenueMenu((prevMenu) =>
												  prevMenu.map((item) =>
													item.beerID === menuItem.beerID ? { ...item, ibu: text } : item
												  )
												);
											}}
										>
										</TextInput>
									</View>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "bold",
												marginBottom: 5,
											}}
										>
											Price
										</Text>
										<TextInput
											style={{
												borderWidth: 1,
												borderColor: COLORS.black,
												borderRadius: 10,
												padding: 5,
												marginBottom: 10,
												marginTop: 5,
												marginLeft: 5,
												width: "80%",
											}}
											value={menuItem.price.toString()}
											onChangeText={(text) => {
												setSelectedVenueMenu((prevMenu) =>
												  prevMenu.map((item) =>
													item.beerID === menuItem.beerID ? { ...item, price: text } : item
												  )
												);
											}}
										>											
										</TextInput>
									</View>
									<TouchableOpacity
										style={{
											alignItems: "center",
											backgroundColor: COLORS.grey,
											paddingHorizontal: 5,
											paddingVertical: 3,
											borderRadius: 10,
											marginTop: 10,
											borderWidth: 1,
											borderColor: COLORS.black,
										}}
										onPress={() => handleEdit(menuItem.beerID, menuItem.beerName, menuItem.abv, menuItem.ibu, menuItem.price)}
									>
										<Text
											style={{
												color: COLORS.black,
												fontWeight: "bold",
												fontSize: 16,
											}}
										>
											Edit
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))
					) : (
					<View>
						<Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
						Select a venue!
						</Text>
					</View>
					)}
				{selectedVenueData && (
					<TouchableOpacity
						style={{
							alignItems: "center",
							backgroundColor: COLORS.grey,
							paddingHorizontal: 5,
							paddingVertical: 3,
							borderRadius: 10,
							marginTop: 10,
							borderWidth: 1,
							borderColor: COLORS.black,
						}}
						onPress={toggleModal}
					>
						<Text
							style={{
							color: COLORS.black,
							fontWeight: "bold",
							fontSize: 16,
							}}
						>
							Add New Product
						</Text>
					</TouchableOpacity>
				)}
				<Modal
					animationType="slide"
					transparent={true}
					visible={isModalVisible}
					>
					<View
						style={{
						width: "100%",
						height: "100%",
						backgroundColor: COLORS.secondary,
						borderRadius: 10,
						paddingHorizontal: 20,
						elevation: 5,
						}}
					>
						<TextInput
							style={styles.textInput}
							placeholder="Beer Name"
							value={beerName}
							onChangeText={setBeerName}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="Beer Description"
							value={beerDescription}
							onChangeText={setBeerDescription}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="Beer Image URL"
							value={beerImage}
							onChangeText={setBeerImage}
						/>
						<SelectList
							data={beerCategories.map((category) => ({
								label: category,
								value: category,
							}))}
							value={beerCategory}
							setSelected={setBeerCategory}
							boxStyles={{
								borderWidth: 1,
								borderColor: COLORS.black,
								borderRadius: 10,
								padding: 5,
								marginBottom: 10,
							}}
							dropdownStyles={{
								borderColor: COLORS.black,
								borderRadius: 10,
								padding: 5,
							}}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="ABV"
							value={abv}
							onChangeText={setAbv}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="IBU"
							value={ibu}
							onChangeText={setIbu}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="Price"
							value={price}
							onChangeText={setPrice}
						/>
						<TouchableOpacity
						style={{
							alignItems: "center",
							backgroundColor: COLORS.grey,
							paddingHorizontal: 5,
							paddingVertical: 3,
							borderRadius: 10,
							marginTop: 10,
							borderWidth: 1,
							borderColor: COLORS.black,
						}}
						onPress={() => addProduct(beerName, selectedVenueData.venueID, beerDescription, beerImage, beerCategory, abv, ibu, price)}
						>
						<Text
							style={{
							color: COLORS.black,
							fontWeight: "bold",
							fontSize: 16,
							}}
						>
							Add Product
						</Text>
						</TouchableOpacity>
						<TouchableOpacity
						style={{
							alignItems: "center",
							backgroundColor: COLORS.grey,
							paddingHorizontal: 5,
							paddingVertical: 3,
							borderRadius: 10,
							marginTop: 10,
							borderWidth: 1,
							borderColor: COLORS.black,
						}}
						onPress={toggleModal}
						>
						<Text
							style={{
							color: COLORS.black,
							fontWeight: "bold",
							fontSize: 16,
							}}
						>
							Close
						</Text>
						</TouchableOpacity>
					</View>
				</Modal>								
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
});

export default ManageInventory;
