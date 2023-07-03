import { Ionicons, Octicons } from "@expo/vector-icons";
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
import COLORS from "../../constants/colors";

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

const BigContainer = () => {
	const comments = [
		{
			text: "Bitter, but it's decent",
			image: require("../../assets/beer.png"),
		},
		{
			text: "Smooth and refreshing",
			image: require("../../assets/beer1.png"),
		},
		{
			text: "Great aroma and flavor",
			image: require("../../assets/beer3.png"),
		},
		{
			text: "Not my favorite, too hoppy",
			image: require("../../assets/beer.png"),
		},
		{
			text: "Love the rich maltiness",
			image: require("../../assets/beer1.png"),
		},
		{
			text: "Too bitter for my taste",
			image: require("../../assets/beer3.png"),
		},
		{
			text: "Lacks complexity",
			image: require("../../assets/beer.png"),
		},
		{
			text: "Delicious and well-balanced",
			image: require("../../assets/beer1.png"),
		},
		{
			text: "A bit watery, but still enjoyable",
			image: require("../../assets/beer3.png"),
		},
		{
			text: "Strong and full-bodied",
			image: require("../../assets/beer.png"),
		},
	];

	const handleSubContainerPress = (index) => {
		console.log("Subcontainer clicked:", index);
		// Handle subcontainer click event here
		// You can navigate to another screen, show more details, etc.
	};

	return (
		<View style={styles.bigContainer}>
			<ScrollView>
				<View style={styles.content}>
					{/* Your content goes here */}
					{comments.map((comment, index) => (
						<TouchableOpacity
							key={index}
							style={styles.subContainer}
							onPress={() => handleSubContainerPress(index)}
						>
							<Text style={styles.subContainerText}>
								Posted by User {index + 1}
							</Text>
							{/* Second Subcontainer */}
							<View style={styles.secondSubContainer}>
								<Text style={styles.secondSubContainerText}>
									{comment.text}
								</Text>
								<Image
									source={comment.image}
									style={styles.image}
									resizeMode="contain"
								/>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

const Forum = () => {
	const navigation = useNavigation();

	const navigateToSocial = () => {
		navigation.navigate("Social");
	};

	const navigateToForums = () => {
		navigation.navigate("Forums");
	};

	const navigateToRateNReview = () => {
		navigation.navigate("RateNReview");
	};

	const navigateToReferAFriend = () => {
		navigation.navigate("ReferAFriend");
	};

	const navigateToRecommendation = () => {
		navigation.navigate("Recommendation");
	};

	const navigateToNewPost = () => {
		navigation.navigate("NewPost");
	};

	return (
		<View style={styles.container}>
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
						color={COLORS.grey}
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
					<Button
						title="+ New Post"
						color={COLORS.grey}
						filled
						style={{
							...styles.mediumButton,
							marginRight: 0,
							marginLeft: "auto",
							marginTop: 5,
						}}
						onPress={navigateToNewPost}
					/>
				</View>
				<BigContainer />
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	bigContainer: {
		height: 450, // Adjust the height value according to your requirement
		backgroundColor: COLORS.white,
		marginHorizontal: 10,
		marginTop: 10,
		padding: 20,
		borderRadius: 10,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
		borderWidth: 1,
		borderColor: COLORS.grey,
	},
	subContainer: {
		height: 120,
		backgroundColor: COLORS.grey,
		borderWidth: 1,
		borderColor: COLORS.grey,
		borderRadius: 10,
		padding: 10,
		marginVertical: 10,
	},
	secondSubContainer: {
		height: 55, // Adjust the height value according to your requirement
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.grey,
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
	},
	secondSubContainerText: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.black,
	},
	image: {
		width: 50,
		height: 50,
		alignSelf: "flex-end",
		marginTop: -35,
	},
	content: {
		flexGrow: 1,
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
		marginLeft: 0,
	},
	button: {
		paddingVertical: 10,
		borderColor: COLORS.grey,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	subContainerText: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.black,
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.white,
		paddingHorizontal: 20,
		borderRadius: 30,
		height: 50,
		marginRight: 10,
		borderWidth: 1,
		borderColor: COLORS.grey,
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		color: COLORS.black,
	},
	icon: {
		marginRight: 10,
	},
	popOutContainer: {
		flex: 1,
		backgroundColor: COLORS.modal,
		justifyContent: "center",
		alignItems: "center",
	},
	popOutContent: {
		backgroundColor: COLORS.white,
		padding: 20,
		borderRadius: 10,
	},
	popOutText: {
		fontSize: 18,
		marginBottom: 10,
		textAlign: "center",
	},
	popOutButton: {
		paddingVertical: 10,
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		alignSelf: "center",
	},
	popOutButtonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.white,
	},
});

export default Forum;
