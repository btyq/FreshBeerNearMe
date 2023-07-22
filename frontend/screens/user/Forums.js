import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useCookies } from "../../CookieContext";

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

const Posts = ( {postData} ) => {
	const [popupVisible, setPopupVisible] = useState(false); // 1st popup
	const [popupVisible2, setPopupVisible2] = useState(false); // 2nd popup for comments
	const [comment, setcomment] = useState(null);

	const handlePopUp = (post) => {
		setcomment(post);
		setPopupVisible(!popupVisible);
	};

	const handlePopUp2 = () => {
		setPopupVisible2(!popupVisible2);
	};
	
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
		>
			<SafeAreaView style={{ marginHorizontal: 20 }}>
				{postData.map((post, index) => ( 
				<TouchableOpacity
					onPress={() => handlePopUp(post)}
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
						source={require("../../assets/beer.png")}
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
						{post.postTitle}
					</Text>
					</View>
					<CustomText style={{ marginTop: 22 }}>Posted by: {post.username}</CustomText>
				</TouchableOpacity>
				))}
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
									backgroundColor: "rgba(0, 0, 0, 0.5)",
									justifyContent: "flex-end",
									alignItems: "center",
								}}
							>
								<View
									style={{
										backgroundColor: COLORS.secondary,
										width: "100%",
										padding: 20,
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
	const { cookies } = useCookies();
	const [title, setTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");
	const [showCreatePostModal, setShowCreatePostModal] = useState(false);
	const [postData, setPostData] = useState([]);

	const toggleCreatePostModal = () => {
		setShowCreatePostModal(!showCreatePostModal);
	}

	const submitPost = () => {
		console.log(postData);
		toggleCreatePostModal();
	}

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getPosts")
			.then((response) => {
				setPostData(response.data.posts)
			})
			.catch((error) => {
				console.error("Error retrieving posts:", error);
			})
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
								value={title}
								onChangeText={(text) => setTitle(text)}
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
							onPress={toggleCreatePostModal}
						/>
						<Modal visible={showCreatePostModal} transparent animationType="fade">
							<View
								style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								}}
							>
								<View
								style={{
									backgroundColor: COLORS.secondary,
									width: "80%",
									borderRadius: 20,
									padding: 20,
									elevation: 5,
								}}
								>
								<Text style={{ ...GlobalStyle.headerFont, fontSize: 18, marginBottom: 10 }}>
									Create a New Post
								</Text>
								<TextInput
									placeholder="What's going on your mind?"
									keyboardType="default"
									style={{
									height: 100,
									borderColor: COLORS.grey,
									borderWidth: 1,
									borderRadius: 10,
									paddingHorizontal: 10,
									marginBottom: 10,
									}}
									multiline
									numberOfLines={4}
									value={title}
									onChangeText={(text) => setTitle(text)}
								/>
								<TextInput
									placeholder="Description"
									keyboardType="default"
									style={{
									height: 100,
									borderColor: COLORS.grey,
									borderWidth: 1,
									borderRadius: 10,
									paddingHorizontal: 10,
									marginBottom: 10,
									}}
									multiline
									numberOfLines={4}
									value={postDescription}
									onChangeText={(text) => setPostDescription(text)}
								/>
								<Button
									title="Submit Post"
									color={COLORS.foam}
									filled
									style={{ width: "50%", alignSelf: "center", borderRadius: 10 }}
									onPress={submitPost}
								/>
								</View>
							</View>
						</Modal>
					</View>
					<Posts postData={postData} />
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
