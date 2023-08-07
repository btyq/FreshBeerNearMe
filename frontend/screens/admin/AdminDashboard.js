import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Row, Rows, Table } from "react-native-table-component";
import { Feather } from "react-native-vector-icons";
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

const CustomText = (props) => {
	return (
		<Text style={{ ...GlobalStyle.bodyFont, ...props.style }}>
			{props.children}
		</Text>
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
	const [data1, setData] = useState(tableData);
	const [data2, setData2] = useState(tableData1);

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
					<ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginTop: 5,
							}}
						>
							<Text
								style={{
									fontSize: 26,
									color: COLORS.black,
									marginTop: 20,
									marginBottom: 12,
									...GlobalStyle.headerFont,
								}}
							>
								Welcome, admin
							</Text>
							<Text style={{ ...GlobalStyle.headerFont, marginBottom: 25 }}>
								What would you like to do?
							</Text>
						</View>

						<View style={{ marginHorizontal: 22 }}>
							<Text
								style={{
									fontSize: 18,
									...GlobalStyle.headerFont,
									marginVertical: 12,
								}}
							>
								Reports and Requests
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 10,
								}}
							>
								<TouchableOpacity
									// onPress={() => navigation.navigate("VenueProfile")}
									style={styles.subContainer}
								>
									<CustomText>Reported Bugs</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="house-user"
											size={34}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>

								<TouchableOpacity
									// onPress={() => navigation.navigate("VenueProfile")}
									style={styles.subContainer}
								>
									<CustomText>Feature Requests</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="house-user"
											size={34}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>
							</View>

							<Text
								style={{
									fontSize: 18,
									...GlobalStyle.headerFont,
									marginVertical: 12,
								}}
							>
								Management
							</Text>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									marginBottom: 10,
								}}
							>
								<TouchableOpacity
									onPress={() => navigation.navigate("ManageUsers")}
									style={styles.subContainer}
								>
									<CustomText>User Management</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="house-user"
											size={34}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>

								<TouchableOpacity
									// onPress={() => navigation.navigate("VenueProfile")}
									style={styles.subContainer}
								>
									<CustomText>Database Management</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="house-user"
											size={34}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>

								<TouchableOpacity
									// onPress={() => navigation.navigate("VenueProfile")}
									style={styles.subContainer}
								>
									<CustomText>Content Management</CustomText>
									<View
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<FontAwesome5
											name="house-user"
											size={34}
											color={COLORS.foam}
										/>
									</View>
								</TouchableOpacity>
							</View>

							<Text
								style={{
									fontSize: 16,
									...GlobalStyle.headerFont,
									marginTop: 10,
								}}
							>
								New bug reports: 3
							</Text>

							<View style={{ flex: 1, padding: 5, justifyContent: "center" }}>
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
								<View
									style={{
										flex: 1,
										alignItems: "flex-end",
										justifyContent: "flex-end",
										marginTop: 10,
									}}
								>
									<Button
										title="See All"
										// onPress={handlePopup}
										filled
										style={{
											width: "30%",
											alignContent: "center",
											borderColor: 0,
											elevation: 2,
											borderRadius: 12,
										}}
									/>
								</View>
							</View>

							<Text style={{ fontSize: 16, ...GlobalStyle.headerFont }}>
								New feature requests: 3
							</Text>

							<View
								style={{
									fontSize: 16,
									...GlobalStyle.headerFont,
									marginTop: 10,
								}}
							>
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
								<View
									style={{
										flex: 1,
										alignItems: "flex-end",
										justifyContent: "flex-end",
										marginTop: 10,
									}}
								>
									<Button
										title="See All"
										// onPress={handlePopup}
										filled
										style={{
											width: "30%",
											alignContent: "center",
											borderColor: 0,
											elevation: 2,
											borderRadius: 12,
										}}
									/>
								</View>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
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
	subContainer: {
		height: 100,
		elevation: 2,
		backgroundColor: COLORS.grey,
		marginLeft: 10,
		marginTop: 10,
		borderRadius: 15,
		marginBottom: 3,
		width: "45%",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default AdminLogin;
