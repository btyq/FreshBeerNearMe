import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Easing,
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import MapView, { Callout, Marker } from "react-native-maps";
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

const CustomText = (props) => {
	return (
		<Text style={{ ...GlobalStyle.bodyFont, ...props.style }}>
			{props.children}
		</Text>
	);
};

const NearbyVenues = ({ navigation }) => {
	const [currentLocation, setCurrentLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isMapReady, setIsMapReady] = useState(false);
	const rotateValue = useRef(new Animated.Value(0)).current;
	const [modalVisible, setModalVisible] = useState(false); // 1st modal
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [modalVisible2, setModalVisible2] = useState(false); // 2nd modal
	const [activeFilter, setActiveFilter] = useState(""); // filter button

	// for filtering options
	const handleFilter = (filter) => {
		setActiveFilter(filter);
	};

	// marker for venues
	const MarkerVenueDetails = () => {
		if (!selectedMarker) {
			return null;
		}

		const handleModal = () => {
			setModalVisible(!modalVisible);
		};

		const addressData = {
			1: "2 Science Park Dr, Ascent, #01-23, 118222",
			2: "182 Jln Jurong Kechil, #01-50, Singapore 596152",
			3: "217 Upper Thomson Rd, Singapore 574350",
			4: "302 Beach Rd, #01-07 Concourse Skyline, Singapore 199600",
			5: "30 Victoria St, #01-06, Singapore 187996",
			6: "160 Changi Rd, B1-10 HexaCube, Singapore 419728",
			7: "13 Duxton Hill, #01-01, Singapore 089597",
			8: "18 Sungei Kadut Street 2, #01-06, Singapore 729236",
			9: "231 Upper Thomson Rd, Singapore 574362",
			10: "8 Lor Bakar Batu, #04-07, Singapore 348743",
			11: "56 Sembawang Road, #01-01/02, Hong Heng Mansions, Singapore 779086",
			12: "52 Yio Chu Kang Rd, Singapore 545561",
			13: "81 Serangoon Garden Way, Singapore 555977",
			14: "133 Pasir Ris Rd, Singapore 519149",
			15: "78 Airport Boulevard #05-202 Jewel, Singapore Changi Airport, 819666",
			16: "2 Jln Lokam, #01-53, Singapore 537846",
			17: "2 Venture Dr, #02-44, Singapore 608526",
			18: "7500 Beach Rd, Singapore 199591",
			19: "309 Choa Chu Kang Ave 4, Level 3 Centre, Singapore 680309",
			20: "9 Haji Ln, Singapore 189202",
		};
		const { title, id } = selectedMarker;
		const address = addressData[id]; // get the address from the id

		return (
			<Modal visible={modalVisible} transparent animationType="slide">
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Image
							style={{
								width: "100%",
								height: 200,
								resizeMode: "contain",
								marginBottom: 10,
							}}
							source={require("../../assets/venue.png")}
						/>
						<CustomText style={{ marginBottom: 10 }}>
							Venue Name: {title}
						</CustomText>
						<CustomText style={{ marginBottom: 10 }}>
							Address : {address}
						</CustomText>
						<Button
							title="Close"
							onPress={handleModal}
							filled
							style={{
								elevation: 2,
								borderColor: 0,
							}}
						/>
					</View>
				</View>
			</Modal>
		);
	};

	// data for venues
	const markerVenue = [
		{
			id: 1,
			latitude: 1.2938,
			longitude: 103.7944,
			title: "The Good Beer Company",
		},
		{ id: 2, latitude: 1.3475, longitude: 103.7793, title: "George Town Bar" },
		{ id: 3, latitude: 1.3561, longitude: 103.8405, title: "Sara's" },
		{
			id: 4,
			latitude: 1.3012,
			longitude: 103.8621,
			title: "Malt Craft Beer Bar",
		},
		{
			id: 5,
			latitude: 1.2956,
			longitude: 103.8527,
			title: "Almost Famous Craft Beer Bar",
		},
		{
			id: 6,
			latitude: 1.3234,
			longitude: 103.9326,
			title: "Locality Craft Beers",
		},
		{
			id: 7,
			latitude: 1.2849,
			longitude: 103.8463,
			title: "SG Taps",
		},
		{
			id: 8,
			latitude: 1.4146,
			longitude: 103.7531,
			title: "Stickies Bar",
		},
		{
			id: 9,
			latitude: 1.3596,
			longitude: 103.8038,
			title: "Shawn's Beernest",
		},
		{
			id: 10,
			latitude: 1.3366,
			longitude: 103.8752,
			title: "Thirsty Beer Shop",
		},
		{
			id: 11,
			latitude: 1.4048,
			longitude: 103.833,
			title: "Brew House Sports Bar",
		},
		{
			id: 12,
			latitude: 1.3602,
			longitude: 103.8759,
			title: "Ken's Pub",
		},
		{
			id: 13,
			latitude: 1.3668,
			longitude: 103.8656,
			title: "Kool P.U.B. & Entertainment Llp",
		},
		{
			id: 14,
			latitude: 1.3874,
			longitude: 103.9502,
			title: "Georges",
		},
		{
			id: 15,
			latitude: 1.3639,
			longitude: 104.0022,
			title: "The World is Flat",
		},
		{
			id: 16,
			latitude: 1.3465,
			longitude: 103.8815,
			title: "Cheval Whiskey Bar",
		},
		{
			id: 17,
			latitude: 1.3328,
			longitude: 103.7459,
			title: "Beer Valley",
		},
		{
			id: 18,
			latitude: 1.3039,
			longitude: 103.8623,
			title: "Club 5",
		},
		{
			id: 19,
			latitude: 1.389,
			longitude: 103.755,
			title: "Jest D’Place",
		},
		{
			id: 20,
			latitude: 1.3051,
			longitude: 103.8592,
			title: "Good Luck",
		},
	];

	// marker for breweries
	const MarkerBreweriesDetails = () => {
		if (!selectedMarker) {
			return null;
		}

		const handleModal2 = () => {
			setModalVisible2(!modalVisible2);
		};

		const addressData_b = {
			1: "25A Dempsey Rd, #01-01, Singapore 247691",
			2: "50 Ubi Ave 3, #01-12, Singapore 408866",
			3: "171 Kampong Ampat, #03-01 Les Amis Ka Foodlink, Singapore 368330",
			4: "655 Hougang Ave 8, Block 655, Singapore 530655",
			5: "36 Club St, Singapore 069469",
			6: "335 Smith St, #02-75, Singapore 050335",
			7: "180 Albert St, #01-19, Singapore 189971",
			8: "27 Tuas Bay Walk, #04-08 Westview Food Factory, Singapore 637127",
			9: "6 Changi Village Rd, #01-01/02, Singapore 509907",
			10: "361 Ubi Rd 3, Singapore 408664",
		};

		const { title_b, id_b } = selectedMarker;
		const address_b = addressData_b[id_b]; // get the address from the id

		return (
			<Modal visible={modalVisible2} transparent animationType="slide">
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Image
							style={{
								width: "100%",
								height: 200,
								resizeMode: "contain",
								marginBottom: 10,
							}}
							source={require("../../assets/brewery.png")}
						/>
						<CustomText style={{ marginBottom: 10 }}>
							Venue Name: {title_b}
						</CustomText>
						<CustomText style={{ marginBottom: 10 }}>
							Address : {address_b}
						</CustomText>
						<Button
							title="Close"
							onPress={handleModal2}
							filled
							style={{
								elevation: 2,
								borderColor: 0,
							}}
						/>
					</View>
				</View>
			</Modal>
		);
	};

	// data for breweries
	const markerBreweries = [
		{
			id_b: 1,
			latitude: 1.3068,
			longitude: 103.8154,
			title_b: "RedDot Brewhouse",
		},
		{
			id_b: 2,
			latitude: 1.3327,
			longitude: 103.8995,
			title_b: "Pink Blossoms Brewing",
		},
		{
			id_b: 3,
			latitude: 1.3364,
			longitude: 103.884,
			title_b: "Brewerkz Brewing Co",
		},
		{
			id_b: 4,
			latitude: 1.4106,
			longitude: 103.7603,
			title_b: "Sunbird Brewing Company",
		},
		{
			id_b: 5,
			latitude: 1.2832,
			longitude: 103.8485,
			title_b: "Lion Brewery Co",
		},
		{
			id_b: 6,
			latitude: 1.2833,
			longitude: 103.8432,
			title_b: "On Tap",
		},
		{
			id_b: 7,
			latitude: 1.3047,
			longitude: 103.8507,
			title_b: "Hospoda Microbrewery",
		},
		{
			id_b: 8,
			latitude: 1.3135,
			longitude: 103.6304,
			title_b: "Alive Brewing Co.",
		},
		{
			id_b: 9,
			latitude: 1.3944,
			longitude: 104.0008,
			title_b: "Little Island Brewing Co @ Changi Village",
		},
		{
			id_b: 10,
			latitude: 1.3381,
			longitude: 103.9108,
			title_b: "Crossroads Brewing Co.",
		},
	];

	useEffect(() => {
		const fetchLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Highest,
				maximumAge: 10000,
			});
			setCurrentLocation(location);
			setTimeout(() => {
				setIsMapReady(true);
			}, 3000);
		};
		fetchLocation();
	}, []);

	useEffect(() => {
		const rotateAnimation = Animated.loop(
			Animated.timing(rotateValue, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		);

		rotateAnimation.start();

		return () => {
			rotateAnimation.stop();
		};
	}, [rotateValue]);

	const spin = rotateValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

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
						<View
							style={{
								flexDirection: "row",
							}}
						>
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
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<TouchableOpacity>
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
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.grid}>
						<Button
							title="Find a Venue"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("BeersVenue")}
						/>
						<Button
							title="Find a Beer"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("FindABeer")}
						/>
						<Button
							title="Nearby Venues"
							color={COLORS.foam}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("NearbyVenues")}
						/>
						<Button
							title="Breweries"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("Breweries")}
						/>
					</View>

					<View style={{ flexDirection: "row", marginHorizontal: 22 }}>
						<Button
							title="Venues"
							onPress={() => handleFilter("venues")}
							style={
								activeFilter === "venues"
									? styles.activeFilterButton
									: styles.filterButton
							}
						/>
						<Button
							title="Breweries"
							onPress={() => handleFilter("breweries")}
							style={
								activeFilter === "breweries"
									? styles.activeFilterButton
									: styles.filterButton
							}
						/>
					</View>
					<View style={styles.container}>
						{isMapReady && currentLocation ? (
							<MapView
								style={styles.map}
								initialRegion={{
									latitude: currentLocation.coords.latitude,
									longitude: currentLocation.coords.longitude,
									latitudeDelta: 0.01,
									longitudeDelta: 0.01,
								}}
							>
								{/* for venues */}
								{(activeFilter === "venues" || activeFilter === "") &&
									markerVenue.map((marker) => (
										<Marker
											onPress={() => {
												setModalVisible(true);
												setSelectedMarker(marker);
											}}
											key={marker.id}
											coordinate={{
												latitude: marker.latitude,
												longitude: marker.longitude,
											}}
											//	title={marker.title}
											//	description="This is the test description"
										>
											<Ionicons name="location" size={34} color="#AF7FE2" />
											<Callout tooltip>
												<View>
													<View style={styles.bubble}>
														<View
															style={{
																flexDirection: "row",
																//	paddingHorizontal: 12,
																alignItems: "center",
																//		marginHorizontal: 12,
															}}
														>
															<FontAwesome5
																name="warehouse"
																size={20}
																color="black"
																style={{ marginRight: 12 }}
															/>
															<CustomText>{marker.title}</CustomText>
															{/* <Text style={{ fontSize: 14 }}>Venues</Text> */}

															{/* <Image
															style={{
																width: 40,
																height: 40,
																resizeMode: "contain",
															}}
															source={require("../../assets/food-banner1.jpg")}
														/> */}
														</View>
													</View>
													<View style={styles.arrowBorder} />
													<View style={styles.arrow} />
												</View>
											</Callout>
										</Marker>
									))}

								{/* for breweries */}
								{(activeFilter === "breweries" || activeFilter === "") &&
									markerBreweries.map((marker) => (
										<Marker
											onPress={() => {
												setModalVisible2(true);
												setSelectedMarker(marker);
											}}
											key={marker.id_b}
											coordinate={{
												latitude: marker.latitude,
												longitude: marker.longitude,
											}}
										>
											<Ionicons name="location" size={34} color="#11DAF6" />
											<Callout tooltip>
												<View>
													<View style={styles.bubble}>
														<View
															style={{
																flexDirection: "row",
																//	paddingHorizontal: 12,
																alignItems: "center",
																//		marginHorizontal: 12,
															}}
														>
															<FontAwesome5
																name="warehouse"
																size={20}
																color="black"
																style={{ marginRight: 12 }}
															/>
															<CustomText>{marker.title_b}</CustomText>
															{/* <Text style={{ fontSize: 14 }}>Venues</Text> */}

															{/* <Image
															style={{
																width: 40,
																height: 40,
																resizeMode: "contain",
															}}
															source={require("../../assets/food-banner1.jpg")}
														/> */}
														</View>
													</View>
													<View style={styles.arrowBorder} />
													<View style={styles.arrow} />
												</View>
											</Callout>
										</Marker>
									))}
							</MapView>
						) : (
							<Animated.View
								style={[styles.loadingIcon, { transform: [{ rotate: spin }] }]}
							>
								<Image
									source={require("../../assets/beer.png")}
									style={{ width: "50%", height: "50%" }}
								/>
							</Animated.View>
						)}
						<MarkerVenueDetails />
						<MarkerBreweriesDetails />
					</View>
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	grid: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		marginHorizontal: 20,
	},
	longButton: {
		width: "20%",
		height: 55,
		marginVertical: 0,
		borderRadius: 20,
		marginRight: 0,
		borderColor: 0,
		elevation: 2,
	},
	button: {
		paddingVertical: 10,
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		height: "65%",
		width: "95%",
		alignSelf: "center",
		marginTop: 10,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 10,
		padding: 10,
		minHeight: 50, // Adjust the height as per your requirement
		backgroundColor: COLORS.grey,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	loadingIcon: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	bubble: {
		flexDirection: "column",
		alignSelf: "flex-start",
		backgroundColor: "#FFF",
		borderRadius: 6,
		borderColor: 0,
		borderWidth: 5,
		paddingHorizontal: 25,
		padding: 10,
		width: 150,
		flexWrap: "wrap",
	},
	arrow: {
		backgroundColor: "transparent",
		borderColor: "transparent",
		borderTopColor: "#fff",
		borderWidth: 16,
		alignSelf: "center",
		marginTop: -32,
	},
	arrowBorder: {
		backgroundColor: "transparent",
		borderColor: "transparent",
		borderTopColor: "#007a87",
		borderWidth: 16,
		alignSelf: "center",
		marginTop: -0.5,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: COLORS.overlay,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: COLORS.secondary,
		width: "100%",
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	activeFilterButton: {
		width: "50%",
		height: 40,
		marginVertical: 12,
		borderRadius: 20,
		marginRight: 0,
		borderColor: 0,
		elevation: 2,
		backgroundColor: COLORS.foam,
	},
	filterButton: {
		width: "50%",
		height: 40,
		marginVertical: 12,
		borderRadius: 20,
		marginRight: 0,
		borderColor: 0,
		elevation: 2,
		backgroundColor: COLORS.white,
	},
});

export default NearbyVenues;
