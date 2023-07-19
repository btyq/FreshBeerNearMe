import { Feather, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
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
import { useCookies } from "../../CookieContext";
import axios from "axios";

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

const RecommendationItem = ({ data }) => {
	if (data.venueID) {
	  return (
		<TouchableOpacity
		  style={{
			backgroundColor: COLORS.grey,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginTop: 5,
			borderRadius: 20,
			padding: 10,
			borderWidth: 1,
			borderColor: 0,
		  }}
		  //onPress={}
		>
		  <CustomText style={{ marginLeft: 10 }}>Venue Name: {data.venueName}</CustomText>
		  <AirbnbRating
			count={5}
			defaultRating={data.venueRating}
			showRating={false}
			size={16}
			isDisabled={true}
		  />
		</TouchableOpacity>
	  );
	} else if (data.beerID) {
	  return (
		<TouchableOpacity
		  style={{
			backgroundColor: COLORS.grey,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginTop: 5,
			borderRadius: 20,
			padding: 10,
			borderWidth: 1,
			borderColor: 0,
		  }}
		  //onPress={}
		>
		  <CustomText style={{ marginLeft: 10 }}>Beer Name: {data.beerName}</CustomText>
		  <AirbnbRating
			count={5}
			defaultRating={data.rating}
			showRating={false}
			size={16}
			isDisabled={true}
		  />
		</TouchableOpacity>
	  );
	}
  };


const Recommendation = ({ navigation }) => {
	const [modalVisible1, setModalVisible1] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const { cookies } = useCookies();
	const [userID, setUserID] = useState(""); 
	const [recommendationData, setRecommendationData] = useState([]);

	useEffect(() => {
		setUserID(cookies.userID);
		axios
			.get("http://10.0.2.2:3000/getRecommendation", {
				params: {
					userID : cookies.userID
				}
			})
			.then((response) => {
				setRecommendationData(response.data);
			})
			.catch((error) => {
				console.error("Error retrieving recommendation:", error);
			})
	}, []);

	const handleComment = () => {
		setComments([...comments, comment]);
		setComment("");
	};

	const showModal1 = () => {
		setModalVisible1(true);
		console.log(recommendationData);
	};

	const showModal2 = () => {
		setModalVisible2(true);
	};

	const closeModal = () => {
		setModalVisible1(false);
		setModalVisible2(false);
	};

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
							color={COLORS.white}
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
							color={COLORS.foam}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("Recommendation")}
						/>
					</View>

					<View style={{ marginHorizontal: 20, marginVertical: 20 }}>
						<Text
							style={{
								...GlobalStyle.headerFont,
								marginTop: 22,
								marginLeft: 15,
								marginBottom: 12,
							}}
						>
							Your turn to recommend a beer!
						</Text>
						<View style={{ flexDirection: "row" }}>
							<View
								style={{
									height: 45,
									width: "70%",
									backgroundColor: COLORS.grey,
									borderRadius: 20,
									flexDirection: "row",
									paddingHorizontal: 20,
									alignItems: "center",
									marginBottom: 12,
									marginRight: 5,
								}}
							>
								<Feather name="search" size={24} />
								<TextInput
									placeholder="Search for beer"
									style={{ flex: 1, marginLeft: 12, ...GlobalStyle.bodyFont }}
								/>
							</View>
							<Button
								title="Search"
								color={COLORS.foam}
								filled
								style={{
									width: "30%",
									height: 45,
									borderRadius: 30,
									borderColor: 0,
								}}
							/>
						</View>

						<TouchableOpacity
							style={{
								backgroundColor: COLORS.grey,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginTop: 5,
								borderRadius: 20,
								padding: 10,
								borderWidth: 1,
								borderColor: 0,
							}}
							onPress={showModal1}
						>
							<CustomText
								style={{
									marginLeft: 10,
								}}
							>
								Beer Name
							</CustomText>
							<AirbnbRating
								count={5}
								defaultRating={4}
								showRating={false}
								size={16}
								isDisabled={true}
							/>
						</TouchableOpacity>
						<View style={{ marginTop: 12 }}>
							<Button
								title="Recommend!"
								color={COLORS.foam}
								filled
								style={{
									//	width: "30%",
									height: 45,
									borderRadius: 30,
									borderColor: 0,
								}}
							/>
						</View>
						<ScrollView>
							<Text
								style={{
									...GlobalStyle.headerFont,
									marginVertical: 12,
									marginLeft: 15,
								}}
							>
								Your friends' recommendations
							</Text>
							{recommendationData.map((item, index) => (
								<RecommendationItem key={index} data={item} />
							))}		
						</ScrollView>
					</View>
				</SafeAreaView>
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
	inputContainer: {
		height: 60,
		width: "100%",
		backgroundColor: COLORS.white,
		borderRadius: 10,
		position: "absolute",
		top: 90,
		flexDirection: "row",
		paddingHorizontal: 20,
		alignItems: "center",
		elevation: 12,
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
