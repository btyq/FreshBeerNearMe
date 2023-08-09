import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
	Modal,
	Alert,
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

const tableData1 = {
	tableHead1: ["Username", "Status", "Actions"],
	tableData1: [
		["John", "Active", "Edit Account "],
		["Doe", "Inactive", "Edit Account"],
		["Mary", "Active", "Edit Account"],
	],
};

const ManageUsers = ({ navigation }) => {
	const [data2, setData2] = useState(tableData1);
	const [userData, setUserData] = useState({
		admins: [],
		users: [],
		venueOwners: [],
	});
	const [search, setSearch] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isCreateUserModalVisible, setIsCreateUserModalVisible] = useState(false);

	const updateSearch = (search) => {
		setSearch(search);
	};

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getUser")
			.then((response) => {
				setUserData(response.data)
			})
			.catch((error) => {
				console.error("Error retrieving User Data", error);
			})
	}, [])

	const generateTableData = () => {
        const combinedData = [...userData.admins, ...userData.users, ...userData.venueOwners];
        
        return combinedData.map((user) => [
            user.username,
            user.adminID ? "Admin" : user.venueOwnerID ? "Venue Owner" : "User",
			<TouchableOpacity onPress={() => {
				setSelectedUser(user);
				setIsModalVisible(true);
			  }}>
				<Text>Edit Account</Text>
			</TouchableOpacity>
        ]);
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
							<TouchableOpacity onPress={() => console.log(userData)}>
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
									placeholder="Search user"
									style={{ ...GlobalStyle.bodyFont, ...styles.searchInput }}
									onChangeText={updateSearch}
									value={search}
								/>
							</View>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
									alignItems: "flex-end",
								}}
							>
								<Button
									title="Create user"
									color={COLORS.foam}
									filled
									style={{
										marginTop: 10,
										marginBottom: 4,
										elevation: 2,
										width: "30%",
									}}
									onPress={() => {setIsCreateUserModalVisible(true)}}
								/>
							</View>

							<View style={{ marginTop: 20, justifyContent: "center" }}>
								<Table borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}>
									<Row
										data={["Username", "Account Type", "Actions"]} // Modified labels
										style={styles.head}
										textStyle={{ textAlign: "center", ...GlobalStyle.headerFont }}
									/>
									<Rows
										data={generateTableData()}
										textStyle={{ ...GlobalStyle.bodyFont, textAlign: "center" }}
									/>
								</Table>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
				<Modal
					visible={isModalVisible}
					animationType="slide"
					transparent
					onRequestClose={() => setIsModalVisible(false)}
					>
					{selectedUser && (
						<View style={styles.modalContainer}>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Username:</Text>
							<TextInput
							style={styles.input}
							value={selectedUser.username}
							onChangeText={(text) => setSelectedUser({ ...selectedUser, username: text })}
							placeholder="Username"
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Account Type:</Text>
							<TextInput
							style={styles.input}
							value={selectedUser.adminID ? "Admin" : selectedUser.venueOwnerID ? "Venue Owner" : "User"}
							onChangeText={() => {}}
							editable={false}
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Password:</Text>
							<TextInput
							style={styles.input}
							value={selectedUser.password}
							onChangeText={(text) => setSelectedUser({ ...selectedUser, password: text })}
							placeholder="Password"
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Email:</Text>
							<TextInput
							style={styles.input}
							value={selectedUser.email}
							onChangeText={(text) => setSelectedUser({ ...selectedUser, email: text })}
							placeholder="Email"
							keyboardType="email-address"
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Mobile Number:</Text>
							<TextInput
							style={styles.input}
							value={selectedUser.mobileNumber}
							onChangeText={(text) => setSelectedUser({ ...selectedUser, mobileNumber: text })}
							placeholder="Mobile Number"
							keyboardType="numeric"
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>
							{selectedUser.userID
								? 'Refferal Code:'
								: selectedUser.venueOwnerID
								? 'Owned VenueID:'
								: ''}
							</Text>
							<TextInput
							style={styles.input}
							value={
								selectedUser.userID
								? selectedUser.referralCode
								: selectedUser.venueOwnerID
								? selectedUser.venueID
								: ''
							}
							onChangeText={(text) => {
								if (selectedUser.userID) {
								setSelectedUser({ ...selectedUser, referralCode: text });
								} else if (selectedUser.venueOwnerID) {
								
								}
							}}
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>
								{selectedUser.userID ? 'Refferal Points:' : ''}
							</Text>
							<TextInput
								style={styles.input}
								value={
								selectedUser.userID
									? selectedUser.referralPoints.toString()
									: ''
								}
								onChangeText={(text) => {
								if (selectedUser.userID) {
									setSelectedUser({ ...selectedUser, referralPoints: parseInt(text) });
								}
								}}
							/>
						</View>
						<Button
							title="Close"
							color={COLORS.foam}
							filled
							onPress={() => setIsModalVisible(false)}
							style={{ marginTop: 20 }}
						/>
						</View>
					)}
				</Modal>

				<Modal
					visible={isCreateUserModalVisible}
					animationType="slide"
					transparent
					onRequestClose={() => setIsCreateUserModalVisible(false)}
					>
					<View style={styles.modalContainer}>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Username:</Text>
							<TextInput
								style={styles.input}
								placeholder="Username"
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Password:</Text>
							<TextInput
								style={styles.input}
								placeholder="Password"
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Email:</Text>
							<TextInput
								style={styles.input}
								placeholder="Email"
							/>
						</View>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Mobile Number:</Text>
							<TextInput
								style={styles.input}
								placeholder="Mobile Number"
							/>
						</View>
						<Button
						title="Close"
						color={COLORS.foam}
						filled
						onPress={() => setIsCreateUserModalVisible(false)}
						style={{ marginTop: 20 }}
						/>
					</View>
				</Modal>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
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
	head: {
		height: 44,
		backgroundColor: COLORS.foam,
	},
	button: {
		paddingVertical: 10,
		borderColor: COLORS.black,
		borderWidth: 0,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	modalContainer: {
		backgroundColor: COLORS.white,
		padding: 20,
		borderRadius: 10,
		alignSelf: 'center',
		marginTop: '50%',
		width: '80%',
	},
});

export default ManageUsers;
