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

const PopOut = (props) => {
	return (
		<Modal visible={props.visible} transparent={true} animationType="fade">
			<View style={styles.popOutContainer}>
				<View style={styles.popOutContent}>
					<Text style={styles.popOutText}>{props.text}</Text>
					<TouchableOpacity style={styles.popOutButton} onPress={props.onPress}>
						<Text style={styles.popOutButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const ReferAFriend = () => {
	const navigation = useNavigation();
	const [comment, setComment] = useState("Bitter, but it's decent");
	const [comments, setComments] = useState([]);
	const [popOutVisible, setPopOutVisible] = useState(false);

	const handleComment = () => {
		setComments([...comments, comment]);
		setComment("");
	};

	const showPopOut = () => {
		setPopOutVisible(true);
	};

	const closePopOut = () => {
		setPopOutVisible(false);
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
								Your referral code: XYZABC
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
								borderBottomColor: COLORS.black,
								borderBottomWidth: 1,
								marginVertical: 20,
							}}
						/>
						<Text
							style={{
								...GlobalStyle.headerFont,
							}}
						>
							Have a referral?
						</Text>
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
							/>
						</View>
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
