import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCookies } from "../../CookieContext";
import COLORS from "../../constants/colors";
import GlobalStyle from "../../utils/GlobalStyle";

const CustomText = (props) => {
	return (
		<Text style={{ ...GlobalStyle.bodyFont, ...props.style }}>
			{props.children}
		</Text>
	);
};

const Analytics = ({ navigation }) => {
	const { cookies } = useCookies();

	const [username, setUsername] = useState("");
	const [popularData, setPopularData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [modalVisible1, setModalVisible1] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);

	// useEffect(() => {
	// 	const sessionToken = cookies.sessionToken;
	// 	const venueOwnerID = cookies.venueOwnerID;
	// 	setUsername(cookies.username);
	// }, []);

	const data = [30, 40, 25, 50, 45, 20];
	const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

	const maxDataValue = Math.max(...data);
	const scaleY = 150 / maxDataValue;

	// for top 3 most popular beer
	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getMostPopularBeer", {
				params: {
					venueOwnerID: cookies.venueOwnerID,
				},
			})
			.then((response) => {
				setPopularData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error retrieving POPULAR BEER", error);
				setIsLoading(false);
			});
	}, []);

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
						<View style={{ marginHorizontal: 22 }}>
							<Text
								style={{
									fontSize: 18,
									...GlobalStyle.headerFont,
									marginBottom: 12,
								}}
							>
								Analytics Summary
							</Text>

							<View
								style={{
									height: 240,
									elevation: 2,
									backgroundColor: COLORS.grey,
									marginTop: 10,
									borderRadius: 15,
									marginBottom: 10,
									width: "100%",
									padding: 20,
								}}
							>
								<Text style={{ ...GlobalStyle.headerFont, fontSize: 16 }}>
									Beer Popularity of the Week
								</Text>
								{/* <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
									{data.map((value, index) => (
										<View
											key={index}
											style={{
												flex: 1,
												marginLeft: 10,
												alignItems: "center",
											}}
										>
											<View
												style={{
													height: value * scaleY,
													width: 10,
													backgroundColor: COLORS.foam,
												}}
											/>
											<Text style={{ fontSize: 12, marginTop: 5 }}>
												{labels[index]}
											</Text>
										</View>
									))}
								</View> */}
							</View>

							{/* top 3 popular beers */}
							<View
								style={{
									height: 220,
									elevation: 2,
									backgroundColor: COLORS.grey,
									marginTop: 10,
									borderRadius: 15,
									marginBottom: 10,
									width: "100%",
									padding: 20,
								}}
							>
								<Text style={{ ...GlobalStyle.headerFont, fontSize: 16 }}>
									Top 3 Popular Beers
								</Text>
								<View>
									{isLoading ? (
										<Text>Loading...</Text>
									) : popularData ? (
										<View>
											<Text style={{ ...GlobalStyle.headerFont }}>
												Most Popular Beer:{" "}
												{popularData.mostPopularBeer.beerName}
											</Text>
											<Text
												style={{
													...GlobalStyle.headerFont,
													marginTop: 12,
												}}
											>
												Top 3 Most Popular Beers:
											</Text>
											{popularData.top3MostPopularBeers.map((beer) => (
												<CustomText key={beer.beerID}>
													{beer.beerName}
												</CustomText>
											))}
										</View>
									) : (
										<Text>No most popular beer data found.</Text>
									)}
								</View>
							</View>

							<View
								style={{
									height: 220,
									elevation: 2,
									backgroundColor: COLORS.grey,
									marginTop: 10,
									borderRadius: 15,
									marginBottom: 10,
									width: "100%",
									padding: 20,
								}}
							>
								<Text style={{ ...GlobalStyle.headerFont, fontSize: 16 }}>
									Favorite Promotion
								</Text>
							</View>
						</View>
						{/* </ScrollView> */}
						{/* <Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible1}
							onRequestClose={() => setModalVisible1(false)}
						>
							<View style={styles.centeredView}>
								<View style={[styles.modalView, { width: "90%", height: 500 }]}>
									<Text style={styles.modalText}>Modal 1 Content</Text>

									<View style={{ flex: 1, justifyContent: "flex-end" }}>
										<TouchableOpacity
											style={[styles.button, styles.buttonClose]}
											onPress={() => setModalVisible1(false)}
										>
											<Text style={styles.textStyle}>Close Modal</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</Modal> */}

						{/* <Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible2}
							onRequestClose={() => setModalVisible2(false)}
						>
							<View style={styles.centeredView}>
								<View style={[styles.modalView, { width: "90%", height: 500 }]}>
									<Text style={styles.modalText}>Modal 2 Content</Text>

									<View style={{ flex: 1, justifyContent: "flex-end" }}>
										<TouchableOpacity
											style={[styles.button, styles.buttonClose]}
											onPress={() => setModalVisible2(false)}
										>
											<Text style={styles.textStyle}>Close Modal</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</Modal> */}
					</ScrollView>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 3, // increased padding
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		elevation: 20,
	},
	beerImage: {
		height: 230,
		width: 250,
		borderRadius: 15,
		borderWidth: 5,
		borderColor: 0,
		marginTop: 20,
		marginLeft: "auto",
		marginRight: "auto",
		justifyContent: "center",
		alignContent: "center",
		marginBottom: 10,
		alignSelf: "center",
	},
	label: {
		marginBottom: 5,
		fontWeight: "bold",
		fontSize: 16,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: COLORS.grey,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 20,
		borderWidth: 1,
		borderBottomColor: COLORS.black,
		marginTop: 10,
	},
	textStyle: {
		color: COLORS.black,
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default Analytics;
