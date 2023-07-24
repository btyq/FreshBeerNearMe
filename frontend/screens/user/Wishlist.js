import {
	Entypo,
	FontAwesome,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
	Alert,
	Button,
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
	PanResponder,
} from "react-native";
import { Header } from "react-native-elements";
import { AirbnbRating } from "react-native-ratings";
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

const BeerItem = ({
	beerID,
	beerName,
	price,
	rating,
	beerDescription,
	beerImage,
	ABV,
	IBU,
	onSlide,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;
	
	const panResponder = useRef(
		PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			slideAnim.setValue(gestureState.dx);
		},
		onPanResponderRelease: (_, gestureState) => {
			if (gestureState.dx > 50) {
			const type = 'beer'
			onSlide(type, beerID);
			}
	
			Animated.spring(slideAnim, {
			toValue: 0,
			useNativeDriver: false,
			}).start();
		},
		})
	).current;

	const handlePopup = () => {
		setPopupVisible(!popupVisible); // created 1st modal
	};

	return (
		<Animated.View
			style={{
				transform: [{ translateX: slideAnim }],
			}}
			{...panResponder.panHandlers}
		>
			<View style={styles.subContainer}>
				<TouchableOpacity style={styles.itemContainer} onPress={handlePopup}>
					<View style={{ flex: 1, paddingHorizontal: 6, paddingTop: 6 }}>
						<CustomText>{beerName}</CustomText>
						<CustomText>Price: ${price}</CustomText>
					</View>
					<View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingTop: 6,
							}}
						>
							{[1, 2, 3, 4, 5].map((star) => (
								<Ionicons
									key={star}
									name="star"
									size={16}
									color={star <= rating ? COLORS.foam : COLORS.grey}
								/>
							))}
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

const VenueItem = ({
	venueID,
	venueName,
	venueAddress,
	venueContact,
	venueRating,
	venueImage,
	venueOperatingHours,
	venueFreshness,
	venueTemperature,
	onSlide,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;

	const panResponder = useRef(
		PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			slideAnim.setValue(gestureState.dx);
		},
		onPanResponderRelease: (_, gestureState) => {
			if (gestureState.dx > 50) {
			const type = 'venue'
			onSlide(type, venueID);
			}
	
			Animated.spring(slideAnim, {
			toValue: 0,
			useNativeDriver: false,
			}).start();
		},
		})
	).current;

	const handlePopup = () => {
		setPopupVisible(!popupVisible); // created 1st modal
	};
	return (
		<Animated.View
			style={{
				transform: [{ translateX: slideAnim }],
			}}
			{...panResponder.panHandlers}
		>
			<View style={styles.subContainer}>
				<TouchableOpacity style={styles.itemContainer} onPress={handlePopup}>
					<View style={{ flex: 1, paddingHorizontal: 6, paddingTop: 6 }}>
						<CustomText>{venueName}</CustomText>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingTop: 6,
						}}
					>
						{[1, 2, 3, 4, 5].map((star) => (
							<Ionicons
								key={star}
								name="star"
								size={16}
								color={star <= venueRating ? COLORS.foam : COLORS.grey}
							/>
						))}
					</View>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

const Wishlist = ( { navigation }) => {
	const [wishlistData, setWishlistData] = useState([]);
	const [removedWishlistState, setRemovedWishlistState] = useState(false);
	const { cookies } = useCookies();

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getWishlist", {
				params: {
					userID: cookies.userID
				}
			})
			.then((response) => {
				setWishlistData(response.data);
				setRemovedWishlistState(false);
			})
			.catch((error) => {
				console.error("Error retrieving wishlist", error);
			})
	}, [removedWishlistState]);

	const handleSlide = (type, ID) => {
		let data = { userID: cookies.userID };
	
		if (type === 'beer') {
		  data = { ...data, beerID: ID };
		} else if (type === 'venue') {
		  data = { ...data, venueID: ID };
		}
		axios
			.post("http://10.0.2.2:3000/removeWishlist", data)
			.then((response) => {
				if (response.data.success) {
					Alert.alert("Removed from Wishlist!")
					setRemovedWishlistState(true);
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message);
				}
			})
			.catch((error) => {
				console.error(error);
			})
	  };

	return (
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
						color: COLORS.black,
						fontWeight: "bold",
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

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					padding: 10,
					marginTop: 20,
					marginHorizontal: 12,
					backgroundColor: COLORS.secondary,
				}}
			>
				<Text style={{ fontSize: 18 }}>My Wishlist</Text>
			</View>
			<ScrollView style={{ marginHorizontal: 12 }}>
				<View style={styles.containerSection}>
				{wishlistData?.wishlistArray?.map((item) => {
					if (item.beerID) {
						return (
						<BeerItem
							key={item.beerID}
							beerID={item.beerID}
							beerName={item.beerName}
							price={item.price}
							rating={item.rating}
							beerDescription={item.beerDescription}
							beerImage={item.beerImage}
							ABV={item.abv}
							IBU={item.ibu}
							communityReviews={item.communityReviews}
							venueAvailability={item.venueAvailability}
							onSlide={handleSlide}
						/>
						);
					} else if (item.venueID) {
						return (
						<VenueItem
							key={item.venueID}
							venueID={item.venueID}
							venueName={item.venueName}
							venueAddress={item.venueAddress}
							venueContact={item.venueContact}
							venueRating={item.venueRating}
							venueImage={item.venueImage}
							venueOperatingHours={item.venueOperatingHours}
							venueFreshness={item.venueFreshness}
							venueTemperature={item.venueTemperature}
							onSlide={handleSlide}
						/>
						);
					}
					return null;
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	editButton: {
		backgroundColor: COLORS.foam,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 0,
		elevation: 2,
	},
	containerSection: {
		marginTop: 5,
		paddingHorizontal: 10,
	},
	containerItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		backgroundColor: COLORS.grey,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 0,
		paddingHorizontal: 20,
		elevation: 2,
	},
	leftContainer: {
		flex: 1,
		justifyContent: "center",
		paddingLeft: 10,
	},
	beerName: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.black,
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
	},
	venueName: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.black,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: COLORS.white,
		padding: 20,
		borderRadius: 10,
		width: "80%",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalText: {
		fontSize: 16,
		marginBottom: 10,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		borderColor: 0,
	},
	subContainer: {
		marginBottom: 10,
		backgroundColor: COLORS.white,
		padding: 10,
		borderRadius: 12,
		borderWidth: 1,
		shadowColor: COLORS.black, // Add shadow color
		shadowOffset: { width: 0, height: 2 }, // Add shadow offset
		shadowOpacity: 0.3, // Add shadow opacity
		shadowRadius: 3, // Add shadow radius
		elevation: 5, // Add elevation for Android
		borderColor: 0,
	},
});

export default Wishlist;
