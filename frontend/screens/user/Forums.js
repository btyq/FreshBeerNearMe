import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Alert,
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
import { useCookies } from "../../CookieContext";
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

// for popup
const PostItem = ({
	postID,
	postUser,
	postTitle,
	postDate,
	postDescription,
	username,
	comments,
	onCommentSubmitted,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupVisible2, setPopupVisible2] = useState(false); // created 2nd modal
	const [comment, setComment] = useState("");
	const { cookies } = useCookies();

	const handlePopup = () => {
		setPopupVisible(!popupVisible); // created 1st modal
	};

	const handlePopUp2 = () => {
		setPopupVisible2(!popupVisible2); // created 2nd modal
	};

	const submitComment = () => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;

		const data = {
			userID: cookies.userID,
			postID: postID,
			commentDescription: comment,
			commentDate: formattedDate,
		};
		axios
			.post("http://10.0.2.2:3000/submitComment", data)
			.then((response) => {
				if (response.data.success) {
					setPopupVisible2(!popupVisible2);
					setComment("");
					Alert.alert("Commented!");
					onCommentSubmitted();
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message);
					setPopupVisible2(!popupVisible2);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<View style={styles.subContainer}>
			<TouchableOpacity style={styles.itemContainer} onPress={handlePopup}>
				<View
					style={{
						paddingHorizontal: 10,
						paddingVertical: 5,
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
						}}
						resizeMode="contain"
					/>
					<View style={{ marginLeft: 10, flex: 1 }}>
						<Text
							style={{
								...GlobalStyle.headerFont,
								fontSize: 15,
								flexWrap: "wrap",
							}}
						>
							{postTitle}
						</Text>
						<CustomText style={{ flexWrap: "wrap" }}>
							Posted by: {username}
						</CustomText>
					</View>
				</View>
			</TouchableOpacity>

			{/* 1st popup */}
			<Modal visible={popupVisible} transparent animationType="fade">
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
					<TouchableOpacity onPress={handlePopup}>
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
								{username}
							</Text>
							<CustomText style={{ fontSize: 12 }}>{postDate}</CustomText>
						</View>
					</View>

					<SafeAreaView style={{ flex: 1 }}>
						<ScrollView showsVerticalScrollIndicator={false}>
							<Text style={{ ...GlobalStyle.headerFont, fontSize: 18 }}>
								{postTitle}
							</Text>
							<CustomText>{postDescription}</CustomText>
							<View>
								<View
									style={{
										borderBottomWidth: 1,
										borderBottomColor: COLORS.black,
										marginVertical: 10,
									}}
								></View>
								<Button
									title="+ Add a comment"
									onPress={handlePopUp2}
									filled
									style={{
										width: "50%",
										elevation: 2,
										borderColor: 0,
										marginVertical: 10,
									}}
								/>
								{comments && comments.length > 0 && (
									<View>
										{comments.map((comment) => (
											<View key={comment.commentID}>
												<View
													style={{
														flexDirection: "row",
														justifyContent: "space-between",
													}}
												>
													<Text
														style={{
															...GlobalStyle.headerFont,
														}}
													>
														{comment.username}
													</Text>
													<CustomText>{comment.commentDate}</CustomText>
												</View>
												<CustomText style={{ marginBottom: 12 }}>
													{comment.commentDescription}
												</CustomText>
											</View>
										))}
									</View>
								)}
							</View>
						</ScrollView>
					</SafeAreaView>

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
								<TouchableOpacity onPress={handlePopUp2}>
									<Ionicons
										name="arrow-back"
										size={24}
										color={COLORS.black}
										style={{ marginTop: 12 }}
									/>
								</TouchableOpacity>
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
										style={{ ...GlobalStyle.bodyFont, width: "100%" }}
										keyboardType="default"
										value={comment}
										onChangeText={(text) => setComment(text)}
									/>
								</View>

								<Button
									title="Submit"
									onPress={submitComment}
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
			</Modal>
		</View>
	);
};

const Forum = ({ navigation }) => {
	const { cookies } = useCookies();
	const [title, setTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");
	const [showCreatePostModal, setShowCreatePostModal] = useState(false);
	const [postData, setPostData] = useState([]);
	const [commentSubmitted, setCommentSubmitted] = useState(false);
	const [postSubmitted, setPostSubmitted] = useState(false);

	const toggleCreatePostModal = () => {
		setShowCreatePostModal(!showCreatePostModal);
	};

	const submitPost = () => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;

		const data = {
			userID: cookies.userID,
			postTitle: title,
			postDate: formattedDate,
			postDescription: postDescription,
		};
		axios
			.post("http://10.0.2.2:3000/submitPost", data)
			.then((response) => {
				if (response.data.success) {
					setTitle("");
					setPostDescription("");
					toggleCreatePostModal();
					Alert.alert("Posted!");
					setPostSubmitted(true);
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message);
					toggleCreatePostModal();
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleCommentSubmitted = () => {
		setCommentSubmitted(true);
	};

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getPosts")
			.then((response) => {
				setPostData(response.data.posts);
				setCommentSubmitted(false);
				setPostSubmitted(false);
			})
			.catch((error) => {
				console.error("Error retrieving posts:", error);
			});
	}, [commentSubmitted, postSubmitted]);

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
							title="Recommendations"
							color={COLORS.white}
							filled
							style={{
								width: "35%",
								height: 55,
								marginVertical: 0,
								borderRadius: 20,
								marginRight: 10,
								borderColor: 0,
								elevation: 2,
							}}
							onPress={() => navigation.navigate("Recommendation")}
						/>
					</View>
					<View style={styles.postContainer}>
						<TextInput
							placeholder="What's going on your mind?"
							style={{
								...styles.postInput,
								...GlobalStyle.bodyFont,
								fontSize: 12,
							}}
							value={title}
							onChangeText={(text) => setTitle(text)}
						/>
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
					</View>

					<View style={styles.container}>
						<ScrollView
							contentContainerStyle={{ paddingBottom: 30 }}
							showsVerticalScrollIndicator={false}
						>
							{postData.map((post) => (
								<PostItem
									key={post.postID}
									postID={post.postID}
									postUser={post.postUser}
									postTitle={post.postTitle}
									postDescription={post.postDescription}
									username={post.username}
									postDate={post.postDate}
									comments={post.comments}
									onCommentSubmitted={handleCommentSubmitted}
								/>
							))}
						</ScrollView>
					</View>

					{/* create new post */}
					<Modal
						visible={showCreatePostModal}
						transparent
						animationType="slide"
					>
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
							<TouchableOpacity onPress={toggleCreatePostModal}>
								<Ionicons
									name="arrow-back"
									size={24}
									color={COLORS.black}
									style={{ marginTop: 12 }}
								/>
							</TouchableOpacity>
							<View style={{ marginTop: 20, marginHorizontal: 12 }}>
								<Text
									style={{
										...GlobalStyle.headerFont,
										fontSize: 18,
										marginBottom: 10,
									}}
								>
									Create a New Post
								</Text>
								<TextInput
									placeholder="Post title"
									keyboardType="default"
									style={{
										borderColor: 0,
										borderWidth: 1,
										borderRadius: 15,
										paddingHorizontal: 10,
										backgroundColor: COLORS.grey,
										elevation: 2,
										...GlobalStyle.bodyFont,
										textAlignVertical: "top",
										paddingTop: 15,
									}}
									multiline
									numberOfLines={4}
									value={title}
									onChangeText={(text) => setTitle(text)}
								/>
								<TextInput
									placeholder=" Post description"
									keyboardType="default"
									style={{
										height: 300,
										width: "100%",
										elevation: 2,
										backgroundColor: COLORS.grey,
										marginVertical: 10,
										borderRadius: 15,
										borderColor: 0,
										paddingHorizontal: 12,
										...GlobalStyle.bodyFont,
										textAlignVertical: "top",
										paddingTop: 15,
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
									onPress={submitPost}
								/>
							</View>
						</View>
					</Modal>
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
		width: "18%",
		height: 55,
		marginVertical: 0,
		borderRadius: 20,
		marginRight: 10,
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
	postContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 12,
	},
	postInput: {
		flex: 1,
		height: 50,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 10,
		paddingHorizontal: 20,
		marginRight: 10,
		backgroundColor: COLORS.grey,
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
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		borderColor: 0,
	},
});

export default Forum;
