import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
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

const Posts = () => {
	const [popupVisible, setPopupVisible] = useState(false); // 1st popup
	const [popupVisible2, setPopupVisible2] = useState(false); // 2nd popup for comments
	const [comment, setcomment] = useState(null);

	const handlePopUp = (comment) => {
		setcomment(comment);
		setPopupVisible(!popupVisible);
	};

	const handlePopUp2 = () => {
		setPopupVisible2(!popupVisible2);
	};

	const comments = [
		{
			text: "Bitter, but it's decent",
			image: require("../../assets/beer.png"),
			description: "Bitter like my life",
		},
		{
			text: "Smooth and refreshing",
			image: require("../../assets/beer1.png"),
			description: "Smooth like butter",
		},
		{
			text: "Great aroma and flavor",
			image: require("../../assets/beer3.png"),
			description: "Nice smell i guess",
		},
		{
			text: "Not my favorite, too hoppy",
			image: require("../../assets/beer.png"),
			description: "Ya so I don't like beer",
		},
		{
			text: "Love the rich maltiness",
			image: require("../../assets/beer1.png"),
			description: "Rich is good",
		},
		{
			text: "Too bitter for my taste",
			image: require("../../assets/beer3.png"),
			description: "Very bitter, very salty",
		},
		{
			text: "Lacks complexity",
			image: require("../../assets/beer.png"),
			description: "Not smooth like butter already",
		},
		{
			text: "Delicious and well-balanced",
			image: require("../../assets/beer1.png"),
			description: "I can't even balance myself",
		},
		{
			text: "A bit watery, but still enjoyable",
			image: require("../../assets/beer3.png"),
			description: "Watery is bad",
		},
		{
			text: "Strong and full-bodied",
			image: require("../../assets/beer.png"),
			description: "Wow stronk stronk",
		},
	];

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
		>
			<SafeAreaView style={{ marginHorizontal: 20 }}>
				{comments.map((comment, index) => (
					<TouchableOpacity
						onPress={() => handlePopUp(comment)}
						key={index}
						style={{
							backgroundColor: COLORS.grey,
							borderWidth: 1,
							borderColor: 0,
							borderRadius: 15,
							padding: 10,
							marginBottom: 5,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Image
								source={comment.image}
								style={{
									width: 60,
									height: 60,
									borderRadius: 10,
									alignSelf: "flex-start",
								}}
								resizeMode="contain"
							/>
							<Text
								style={{
									...GlobalStyle.headerFont,
									fontSize: 15,
									marginHorizontal: 15,
								}}
							>
								{comment.text}
							</Text>
						</View>
						<CustomText style={{ marginTop: 22 }}>Posted by:</CustomText>
					</TouchableOpacity>
				))}

				{/* for popup */}
				<Modal visible={popupVisible} transparent animationType="fade">
					{/* <View> */}
					<View
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: COLORS.secondary,
							borderRadius: 10,
							paddingHorizontal: 20,
							elevation: 5,
						}}
					>
						<TouchableOpacity onPress={handlePopUp}>
							<Ionicons
								name="arrow-back"
								size={24}
								color={COLORS.black}
								style={{ marginTop: 12 }}
							/>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 20,
							}}
						>
							<Image
								source={require("../../assets/beer.png")}
								style={{
									width: 60,
									height: 60,
									borderRadius: 80,
									alignSelf: "flex-start",
								}}
								resizeMode="contain"
							/>
							<View style={{ flexDirection: "column", marginLeft: 15 }}>
								<Text style={{ ...GlobalStyle.headerFont, fontSize: 15 }}>
									username
								</Text>
								<CustomText style={{ fontSize: 12 }}>1 day ago</CustomText>
							</View>
						</View>
						{comment ? (
							<View>
								<Text style={{ ...GlobalStyle.headerFont, fontSize: 18 }}>
									{comment.text}
								</Text>
								<CustomText>{comment.description}</CustomText>
							</View>
						) : (
							<CustomText>No comment selected</CustomText>
						)}
						<Button
							title="+ Add a comment"
							onPress={handlePopUp2}
							filled
							style={{
								elevation: 2,
								borderColor: 0,
								marginTop: 20,
							}}
						/>
						{/* 2nd popup */}
						<Modal visible={popupVisible2} transparent animationType="slide">
							<View
								style={{
									flex: 1,
									backgroundColor: COLORS.overlay,
									justifyContent: "flex-end",
									alignItems: "center",
								}}
							>
								<View
									style={{
										backgroundColor: COLORS.secondary,
										width: "100%",
										padding: 20,
										borderColor: COLORS.black,
										borderWidth: 1,
										borderTopLeftRadius: 20,
										borderTopRightRadius: 20,
									}}
								>
									<View
										style={{
											height: 45,
											borderColor: 0,
											borderWidth: 1,
											borderRadius: 10,
											alignItems: "center",
											justifyContent: "center",
											paddingLeft: 22,
											marginVertical: 20,
											backgroundColor: COLORS.grey,
										}}
									>
										<TextInput
											placeholder="Type a comment here"
											keyboardType="default"
										/>
									</View>
									<Button
										title="Submit"
										onPress={handlePopUp2}
										filled
										style={{
											elevation: 2,
											borderColor: 0,
										}}
									/>
								</View>
							</View>
						</Modal>
					</View>
					{/* </View> */}
				</Modal>
			</SafeAreaView>
		</ScrollView>
	);
};

const Forum = ({ navigation }) => {
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
							title="My Feed"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("Social")}
						/>
						<Button
							title="Forums"
							color={COLORS.foam}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("Forums")}
						/>
						<Button
							title="Refer a friend"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("ReferAFriend")}
						/>
						<Button
							title="Recommendation"
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("Recommendation")}
						/>
					</View>
					<View style={{ marginHorizontal: 20, flexDirection: "row" }}>
						<View style={styles.newPost}>
							<TextInput
								placeholder="What's going on your mind?"
								keyboardType="default"
								style={{ flex: 1 }}
							/>
						</View>
						<Button
							title="Create post"
							color={COLORS.foam}
							filled
							style={{
								width: 100,
								height: 50,
								marginVertical: 20,
								borderRadius: 10,
								marginLeft: 10,
							}}
							// onPress={navigateToNewPost}
						/>
					</View>

					<Posts />
				</SafeAreaView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	grid: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
	},
	longButton: {
		width: "20%",
		height: 55,
		marginVertical: 0,
		borderRadius: 20,
		marginRight: 15,
		borderColor: 0,
		elevation: 2,
	},
	button: {
		paddingVertical: 10,
		borderColor: COLORS.grey,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	newPost: {
		flex: 1,
		height: 50,
		borderColor: 0,
		borderWidth: 1,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 22,
		marginVertical: 20,
		backgroundColor: COLORS.grey,
		flexDirection: "row",
	},
});

export default Forum;
