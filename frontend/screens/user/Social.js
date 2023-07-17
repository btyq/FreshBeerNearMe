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

const Social = ({ navigation }) => {
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
							color={COLORS.foam}
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
							color={COLORS.white}
							filled
							style={styles.longButton}
							onPress={() => navigation.navigate("Recommendation")}
						/>
					</View>

					<View style={styles.searchContainer}>
						<TextInput placeholder="Search..." style={styles.searchInput} />
					</View>

					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
					>
						<View style={{ marginHorizontal: 20 }}>
							{/* rated beer name */}
							<View style={styles.feedContainer}>
								<View style={{ marginHorizontal: 12 }}>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
											backgroundColor: COLORS.grey,
											marginTop: 5,
										}}
									>
										<Text style={{ ...GlobalStyle.headerFont, fontSize: 18 }}>
											Fred
										</Text>
										<Button
											title="Follow"
											filled
											style={{
												width: "50%",
												borderRadius: 30,
												borderColor: 0,
											}}
										/>
									</View>

									<View>
										<Text
											style={{
												...GlobalStyle.headerFont,
												fontSize: 14,
												marginTop: 12,
											}}
										>
											Rated beer name
										</Text>
									</View>
									<Image
										source={require("../../assets/specialtybeer.png")}
										style={styles.feedImage}
									/>
									<CustomText style={{ marginTop: 10 }}>
										Bitter but its decent
									</CustomText>

									<View
										style={{
											flexDirection: "row",
											justifyContent: "flex-end",
										}}
									>
										<AirbnbRating
											count={5}
											defaultRating={3}
											size={18}
											showRating={false}
											isDisabled={true}
										/>
									</View>
								</View>
							</View>

							{/* rated venue name */}
							<View style={styles.feedContainer}>
								<View style={{ marginHorizontal: 12 }}>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
											backgroundColor: COLORS.grey,
											marginTop: 5,
										}}
									>
										<Text style={{ ...GlobalStyle.headerFont, fontSize: 18 }}>
											Fred
										</Text>
										<Button
											title="Follow"
											filled
											style={{
												width: "50%",
												borderRadius: 30,
												borderColor: 0,
											}}
										/>
									</View>

									<View>
										<Text
											style={{
												...GlobalStyle.headerFont,
												fontSize: 14,
												marginTop: 12,
											}}
										>
											Rated venue name
										</Text>
									</View>
									<Image
										source={require("../../assets/specialtybeer.png")}
										style={styles.feedImage}
									/>
									<CustomText style={{ marginTop: 10 }}>
										Love the vibes, great variety of beers. Would come back
										again for a night out!
									</CustomText>

									<View
										style={{
											flexDirection: "row",
											justifyContent: "flex-end",
										}}
									>
										<AirbnbRating
											count={5}
											defaultRating={4}
											size={18}
											showRating={false}
											isDisabled={true}
										/>
									</View>
								</View>
							</View>
						</View>
					</ScrollView>
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
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 12,
	},
	searchInput: {
		flex: 1,
		height: 45,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 20,
		paddingHorizontal: 20,
		marginRight: 10,
		backgroundColor: COLORS.grey,
	},
	feedContainer: {
		backgroundColor: COLORS.grey,
		flexDirection: "column",
		width: "100%",
		borderRadius: 26,
		padding: 10,
		borderWidth: 1,
		borderColor: 0,
		marginVertical: 12,
	},
	feedImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderRadius: 10,
		marginTop: 10,
	},
});

export default Social;
