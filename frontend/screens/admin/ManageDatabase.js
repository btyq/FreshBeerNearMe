import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
	Alert,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import {
	Cell,
	Col,
	Cols,
	Row,
	Rows,
	Table,
	TableWrapper,
} from "react-native-reanimated-table";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import GlobalStyle from "../../utils/GlobalStyle";
import axios from "axios";

const Button = (props) => {
	const filledBgColor = props.color || COLORS.primary;
	const outlinedColor = COLORS.white;
	const bgColor = props.filled ? filledBgColor : outlinedColor;
	const textColor = props.filled ? COLORS.black : COLORS.white;

	return (
		<TouchableOpacity
			style={{
				...styles.button,
				...{ backgroundColor: bgColor },
				...props.style,
			}}
			onPress={props.onPress}
		>
			<Text style={{ fontSize: 12, ...GlobalStyle.bodyFont, color: textColor }}>
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

const tableData1 = {
	tableData1: [
		["Name", "Style", "Brewery", "100%"],
		["Name", "Style", "Brewery", "100%"],
		["Name", "Style", "Brewery", "100%"],
		["Name", "Style", "Brewery", "100%"],
	],
};

const ManageDatabase = ({ navigation }) => {
	const [data2, setData2] = useState(tableData1);

	const [search, setSearch] = useState("");
	const [breweryData, setBreweryData] = useState("");
	const [selectedBrewery, setSelectedBrewery] = useState(null);
	const [editBreweryState, setEditBreweryState] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);

	const [breweryName, setBreweryName] = useState("");
	const [breweryAddress, setBreweryAddress] = useState("");
	const [breweryContact, setBreweryContact] = useState("");
	const [breweryImage, setBreweryImage] = useState("");
	const [breweryOperatingHours, setBreweryOperatingHours] = useState("");
	const [breweryLatitude, setBreweryLatitude] = useState("");
	const [breweryLongitude, setBreweryLongitude] = useState("");

    const handleOpenModal = (brewery) => {
        setSelectedBrewery(brewery);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedBrewery(null);
        setModalVisible(false);
    };

	const updateSearch = (search) => {
		setSearch(search);
	};

	const handleEditBrewery = () => {
		axios
			.post("http://10.0.2.2:3000/editBrewery", { selectedBrewery })
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Successfully editted brewery!")
					setModalVisible(false)
					setEditBreweryState(true)
				}
			})
			.catch((error) => {
				console.error(error);
			})
		
	}

	const handleAddBrewery = () => {
		const data = {
			breweryName : breweryName,
			breweryAddress : breweryAddress,
			breweryContact : breweryContact,
			breweryImage : breweryImage,
			breweryOperatingHours : breweryOperatingHours,
			breweryLatitude : breweryLatitude,
			breweryLongitude : breweryLongitude,
		}

		axios
			.post("http://10.0.2.2:3000/addBrewery", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Successfully added a new brewery data!")
					setBreweryName("")
					setBreweryAddress("")
					setBreweryContact("")
					setBreweryImage("")
					setBreweryOperatingHours("")
					setBreweryLatitude("")
					setBreweryLongitude("")
					setAddModalVisible(false)
				}
			})
			.catch((error) => {
				console.error("Error adding new brewery data", error)
			})
	}

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getBrewery")
			.then((response) => {
				setBreweryData(response.data);
				setEditBreweryState(false)
			})
			.catch((error) => {
				console.error("Error retrieving brewery Data", error)
			})
	}, [editBreweryState])

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
						<View style={{ flexDirection: "row" }}>
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
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity>
								<Ionicons
									name="notifications-outline"
									size={24}
									color={COLORS.black}
									style={{ marginRight: 10 }}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
								<MaterialIcons name="logout" size={24} color={COLORS.black} />
							</TouchableOpacity>
						</View>
					}
				/>

				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView>
						<View style={{ marginHorizontal: 22 }}>
							<Text
								style={{
									fontSize: 18,
									...GlobalStyle.headerFont,
									marginBottom: 12,
								}}
							>
								Manage Brewery
							</Text>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
									alignItems: "flex-end",
								}}
							>
								<Button
									title="Add Brewery"
									color={COLORS.foam}
									filled
									style={{
										marginTop: 10,
										marginBottom: 4,
										elevation: 2,
										width: "40%",
									}}
									onPress={() => setAddModalVisible(true)}
								/>
							</View>

							<View style={{ marginTop: 20, justifyContent: "center" }}>
								{breweryData.length === 0 ? (
									<Text style={{ ...GlobalStyle.bodyFont, textAlign: "center" }}>
										No data available.
									</Text>
								) : (
									<Table borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}>
										<Row
											data={["Brewery name", "Address", "Contact", "Action"]}
											style={styles.head}
											textStyle={{ textAlign: "center", ...GlobalStyle.headerFont }}
										/>
										<Rows
											data={breweryData.map((brewery) => [
												brewery.breweryName,
												brewery.breweryAddress,
												brewery.breweryContact,
												<TouchableOpacity onPress={() => handleOpenModal(brewery)}>
													<Text>View More</Text>
												</TouchableOpacity>
												
											])}
											textStyle={{ ...GlobalStyle.bodyFont, textAlign: "center" }}
										/>
									</Table>
								)}
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</SafeAreaView>
			<Modal visible={modalVisible} animationType="slide">
				<View>
					<Text>Brewery Details</Text>
					{selectedBrewery ? (
						<View>
						<Text>Add Brewery</Text>
						<View>
							<Text>Brewery Name:</Text>
							<TextInput
								value={selectedBrewery.breweryName}
								onChangeText={(text) => setSelectedBrewery({ ...selectedBrewery, breweryName: text})}
							/>
						</View>
						<View>
							<Text>Brewery Address:</Text>
							<TextInput
								value={selectedBrewery.breweryAddress}
								onChangeText={(text) => setSelectedBrewery({ ...selectedBrewery, breweryAddress: text})}
							/>
						</View>
						<View>
							<Text>Brewery Contact:</Text>
							<TextInput
								value={selectedBrewery.breweryContact}
								onChangeText={(text) => setSelectedBrewery({ ...selectedBrewery, breweryContact: text})}
							/>
						</View>
						<View>
							<Text>Brewery Image:</Text>
							<TextInput
								value={selectedBrewery.breweryImage}
								onChangeText={(text) => setSelectedBrewery({ ...selectedBrewery, breweryImage: text})}
							/>
						</View>
						<View>
							<Text>Brewery Operating Hours:</Text>
							<TextInput
								value={selectedBrewery.breweryOperatingHours}
								onChangeText={(text) => setSelectedBrewery({ ...selectedBrewery, breweryOperatingHours: text})}
							/>
						</View>					
					</View>
					) : (
						<Text>No brewery data available.</Text>
					)}
					<Button
						title="Edit"
						filled
						style={{
							width: "40%",
							height: 50,
							borderRadius: 10,
							marginLeft: 10,
						}}
						onPress={handleEditBrewery}
					/>
					<Button
						title="Close"
						filled
						style={{
							width: "40%",
							height: 50,
							borderRadius: 10,
							marginLeft: 10,
						}}
						onPress={handleCloseModal}
					/>
				</View>
			</Modal>

			<Modal visible={addModalVisible} animationType="slide">
				<View>
					<Text>Add Brewery</Text>
					<View>
						<Text>Brewery Name:</Text>
						<TextInput
							onChangeText={(text) => setBreweryName(text)}
							placeholder="Brewery Name"
						/>
					</View>
					<View>
						<Text>Brewery Address:</Text>
						<TextInput
							onChangeText={(text) => setBreweryAddress(text)}
							placeholder="Brewery Address"
						/>
					</View>
					<View>
						<Text>Brewery Contact:</Text>
						<TextInput
							onChangeText={(text) => setBreweryContact(text)}
							placeholder="Brewery Contact"
						/>
					</View>
					<View>
						<Text>Brewery Image:</Text>
						<TextInput
							onChangeText={(text) => setBreweryImage(text)}
							placeholder="Brewery Image Link"
						/>
					</View>
					<View>
						<Text>Brewery Operating Hours:</Text>
						<TextInput
							onChangeText={(text) => setBreweryOperatingHours(text)}
							placeholder="Brewery Operating Hours"
						/>
					</View>
					<View>
						<Text>Brewery's Latitude Coordinates:</Text>
						<TextInput
							onChangeText={(text) => setBreweryLatitude(parseFloat(text))}
							placeholder="Brewerys Latitude Coordinates"
						/>
					</View>
					<View>
						<Text>Brewery's Longitude Coordinates:</Text>
						<TextInput
							onChangeText={(text) => setBreweryLongitude(parseFloat(text))}
							placeholder="Brewery's Longitude Coordinates"
						/>
					</View>									
					<Button
						title="Add"
						filled
						style={{
							width: "40%",
							height: 50,
							borderRadius: 10,
							marginLeft: 10,
						}}
						onPress={handleAddBrewery}
					/>
					<Button
						title="Close"
						filled
						style={{
							width: "40%",
							height: 50,
							borderRadius: 10,
							marginLeft: 10,
						}}
						onPress={() => setAddModalVisible(false)}
					/>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		borderColor: COLORS.black,
		borderWidth: 0,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	head: {
		height: 44,
		backgroundColor: COLORS.foam,
	},
});

export default ManageDatabase;
