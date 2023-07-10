import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCookies } from "../CookieContext";
import COLORS from "../constants/colors";
import GlobalStyle from "../utils/GlobalStyle";

// CODES TO STYLE BUTTON
const Button = (props) => {
	const filledBgColor = props.color || COLORS.yellow;
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
			<Text
				style={{
					fontSize: 15,
					...GlobalStyle.headerFont,
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

// custom alert
const CustomAlert = ({ visible, onClose }) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
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
					}}
				>
					<Ionicons
						name="md-beer"
						size={34}
						color={COLORS.foam}
						style={{ alignSelf: "center" }}
					/>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							alignSelf: "center",
							marginBottom: 20,
						}}
					>
						Login Failed
					</Text>
					<Text style={{ fontSize: 16, marginBottom: 20 }}>
						Unable to login! Please enter a valid user account credentials
					</Text>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.foam,
							padding: 10,
							borderRadius: 8,
							alignItems: "center",
							marginHorizontal: 22,
						}}
						onPress={onClose}
					>
						<Text
							style={{ color: COLORS.black, fontWeight: "bold", fontSize: 16 }}
						>
							OK
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

// CODES FOR THE MAIN PAGE
const Welcome = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const { setCookies } = useCookies();
	const [selected, setSelected] = useState("");
	const data = [
		{ key: "1", value: "User" },
		{ key: "2", value: "Venue Owner" },
		{ key: "3", value: "Admin" },
	];
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const freshnessResponse = await axios.post("http://10.0.2.2:3000/readFreshness");
			
			const temperatureResponse = await axios.post("http://10.0.2.2:3000/readTemperature");
			
		  } catch (error) {
			console.log('An error occurred:', error.message);
		  }
		};
	
		fetchData(); 
	  }, []);

	const handleUserLogin = async () => {
		try {
			const response = await axios.post("http://10.0.2.2:3000/userLogin", {
				username: username,
				password: password,
			});

			if (response.data.success) {
				const { userID, username } = response.data;
				const sessionToken = "testtoken123";
				setCookies({ sessionToken, userID, username });
				navigation.navigate("BottomTabNavigation", { screen: "Dashboard" });
			} else {
				const { message } = response.data;
				console.log("Login failed:", message);
				setIsDialogVisible(true);
			}
		} catch (error) {
			console.log("An error occurred:", error.message);
		}
	};

	const handleVenueOwnerLogin = async () => {
		try {
			const response = await axios.post(
				"http://10.0.2.2:3000/venueOwnerLogin",
				{
					username: username,
					password: password,
				}
			);

			if (response.data.success) {
				const { venueOwnerID, username } = response.data;
				const sessionToken = "testtoken123";
				setCookies({ sessionToken, venueOwnerID, username });
				navigation.navigate("VenueOwnerHome");
			} else {
				const { message } = response.data;
				console.log("Login failed:", message);
				setIsDialogVisible(true);
			}
		} catch (error) {
			console.log("An error occurred:", error.message);
		}
	};

	const handleAdminLogin = async () => {
		try {
			const response = await axios.post("http://10.0.2.2:3000/adminLogin", {
				username: username,
				password: password,
			});

			if (response.data.success) {
				const { userID, password } = response.data;
				const sessionToken = "testtoken123";
				setCookies({ sessionToken, userID });
				navigation.navigate("BottomTabNavigation", { screen: "Dashboard" });
			} else {
				const { message } = response.data;
				console.log("Login failed:", message);
				setIsDialogVisible(true);
			}
		} catch (error) {
			console.log("An error occurred:", error.message);
		}
	};

	const handleLogin = () => {
		if (selected === "1") {
			handleUserLogin();
		} else if (selected === "2") {
			handleVenueOwnerLogin();
		} else if (selected === "3") {
			handleAdminLogin();
		}
	};

	const handleCloseDialog = () => {
		setIsDialogVisible(false);
	};

	return (
		<SafeAreaView style={{ flex: 1 }} backgroundColor={COLORS.foam}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1 }}>
					<Image
						source={require("../assets/freshbeer.png")}
						style={{
							//marginTop: 20,
							height: 250,
							width: 270,
							alignSelf: "center",
							resizeMode: "contain",
						}}
					></Image>
				</View>

				<View
					style={{
						paddingHorizontal: 20,
						position: "absolute",
						top: 200,
						width: "100%",
					}}
				>
					<View style={{ flex: 1, marginHorizontal: 22 }}>
						<View style={{ marginBottom: 12 }}>
							<View
								style={{
									width: "100%",
									height: 50,
									borderRadius: 12,
									alignItems: "center",
									justifyContent: "center",
									paddingLeft: 22,
									marginTop: 15,
									backgroundColor: COLORS.white,
								}}
							>
								<TextInput
									value={username}
									onChangeText={setUsername}
									placeholder="Username"
									placeholderTextColor={COLORS.black}
									keyboardType="default"
									style={{
										width: "100%",
									}}
								></TextInput>
							</View>
						</View>

						<View style={{ marginBottom: 12 }}>
							<View
								style={{
									width: "100%",
									height: 50,
									borderRadius: 12,
									alignItems: "center",
									justifyContent: "center",
									paddingLeft: 22,
									backgroundColor: COLORS.white,
								}}
							>
								<TextInput
									value={password}
									onChangeText={setPassword}
									placeholder="Password"
									placeholderTextColor={COLORS.black}
									secureTextEntry={!isPasswordShown}
									style={{
										width: "100%",
									}}
								></TextInput>

								<TouchableOpacity
									onPress={() => setIsPasswordShown(!isPasswordShown)}
									style={{
										position: "absolute",
										right: 12,
									}}
								>
									{isPasswordShown == true ? (
										<Ionicons
											name="eye"
											size={24}
											color={COLORS.black}
										></Ionicons>
									) : (
										<Ionicons
											name="eye-off"
											size={24}
											color={COLORS.black}
										></Ionicons>
									)}
								</TouchableOpacity>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								marginBottom: 22,
							}}
						>
							<Pressable onPress={() => navigation.navigate("Signup")}>
								<Text
									style={{
										color: COLORS.black,
										marginLeft: 4,
										elevation: 2,
									}}
								>
									Forgot your password?
								</Text>
							</Pressable>
						</View>

						<View style={{ marginBottom: 22 }}>
							<SelectList
								data={data}
								value={selected}
								setSelected={setSelected}
								boxStyles={{
									borderRadius: 12,
									borderColor: 0,
									position: "absolute",
									backgroundColor: COLORS.white,
									opacity: 1,
									width: "100%",
								}}
								dropdownStyles={{
									position: "absolute",
									top: "110%",
									width: "100%",
									right: 0,
									borderColor: 0,
									backgroundColor: COLORS.white,
									opacity: 1,
								}}
								defaultOption={{ key: "1", value: "User" }}
								search={false}
							/>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								zIndex: -5,
								marginVertical: 18,
							}}
						>
							<Button
								title="Login"
								onPress={handleLogin}
								color={COLORS.white}
								filled
								style={{
									marginTop: 15,
									width: "100%",
									marginBottom: 4,
								}}
							></Button>
							<CustomAlert
								visible={isDialogVisible}
								onClose={handleCloseDialog}
							/>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
							}}
						>
							<View
								style={{
									flex: 1,
									height: 1,
									backgroundColor: COLORS.black,
									marginHorizontal: 10,
								}}
							></View>
							<Text style={{ fontSize: 14 }}>Or log in with</Text>
							<View
								style={{
									flex: 1,
									height: 1,
									backgroundColor: COLORS.black,
									marginHorizontal: 10,
									zIndex: -5,
								}}
							></View>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
							}}
						>
							<TouchableOpacity
								onPress={() => console.log("Pressed")}
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "row",
									height: 52,
									marginRight: 4,
									borderRadius: 10,
									paddingHorizontal: 15, // Add horizontal padding to create space
									backgroundColor: COLORS.white,
								}}
							>
								<Image
									source={require("../assets/facebook.png")}
									style={{
										height: 26,
										width: 26,
										marginRight: 4,
									}}
									resizeMode="contain"
								></Image>
								<Text>Facebook</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => console.log("Pressed")}
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "row",
									height: 52,
									marginRight: 4,
									borderRadius: 10,
									paddingHorizontal: 10, // Add horizontal padding to create space
									backgroundColor: COLORS.white,
								}}
							>
								<Image
									source={require("../assets/google.png")}
									style={{
										height: 26,
										width: 26,
										marginRight: 8,
									}}
									resizeMode="contain"
								></Image>
								<Text>Google</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => console.log("Pressed")}
								style={{
									flex: 1,
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "row",
									height: 52,
									marginRight: 4,
									borderRadius: 10,
									paddingHorizontal: 10, // Add horizontal padding to create space
									backgroundColor: COLORS.white,
								}}
							>
								<Image
									source={require("../assets/email.png")}
									style={{
										height: 36,
										width: 36,
										marginRight: 8,
									}}
									resizeMode="contain"
								></Image>
								<Text>Email</Text>
							</TouchableOpacity>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								marginVertical: 22,
							}}
						>
							<CustomText style={{ fontSize: 16 }}>
								Don't have an account?
							</CustomText>
							<Pressable onPress={() => navigation.navigate("Signup")}>
								<Text
									style={{
										fontSize: 16,
										...GlobalStyle.headerFont,
										marginLeft: 6,
									}}
								>
									Register
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingBottom: 10,
		paddingVertical: 10,
		borderColor: 0,
		borderWidth: 2,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
});
export default Welcome;
