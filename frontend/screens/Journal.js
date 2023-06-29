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

const Button = ({ title, selected, onSelect }) => {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: selected ? COLORS.foam : COLORS.white },
			]}
			onPress={() => onSelect(title)}
		>
			<Text style={{ color: selected ? COLORS.black : COLORS.black }}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const Journal = () => {
	const navigation = useNavigation();
	const [selectedButton, setSelectedButton] = useState("My Beer Journal");
	const [beerName, setBeerName] = useState("");
	const [tastingNotes, setTastingNotes] = useState("");
	const [beerNameRating, setBeerNameRating] = useState(0);
	const [tastingNotesRating, setTastingNotesRating] = useState(0);
	const [showPopup, setShowPopup] = useState(false);

	const handleSave = () => {
		// Handle save functionality
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, height: 1100 }}>
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

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingHorizontal: 10,
						paddingVertical: 10,
						marginTop: 12,
						marginBottom: 12,
					}}
				>
					<Button
						title="My Beer Journal"
						selected={selectedButton === "My Beer Journal"}
						onSelect={setSelectedButton}
					/>
					<Button
						title="My Statistics"
						selected={selectedButton === "My Statistics"}
						onSelect={setSelectedButton}
					/>
				</View>

				{selectedButton === "My Beer Journal" ? (
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							style={{
								width: "90%",
								alignSelf: "center",
								marginBottom: 20,
								borderColor: 0,
								borderRadius: 40,
								elevation: 3,
							}}
							onPress={() => setShowPopup(true)}
						>
							<View
								style={{
									width: "100%",
									height: 200,
									position: "relative",
									backgroundColor: COLORS.grey,
									borderColor: 0,
								}}
							>
								<Image
									source={require("../assets/specialtybeer.png")}
									style={{
										width: "100%",
										height: 200,
										borderTopLeftRadius: 20,
										borderTopRightRadius: 20,
										position: "relative",
									}}
								/>
								<TouchableOpacity
									style={{
										position: "absolute",
										top: 10,
										right: 10,
										padding: 10,
										backgroundColor: COLORS.foam,
										borderRadius: 12,
										borderColor: 0,
									}}
									onPress={() => {}}
								>
									<Text>Edit</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.detailContainer}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										marginBottom: 10,
									}}
								>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 20,
											backgroundColor: COLORS.grey,
										}}
									>
										Beer Name
									</Text>
									<View style={{ marginLeft: 10 }}>
										<AirbnbRating
											count={5}
											defaultRating={beerNameRating}
											size={20}
											selectedColor={COLORS.foam}
											unSelectedColor={COLORS.gray}
											reviews={[]}
											isDisabled={false}
											showRating={false}
											onFinishRating={setBeerNameRating}
										/>
									</View>
								</View>
								<View style={styles.tastingNoteContainer}>
									<Text
										style={{
											fontSize: 15,
											color: COLORS.black,
										}}
									>
										Tasting Notes
									</Text>
								</View>
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={styles.shortButton}>
							<Text>Add a Beer</Text>
						</TouchableOpacity>

						<View
							style={{
								height: 1,
								marginHorizontal: 20,
								marginTop: 10,
								marginBottom: 10,
							}}
						/>
						<View
							style={{
								height: 1,
								backgroundColor: COLORS.black,
								marginHorizontal: 20,
							}}
						/>

						<View
							style={{
								marginHorizontal: 22,
								marginTop: 22,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 20,
								}}
							>
								<View style={{ marginRight: 10 }}>
									<Text>Name of Beer</Text>
								</View>
								<TextInput
									style={styles.textInput}
									value={beerName}
									onChangeText={setBeerName}
								/>
							</View>

							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 20,
								}}
							>
								<View style={{ marginRight: 10 }}>
									<Text>Tasting Notes</Text>
								</View>
								<TextInput
									style={styles.textInput}
									value={tastingNotes}
									onChangeText={setTastingNotes}
									multiline
								/>
							</View>

							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									marginBottom: 20,
								}}
							>
								<Text>Rating</Text>
								<View style={styles.ratingStarContainer}>
									<AirbnbRating
										count={5}
										defaultRating={tastingNotesRating}
										size={20}
										selectedColor={COLORS.black}
										unSelectedColor={COLORS.gray}
										reviews={[]}
										isDisabled={false}
										showRating={false}
										onFinishRating={setTastingNotesRating}
									/>
								</View>
							</View>

							<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
								<Text>Save</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View style={{ flex: 1, marginHorizontal: 15 }}>
						<View style={styles.statisticsContainer}>
							<View style={{ height: 750, backgroundColor: COLORS.white }}>
								<View style={styles.emptyContainer}>
									<Text style={{ lineHeight: 30 }}>
										Number of unique places checked in: 5
									</Text>
									<Text style={{ lineHeight: 30 }}>
										Types of beer tried: 10
									</Text>
									<Text style={{ lineHeight: 30 }}>
										Your favorite tasting notes are: fruity
									</Text>
									<Text style={{ lineHeight: 30 }}>
										Your favorite bar is: Brewerkz Orchard (Visited 20 times!)
									</Text>
								</View>
								<View style={styles.container1}>
									<Text style={styles.label}>Most Recently Visited</Text>
									<Image
										source={require("../assets/event1.png")}
										style={styles.placeImage}
									/>
									<View style={styles.detailsContainer}>
										<Text style={styles.placeLabel}>Brewerkz Orchard</Text>
										<AirbnbRating
											count={5}
											defaultRating={4}
											size={15}
											selectedColor={COLORS.foam}
											unSelectedColor={COLORS.gray}
											reviews={[]}
											isDisabled={true}
											showRating={false}
										/>
									</View>
								</View>
								<View style={styles.container1}>
									<Text style={styles.label}>Most Recently Tried</Text>
									<Image
										source={require("../assets/specialtybeer.png")}
										style={styles.placeImage}
									/>
									<View style={styles.detailsContainer}>
										<Text style={styles.placeLabel}>Tiger Beer</Text>
										<AirbnbRating
											count={5}
											defaultRating={4}
											size={15}
											selectedColor={COLORS.foam}
											unSelectedColor={COLORS.gray}
											reviews={[]}
											isDisabled={true}
											showRating={false}
										/>
									</View>
								</View>
							</View>
						</View>
					</View>
				)}
				<Modal visible={showPopup} animationType="slide" transparent>
					<View style={styles.modalContainer}>
						<View style={styles.popupContainer}>
							<Text style={styles.popupText}>Container Clicked!</Text>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setShowPopup(false)}
							>
								<Text style={styles.closeButtonText}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</SafeAreaView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	gradient: {
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
	logo: {
		fontSize: 20,
		color: COLORS.black,
		fontWeight: "bold",
	},
	iconsContainer: {
		flexDirection: "row",
	},
	icon: {
		marginRight: 12,
	},
	button: {
		padding: 10,
		flex: 1,
		marginHorizontal: 5,
		alignItems: "center",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 0,
		elevation: 2,
	},
	scrollView: {
		flex: 1,
	},
	detailContainer: {
		flexDirection: "column",
		padding: 10,
		backgroundColor: COLORS.grey,
		borderColor: 0,
		elevation: 3,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	tastingNoteContainer: {
		backgroundColor: COLORS.foam,
		padding: 10,
		borderRadius: 8,
		borderWidth: 1,
		width: "100%",
		borderColor: 0,
		elevation: 2,
	},
	shortButton: {
		alignSelf: "flex-end",
		marginTop: 10,
		marginRight: 20,
		marginBottom: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: COLORS.foam,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 0,
		elevation: 3,
	},
	textInput: {
		flex: 1,
		height: 40,
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
	},
	saveButton: {
		alignSelf: "flex-end",
		marginTop: 0,
		marginRight: 0,
		paddingVertical: 5,
		paddingHorizontal: 20,
		backgroundColor: COLORS.foam,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 0,
		elevation: 3,
	},
	statisticsContainer: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 0,
		elevation: 3,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginBottom: 20,
	},
	container1: {
		marginTop: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: COLORS.grey,
		borderWidth: 1,
		borderColor: 0,
		borderRadius: 8,
		elevation: 2,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
	},
	placeImage: {
		width: "100%",
		height: 200,
		marginBottom: 10,
		borderRadius: 20,
	},
	detailsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	placeLabel: {
		fontSize: 18,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	popupContainer: {
		backgroundColor: COLORS.white,
		padding: 20,
		borderRadius: 8,
		alignItems: "center",
	},
	popupText: {
		fontSize: 18,
		marginBottom: 20,
	},
	closeButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: COLORS.foam,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: COLORS.black,
	},
	closeButtonText: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: "bold",
	},
	ratingStarContainer: {
		marginRight: 32,
		flex: 1, // Added flex: 1 to make the rating take remaining space
		height: 20, // Added a fixed height to align with the testing rating
	},
});

export default Journal;
