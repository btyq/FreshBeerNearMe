import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
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
import { Row, Rows, Table } from "react-native-table-component";
import COLORS from "../../constants/colors";
import GlobalStyle from "../../utils/GlobalStyle";

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

	const updateSearch = (search) => {
		setSearch(search);
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
								Manage Database
							</Text>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-end",
									alignItems: "flex-end",
								}}
							>
								<Button
									title="Update Database"
									color={COLORS.foam}
									filled
									style={{
										marginTop: 10,
										marginBottom: 4,
										elevation: 2,
										width: "40%",
									}}
								/>
							</View>

							<View style={{ marginTop: 20, justifyContent: "center" }}>
								<Table
									borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}
								>
									<Row
										data={["Beer name", "Style", "Brewery", "Freshness"]}
										style={styles.head}
										textStyle={{
											textAlign: "center",
											...GlobalStyle.headerFont,
										}}
									/>
									<Rows
										data={data2.tableData1}
										textStyle={{ ...GlobalStyle.bodyFont, textAlign: "center" }}
									/>
								</Table>
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
		paddingVertical: 10,
		borderColor: COLORS.black,
		borderWidth: 0,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ManageDatabase;
