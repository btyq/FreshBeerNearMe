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

// popup to redeem awards
const PopUp = ({ visible, onClose }) => {
	const [popupVisible2, setPopupVisible2] = useState(false); // 2nd popup

	const handlePopUp2 = () => {
		setPopupVisible2(!popupVisible2); // 2nd popup
	};

	return (
		<Modal visible={visible} transparent animationType="slide">
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
				<TouchableOpacity onPress={onClose}>
					<Ionicons
						name="arrow-back"
						size={24}
						color={COLORS.black}
						style={{ marginTop: 12 }}
					/>
				</TouchableOpacity>
				<View style={{ marginTop: 20, marginHorizontal: 12 }}>
					<TouchableOpacity
						style={{
							width: "100%",
							borderColor: 0,
							paddingHorizontal: 20,
							paddingVertical: 10,
							borderRadius: 5,
							backgroundColor: COLORS.grey,
							elevation: 2,
						}}
						onPress={handlePopUp2}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								source={require("../../assets/beer.png")}
								style={{
									height: 70,
									width: 70,
									marginRight: 10,
								}}
								resizeMode="contain"
							></Image>
							<CustomText>Redeem a Free Drink</CustomText>
						</View>

						{/* 2nd popup */}
						<Modal visible={popupVisible2} transparent animationType="fade">
							<View
								style={{
									flex: 1,
									backgroundColor: "rgba(0, 0, 0, 0.5)",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<View
									style={{
										width: "80%",
										backgroundColor: COLORS.white,
										borderRadius: 40,
										padding: 30,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<CustomText>Are you sure you want to redeem?</CustomText>
									<Button
										title="Yes"
										filled
										style={{
											width: "40%",
											borderRadius: 10,
											marginTop: 15,
											borderColor: 0,
											elevation: 2,
										}}
										onPress={handlePopUp2}
									/>
								</View>
							</View>
						</Modal>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							width: "100%",
							borderColor: 0,
							paddingHorizontal: 20,
							paddingVertical: 10,
							borderRadius: 5,
							marginTop: 20,
							backgroundColor: COLORS.grey,
							elevation: 2,
						}}
						onPress={handlePopUp2}
					>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								source={require("../../assets/event1.png")}
								style={{
									height: 70,
									width: 70,
									marginRight: 10,
								}}
								resizeMode="contain"
							></Image>
							<CustomText>30% of Total Bill</CustomText>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const ReferAFriend = ({ navigation }) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const { cookies } = useCookies();
	const [userID, setUserID] = useState("");
	const [userData, setUserData] = useState([]);
	const [referralCode, setReferralCode] = useState("");

	const handlePopup = () => {
		setPopupVisible(!popupVisible); // created 1st modal
	};

	const submitReferral = () => {
		const data = {
			userID: userID,
			referralCode: referralCode,
		};
		axios
			.post("http://10.0.2.2:3000/submitReferralCode", data)
			.then((response) => {
				if (response.data.success) {
					const { username } = response.data;
					Alert.alert(
						"Success!",
						`You claimed a referral from ${username}. Both of you gained 50 points!`
					);
				} else {
					const { message } = response.data;
					Alert.alert("Error!", message);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		setUserID(cookies.userID);
		axios
			.get("http://10.0.2.2:3000/getReferralCode", {
				params: {
					userID: cookies.userID,
				},
			})
			.then((response) => {
				const { referralCode, referralPoints } = response.data;
				setUserData({ referralCode, referralPoints });
			})
			.catch((error) => {
				console.error("Error retrieving userData:", error);
			});
	}, [submitReferral]);

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
							color={COLORS.foam}
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

					<View style={{ marginHorizontal: 20, marginVertical: 20 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<CustomText style={{ fontSize: 15 }}>
								Your referral code: {userData.referralCode}
							</CustomText>
							<Button
								title="Copy"
								color={COLORS.foam}
								filled
								style={{
									width: "20%",
									borderRadius: 30,
									borderColor: 0,
								}}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: 10,
							}}
						>
							<CustomText style={{ fontSize: 15 }}>
								Your points: {userData.referralPoints}
							</CustomText>
							<Button
								title="Redeem"
								onPress={handlePopup}
								color={COLORS.foam}
								filled
								style={{
									width: "20%",
									borderRadius: 30,
									borderColor: 0,
								}}
							/>
							<PopUp visible={popupVisible} onClose={handlePopup} />
						</View>

						<View
							style={{
								borderBottomColor: COLORS.black,
								borderBottomWidth: 1,
								marginVertical: 20,
							}}
						/>
						<Text style={{ ...GlobalStyle.headerFont }}>Have a referral?</Text>
						<View
							style={{
								height: 50,
								backgroundColor: COLORS.white,
								borderRadius: 10,
								flexDirection: "row",
								paddingHorizontal: 20,
								alignItems: "center",
								marginTop: 12,
								marginBottom: 12,
								marginRight: 5,
								elevation: 2,
							}}
						>
							<TextInput
								placeholder="eg. XYZABC"
								style={{ ...GlobalStyle.bodyFont }}
								value={referralCode}
								onChangeText={(text) => setReferralCode(text)}
							/>
						</View>
						<View
							style={{
								justifyContent: "center",
								alignItems: "flex-end",
							}}
						>
							<Button
								title="Submit"
								color={COLORS.foam}
								filled
								style={{
									width: "40%",
									borderRadius: 10,
									marginBottom: 15,
									borderColor: 0,
									elevation: 2,
								}}
								onPress={submitReferral}
							/>
						</View>
						<CustomText>Your Rewards</CustomText>
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
});

export default ReferAFriend;
