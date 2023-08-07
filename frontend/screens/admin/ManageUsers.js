import {
	Feather,
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ListItem, SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
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
					fontSize: 12,
					...GlobalStyle.bodyFont,
					...{ color: textColor },
				}}
			>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

const CustomButtonGroup = ({ buttons, selectedIndex, onPress }) => {
	return (
		<View style={styles.buttonGroupContainer}>
			{buttons.map((button, index) => (
				<TouchableOpacity
					key={index}
					style={[
						styles.button,
						selectedIndex === index && styles.selectedButton,
					]}
					onPress={() => onPress(index)}
				>
					<Text style={styles.buttonText}>{button}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const CustomText = (props) => {
	return (
		<Text style={{ ...GlobalStyle.bodyFont, ...props.style }}>
			{props.children}
		</Text>
	);
};

const ManageUsers = ({ navigation }) => {
	const data = [
		{ key: "1", value: "Manage Users" },
		{ key: "2", value: "Feedback" },
		{ key: "3", value: "View All" },
		{ key: "4", value: "Bugs and Reports" },
	];

	// Calculate the dropdown container height based on the number of options
	const dropdownContainerHeight = data.length * 50;

	const [search, setSearch] = useState("");

	const updateSearch = (search) => {
		setSearch(search);
	};

	const data1 = [
		{ name: "John", status: "Active" },
		{ name: "Bob", status: "Inactive" },
		{ name: "Mei", status: "Active" },
	];

	const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

	const handleButtonPress = (index) => {
		setSelectedButtonIndex(index);
	};

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
								Manage Users
							</Text>
							<View style={styles.searchContainer}>
								<TextInput
									placeholder="Search by ID"
									style={{ ...GlobalStyle.bodyFont, ...styles.searchInput }}
									onChangeText={updateSearch}
									value={search}
								/>
							</View>

							<View
								style={{
									flex: 1,
									justifyContent: "flex-end",
									alignItems: "flex-end",
								}}
							>
								<Button title="Create user" color={COLORS.foam} filled />
							</View>

							{/* Table */}
							<ScrollView horizontal>
								<DataTable>
									<DataTable.Header>
										<DataTable.Title
											style={{ justifyContent: "center", width: 150 }}
										>
											Username
										</DataTable.Title>
										<DataTable.Title
											style={{ justifyContent: "center", width: 150 }}
										>
											Status
										</DataTable.Title>
									</DataTable.Header>

									{data1.map((item, index) => (
										<DataTable.Row key={index}>
											<DataTable.Cell
												style={{ justifyContent: "center", width: 150 }}
											>
												{item.name}
											</DataTable.Cell>
											<DataTable.Cell
												style={{ justifyContent: "center", width: 150 }}
											>
												{item.status}
											</DataTable.Cell>
										</DataTable.Row>
									))}
								</DataTable>
							</ScrollView>

							<View style={{ marginTop: 20 }}>
								<CustomButtonGroup
									buttons={[
										"View Details",
										"Suspend",
										"Deactivate",
										"View Chat History",
									]}
									selectedIndex={selectedButtonIndex}
									onPress={handleButtonPress}
									selectedButtonStyle={styles.selectedButton}
								/>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginLeft: 5,
		marginTop: 12,
		alignItems: "center",
		marginHorizontal: 12,
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 12,
	},
	searchInput: {
		flex: 1,
		height: 45,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 20,
		paddingHorizontal: 20,
		marginRight: 10,
		backgroundColor: COLORS.grey,
	},
	tableContainer: {
		marginBottom: 20,
		paddingHorizontal: 12,
		maxHeight: 200,
	},
	button: {
		marginTop: 20,
		paddingVertical: 10,
		alignItems: "center",
		borderColor: COLORS.black,
		borderRadius: 20,
		width: "50%",
		alignSelf: "center",
	},
	buttonGroupContainer: {
		flexDirection: "row",
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "gray",
		backgroundColor: "transparent",
		justifyContent: "space-evenly",
		flexWrap: "wrap",
	},
	selectedButton: {
		backgroundColor: COLORS.foam,
	},
});

export default ManageUsers;
