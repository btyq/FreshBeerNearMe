import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
import COLORS from "../constants/colors";

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


const Social = () => {
	const navigation = useNavigation();
	const [comment, setComment] = useState("Bitter, but it's decent");
	const [comments, setComments] = useState([]);
	const navigateToSocial = () => {
		// Navigate to the Forums.js page
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
		// Navigate to the RateNReview.js page
		navigation.navigate("ReferAFriend");
	};

	const navigateToRecommendation = () => {
		// Navigate to the RateNReview.js page
		navigation.navigate("Recommendation");
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
			<View style={{ flex: 1, marginTop: 15 }}>
				<View style={styles.grid}>
					<Button
						title="My Feed"
						color={COLORS.grey}
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
						color={COLORS.white}
						filled
						style={styles.mediumButton}
						onPress={navigateToRecommendation}
					/>
				</View>

				<View style={{
					flexDirection: "row",
					justifyContent: "space-between",
					padding: 10,
					alignItems: "center",
				}}>
					<TextInput placeholder="Search..." style={{
						height: 40,
						borderColor: COLORS.grey,
						borderWidth: 1,
						borderRadius: 10,
						paddingLeft: 10,
						flex: 1,
						marginRight: 10,
					}} />
					<Button
						title="Search for user"
						color={COLORS.grey}
						filled
						style={{
							width: "30%",
							height: 40,
							borderRadius: 30,
						}}
					/>
				</View>
				<View style={{
					height: 'auto',
					width: '98%',
					backgroundColor: COLORS.white,
					marginTop: 15,
					borderRadius: 10,
					shadowColor: COLORS.black,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.3,
					shadowRadius: 3,
					elevation: 5,
					alignSelf: 'center', // Center horizontally
					justifyContent: 'center', // Center vertically
				}}>
					<ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
						<TouchableOpacity style={styles.userContainer} >
							<View style={styles.nameContainer}>
								<Text style={styles.userName}>Fred</Text>
								<Button
									title="Follow +"
									color={COLORS.grey}
									filled
									style={styles.followButton}
								/>
							</View>
							<View style={styles.locationContainer}>
								<Text style={styles.locationText}>Location 1 Rating</Text>
							</View>
							<Image
								source={require("../assets/specialtybeer.png")} // Replace this with the actual path of your image
								style={styles.userImage}
							/>
							<Text style={styles.commentText}>{comment}</Text>
							<View style={styles.ratingContainer}>
								<View style={styles.ratingStarContainer}>
									<AirbnbRating
										count={5}
										defaultRating={3}
										size={20}
										selectedColor={COLORS.foam}
										unSelectedColor={COLORS.gray}
										reviews={[]}
										isDisabled={false}
										style={styles.ratingStyle}
									/>
								</View>
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={styles.userContainer}>
							<View style={styles.nameContainer}>
								<Text style={styles.userName}>Fred</Text>
								<Button
									title="Follow +"
									color={COLORS.grey}
									filled
									style={styles.followButton}
								/>
							</View>
							<View style={styles.locationContainer}>
								<Text style={styles.locationText}>Location 2 Rating</Text>
							</View>
							<Image
								source={require("../assets/brewlander.jpg")} // Replace this with the actual path of your image
								style={styles.userImage}
							/>
							<Text style={styles.commentText}>Drink is nice!!!</Text>
							<View style={styles.ratingContainer}>
								<View style={styles.ratingStarContainer}>
									<AirbnbRating
										count={5}
										defaultRating={3}
										size={20}
										selectedColor={COLORS.foam}
										unSelectedColor={COLORS.gray}
										reviews={[]}
										isDisabled={false}
										style={styles.ratingStyle}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		paddingTop: 30,
		backgroundColor: COLORS.orange,
		height: 70,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
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
	userContainer: {
		padding: 10,
		margin: 10,
		backgroundColor: COLORS.white,
		borderColor: COLORS.grey,
		borderWidth: 1,
		borderRadius: 10,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	nameContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.grey,
		padding: 5,
		marginBottom: 10,
		borderRadius: 8,
	},
	userName: {
		fontSize: 18,
		fontWeight: "bold",
		marginRight: 10,
	},
	followButton: {
		width: "20%",
		height: 40,
		borderRadius: 30,
	},
	locationContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: -3,
	},
	locationText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	userImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderRadius: 10,
		marginTop: 10,
	},
	commentText: {
		marginTop: 10,
		fontSize: 16,
	},
	ratingContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		backgroundColor: COLORS.orange,
		padding: 5,
		borderRadius: 8,
		height: 30,
	},
	ratingStarContainer: {
		position: "relative",
		top: -10,
		marginLeft: "auto",
		marginRight: 10,
	},
	ratingStyle: {
		position: "relative",
	},
	popOutContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 999,
	},
	popOutContent: {
		backgroundColor: COLORS.white,
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	popOutText: {
		fontSize: 18,
		marginBottom: 20,
		textAlign: "center",
	},
	popOutButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
	},
	popOutButtonText: {
		color: COLORS.white,
		fontSize: 16,
	},
});

export default Social;
