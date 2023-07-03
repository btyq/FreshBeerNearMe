import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
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
import { AirbnbRating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";

// Button component
const Button = (props) => {
	const filledBgColor = props.color || COLORS.primary;
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
			<Text style={{ fontSize: 12, ...{ color: textColor } }}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

// Modal component
const ModalWindow = (props) => {
	return (
		<Modal visible={props.visible} transparent={true} animationType="fade">
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalText}>{props.text}</Text>
					<TouchableOpacity style={styles.modalButton} onPress={props.onPress}>
						<Text style={styles.modalButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const Recommendation = () => {
	const navigation = useNavigation();
	const [comment, setComment] = useState("Bitter, but it's decent");
	const [comments, setComments] = useState([]);
	const [modalVisible1, setModalVisible1] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);

	const handleComment = () => {
		setComments([...comments, comment]);
		setComment("");
	};

	const showModal1 = () => {
		setModalVisible1(true);
	};

	const showModal2 = () => {
		setModalVisible2(true);
	};

	const closeModal = () => {
		setModalVisible1(false);
		setModalVisible2(false);
	};

	const navigateToSocial = () => {
		// Navigate to the Social.js page
		navigation.navigate("Social");
	};

	const navigateToForums = () => {
		// Navigate to the Forums.js page
		navigation.navigate("Forums");
	};

	const navigateToRateNReview = () => {
		// Navigate to the RateNReview.js page
		navigation.navigate("RateNReview");
	};

	const navigateToReferAFriend = () => {
		// Navigate to the ReferAFriend.js page
		navigation.navigate("ReferAFriend");
	};

	const navigateToRecommendation = () => {
		// Navigate to the Recommendation.js page
		navigation.navigate("Recommendation");
	};

	return (
		<ScrollView>
			<View style={{ height: 1500, backgroundColor: COLORS.white }}>
				<Header
					placement="left"
					backgroundColor={COLORS.primary}
					containerStyle={{
						height: 100,
						borderBottomLeftRadius: 40,
						borderBottomRightRadius: 40,
					}}
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
						<View style={{ flexDirection: "row", marginTop: 5 }}>
							<TouchableOpacity>
								<Octicons
									name="bookmark"
									size={24}
									color={COLORS.black}
									style={{ marginRight: 5 }}
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
							title="My Feed"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={navigateToSocial}
						/>
						<Button
							title="Forums"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={navigateToForums}
						/>
						<Button
							title="Rate & Review"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={navigateToRateNReview}
						/>
						<Button
							title="Refer a friend"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={navigateToReferAFriend}
						/>
						<Button
							title="Recommendation"
							color={COLORS.grey}
							filled
							style={styles.mediumButton}
							onPress={navigateToRecommendation}
						/>
					</View>
					<View>
						<Text
							style={{
								marginTop: 50,
								marginLeft: 15,
								fontSize: 15,
								color: COLORS.black,
							}}
						>
							Your Friend Recommendation
						</Text>
						<View
							style={{
								borderBottomWidth: 2,
								borderBottomColor: COLORS.grey,
								marginHorizontal: 10,
								marginTop: -6,
								marginLeft: 220,
								width: "45%",
							}}
						/>
					</View>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.white,
							width: "95%",
							height: "3%",
							borderWidth: 1,
							borderColor: COLORS.grey,
							borderRadius: 10,
							marginTop: 20,
							marginLeft: 0,
							alignSelf: "center",
							...styles.containerContent,
						}}
						onPress={showModal1}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								marginLeft: 10,
								marginTop: 6,
								...styles.beerName,
							}}
						>
							Beer Name
						</Text>
						<View
							style={{
								position: "relative",
								top: -13,
								marginLeft: "auto",
								marginRight: 0,
								...styles.starContainer,
							}}
						>
							{/* Add Airbnb star component here */}
							<AirbnbRating
								count={5}
								defaultRating={4}
								showRating={false}
								size={20}
								starContainerStyle={{
									marginLeft: -8, // Adjust the value to bring the stars closer
									marginTop: -15,
									...styles.ratingStarContainer,
								}}
								starStyle={styles.ratingStyle}
								isDisabled={true} // Make the star rating read-only
							/>
						</View>
					</TouchableOpacity>
					<View>
						<Text
							style={{
								marginTop: 50,
								marginLeft: 20,
								fontSize: 15,
								color: COLORS.black,
							}}
						>
							Recommend a Beer
						</Text>
					</View>
					<View
						style={{
							borderBottomWidth: 2,
							borderBottomColor: COLORS.grey,
							marginHorizontal: 10,
							marginTop: -8,
							marginLeft: 160,
							marginBottom: 10,
							width: "60%",
						}}
					/>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							padding: 10,
							alignItems: "center",
							borderColor: COLORS.grey,
						}}
					>
						<TextInput
							placeholder="Search for beer"
							style={{
								height: 40,
								borderColor: "grey",
								borderWidth: 1,
								borderRadius: 10,
								paddingLeft: 10,
								flex: 1,
								marginRight: 10,
							}}
						/>
						<Button
							title="Search"
							color={COLORS.grey}
							filled
							style={{
								width: "30%",
								height: 40,
								borderRadius: 30,
								borderWidth: 1,
								borderColor: COLORS.grey,
							}}
						/>
					</View>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.white,
							width: "95%",
							height: "3%",
							borderWidth: 1,
							borderColor: COLORS.grey,
							borderRadius: 10,
							marginTop: 20,
							marginLeft: 0,
							alignSelf: "center",
							...styles.containerContent,
						}}
						onPress={showModal2}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								marginLeft: 10,
								marginTop: 6,
								...styles.beerName,
							}}
						>
							Beer Name
						</Text>
						<View
							style={{
								position: "relative",
								top: -13,
								marginLeft: "auto",
								marginRight: 0,
								...styles.starContainer,
							}}
						>
							{/* Add Airbnb star component here */}
							<AirbnbRating
								count={5}
								defaultRating={4}
								showRating={false}
								size={20}
								starContainerStyle={{
									marginLeft: -1, // Adjust the value to bring the stars closer
									marginTop: -15,
									...styles.ratingStarContainer,
								}}
								starStyle={styles.ratingStyle}
								isDisabled={true} // Make the star rating read-only
							/>
						</View>
					</TouchableOpacity>
					<Button
						title="Recommend"
						color={COLORS.grey}
						filled
						style={{
							marginLeft: 280,
							width: "30%",
							height: 40,
							borderRadius: 30,
							borderWidth: 1,
							borderColor: COLORS.grey,
						}}
					/>
				</SafeAreaView>
			</View>
			<ModalWindow
				visible={modalVisible1}
				text="Modal 1 Content"
				onPress={closeModal}
			/>
			<ModalWindow
				visible={modalVisible2}
				text="Modal 2 Content"
				onPress={closeModal}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	grid: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		marginHorizontal: 10,
	},
	longButton: {
		width: "15%",
		height: 55,
		marginVertical: 0,
		borderRadius: 50,
		marginRight: 0,
	},
	mediumButton: {
		width: "35%",
		height: 40,
		marginVertical: 4,
		borderRadius: 30,
		marginHorizontal: "0%",
	},
	button: {
		paddingVertical: 10,
		borderColor: COLORS.grey,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	containerContent: {
		marginBottom: 20,
	},
	beerName: {
		marginBottom: 5,
	},
	starContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: COLORS.white,
		padding: 20,
		borderRadius: 10,
		width: "80%",
	},
	modalText: {
		fontSize: 16,
		marginBottom: 20,
	},
	modalButton: {
		backgroundColor: COLORS.primary,
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
	},
	modalButtonText: {
		color: COLORS.white,
		fontSize: 14,
		fontWeight: "bold",
	},
	ratingStarContainer: {
		marginLeft: -8,
		marginTop: -15,
	},
	ratingStyle: {
		marginRight: 2,
	},
});

export default Recommendation;
