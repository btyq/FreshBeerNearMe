import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Row, Rows, Table } from "react-native-table-component";
import { Feather } from "react-native-vector-icons";
import { useCookies } from "../CookieContext";
import COLORS from "../constants/colors";

//CODES TO STYLE BUTTON
const Button = (props) => {
	const filledBgColor = props.color || COLORS.yellow;
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
			<Text style={{ fontSize: 15, ...{ color: textColor } }}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

const tableData = {
	tableHead: ["Case Number", "Description", "Status"],
	tableData: [
		["4", "Hi", "Pending"],
		["2", "Hihi", "Active"],
		["1", "Hihihi", "Inactive"],
	],
};

const tableData1 = {
	tableHead1: ["Request Number", "Requests", "Status"],
	tableData1: [
		["3", "Yes", "Pending"],
		["1", "Yes", "Pending"],
		["2", "Yes", "Done"],
	],
};

const AdminLogin = ({ navigation }) => {
	const { cookies } = useCookies();
	// for dropdown select list
	const [selected, setSelected] = React.useState("");

	const data = [
		{ key: "1", value: "Dashboard" },
		{ key: "2", value: "Reported Bugs" },
		{ key: "3", value: "Feature Requests" },
		{ key: "4", value: "User Management" },
		{ key: "5", value: "Database Management" },
		{ key: "6", value: "Content Management" },
	];

	// for table data
	const [data1, setData] = useState(tableData);

	const [data2, setData2] = useState(tableData1);

	// for selectlist navigation

	const handleGoPress = () => {
		// perform the navigation based on the selected option
		switch (selected) {
			case 1:
				navigation.navigate({ screen: "./frontend/components/AdminDashboard" });
				break;
			case 4:
				navigation.navigate({ screen: "./frontend/components/ManageUsers" });
				break;
			default:
				break;
		}
		console.log("Navigation performed:", selected);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LinearGradient
				style={{ flex: 1 }}
				colors={[COLORS.white, COLORS.yellow]}
			>
				<ScrollView
					style={{ flex: 1, marginHorizontal: 0 }}
					contentContainerStyle={{ padding: 0 }}
				>
					<Header
						placement="left"
						backgroundColor={COLORS.foam}
						centerComponent={{
							text: "FreshBeer",
							style: {
								fontSize: 20,
								color: COLORS.black,
								fontWeight: "bold",
								flexDirection: "row",
							},
						}}
						rightComponent={
							<TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
								<Feather name="log-out" size={24} color={COLORS.black} />
							</TouchableOpacity>
						}
					/>

					<View
						style={{
							flex: 1,
							marginHorizontal: 12,
							marginVertical: 22,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={{ fontSize: 25, fontWeight: "700", color: COLORS.black }}
						>
							Welcome!
						</Text>

						<View
							style={{
								flexDirection: "row",
								paddingHorizontal: 20,
								paddingVertical: 20,
								flex: 1,
								zIndex: 1,
							}}
						>
							<View style={{ flex: 3, marginRight: 10 }}>
								<SelectList
									data={data}
									setSelected={setSelected}
									boxStyles={{
										borderRadius: 20,
										width: 200,
										opacity: 1,
									}}
									dropdownStyles={{
										position: "absolute",
										top: "100%",
										width: 200,
										backgroundColor: COLORS.white,
										opacity: 1,
									}}
									defaultOption={{ key: "1", value: "Dashboard" }}
									search={false}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<Pressable onPress={handleGoPress}>
									<Text
										style={{
											color: COLORS.black,
											marginLeft: 4,
										}}
									>
										Go
									</Text>
								</Pressable>
								{/*<Button
                  title="Go"
                  color={COLORS.foam}
                  filled
                  style={{ width: '100%' }}
                  onPress={(handleGoPress)}
                />*/}
							</View>
						</View>
					</View>

					<View style={{ flex: 1, marginHorizontal: 15, zIndex: -5 }}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "500",
								color: COLORS.black,
								zIndex: -5,
							}}
						>
							New bug reports: 3
						</Text>
					</View>

					<View style={{ flex: 1, marginHorizontal: 12, zIndex: -5 }}>
						<View style={styles.container}>
							<Table
								borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}
							>
								<Row
									data={data1.tableHead}
									style={styles.head}
									textStyle={styles.headText}
								/>
								<Rows data={data1.tableData} textStyle={styles.text} />
							</Table>
							<View style={{ flex: 1, marginLeft: 5, marginVertical: 10 }}>
								<TouchableOpacity
									style={styles.smallButton}
									onPress={() => {
										console.log("Swag press");
									}}
								>
									<Text style={styles.smallButtonText}>See all</Text>
								</TouchableOpacity>
							</View>
						</View>

						<Text
							style={{
								fontSize: 16,
								fontWeight: "500",
								color: COLORS.black,
								zIndex: -5,
							}}
						>
							New feature requests: 3
						</Text>

						<View style={styles.container}>
							<Table
								borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}
							>
								<Row
									data={data2.tableHead1}
									style={styles.head}
									textStyle={styles.headText}
								/>
								<Rows data={data2.tableData1} textStyle={styles.text} />
							</Table>
							<View style={{ flex: 1, marginLeft: 5, marginVertical: 10 }}>
								<TouchableOpacity
									style={styles.smallButton}
									onPress={() => {
										console.log("Swag press again");
									}}
								>
									<Text style={styles.smallButtonText}>See all</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingBottom: 10,
		paddingVertical: 10,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		elevation: 2,
	},
	container: {
		flex: 1,
		padding: 5,
		justifyContent: "center",
	},
	head: {
		height: 34,
		backgroundColor: COLORS.foam,
	},
	headText: {
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.black,
	},
	text: {
		margin: 6,
		fontSize: 14,
		textAlign: "center",
	},
	smallButton: {
		marginTop: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: COLORS.foam,
		borderRadius: 8,
		alignSelf: "flex-end",
		elevation: 2,
	},
});

export default AdminLogin;
