import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
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
import MapView, { Marker } from "react-native-maps";
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

const NearbyVenues = ({ navigation }) => {
	const [currentLocation, setCurrentLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isMapReady, setIsMapReady] = useState(false);
	const rotateValue = useRef(new Animated.Value(0)).current;

	const markers = [
		{ id: 1, latitude: 1.3529, longitude: 103.7549, title: "Marker 1" },
		{ id: 2, latitude: 1.3218, longitude: 103.7399, title: "Marker 2" },
		{ id: 3, latitude: 1.3345, longitude: 103.7444, title: "Marker 3" },
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
					<View style={{ ...styles.container }}>
						{isMapReady && currentLocation ? (
							<MapView
								initialRegion={{
									latitude: currentLocation.coords.latitude,
									longitude: currentLocation.coords.longitude,
									latitudeDelta: 0.01,
									longitudeDelta: 0.01,
								}}
								style={styles.map}
							>
								{markers.map((marker) => (
									<Marker
										key={marker.id}
										coordinate={{
											latitude: marker.latitude,
											longitude: marker.longitude,
										}}
										title={marker.title}
									/>
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
	shortButton: {
		width: "30%",
		height: 40,
		marginVertical: 5,
		borderRadius: 30,
		borderColor: 0,
		marginHorizontal: "1%",
		marginTop: 10, // Adjust the top spacing here
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
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginTop: 20, // Adjust the top spacing here
	},
	searchInput: {
		flex: 1,
		height: 45,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 20,
		paddingHorizontal: 10,
		marginRight: 10,
		backgroundColor: COLORS.grey,
	},
	container: {
		height: "75%",
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
	subContainer: {
		marginBottom: 10,
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 10,
		shadowColor: COLORS.black, // Add shadow color
		shadowOffset: { width: 0, height: 2 }, // Add shadow offset
		shadowOpacity: 0.3, // Add shadow opacity
		shadowRadius: 3, // Add shadow radius
		elevation: 5, // Add elevation for Android
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	leftContainer: {
		flex: 1,
	},
	rightContainer: {
		flex: 0.3,
		marginRight: 12,
		flexDirection: "row-reverse",
		alignItems: "center",
	},
	venueName: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.black,
	},
	starRatingContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 4,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: COLORS.overlay,
		justifyContent: "center",
		alignItems: "center",
	},
	popup: {
		width: "90%", // Adjust the width of the popup
		height: 500, // Adjust the height of the popup
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 20,
		elevation: 5,
	},
	popupTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	popupContent: {
		fontSize: 16,
		marginBottom: 20,
	},
	closeButton: {
		backgroundColor: COLORS.orange,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginTop: "50%", // Adjust the marginTop to shift the close button down
	},
	closeButtonText: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 16,
	},
	venueImage: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginBottom: 10,
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
});

export default NearbyVenues;
