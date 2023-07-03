import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
	Button,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";

const Wishlist = () => {
	const navigation = useNavigation();
	const [beerModalVisible, setBeerModalVisible] = useState(false);
	const [venueModalVisible, setVenueModalVisible] = useState(false);
	const [selectedBeer, setSelectedBeer] = useState(null);
	const [selectedVenue, setSelectedVenue] = useState(null);

	const beerData = [
		{ beerName: "Beer Name 1", rating: 3 },
		{ beerName: "Beer Name 2", rating: 4 },
		{ beerName: "Beer Name 3", rating: 3 },
		{ beerName: "Beer Name 4", rating: 4 },
		{ beerName: "Beer Name 5", rating: 3 },
		{ beerName: "Beer Name 6", rating: 4 },
		{ beerName: "Beer Name 7", rating: 3 },
		{ beerName: "Beer Name 8", rating: 4 },
		{ beerName: "Beer Name 9", rating: 3 },
		{ beerName: "Beer Name 10", rating: 4 },
	];

	const venueData = [
		{ venueName: "Venue Name 1", rating: 3 },
		{ venueName: "Venue Name 2", rating: 4 },
		{ venueName: "Venue Name 3", rating: 3 },
		{ venueName: "Venue Name 4", rating: 4 },
		{ venueName: "Venue Name 5", rating: 3 },
		{ venueName: "Venue Name 6", rating: 4 },
		{ venueName: "Venue Name 7", rating: 3 },
		{ venueName: "Venue Name 8", rating: 4 },
		{ venueName: "Venue Name 9", rating: 3 },
		{ venueName: "Venue Name 10", rating: 4 },
	];

	const openBeerModal = (beer) => {
		setSelectedBeer(beer);
		setBeerModalVisible(true);
	};

	const openVenueModal = (venue) => {
		setSelectedVenue(venue);
		setVenueModalVisible(true);
	};

	return (
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
					alignItems: "center",
					padding: 10,
					marginTop: 20,
					marginHorizontal: 12,
					backgroundColor: COLORS.secondary,
				}}
			>
				<Text style={{ fontSize: 18 }}>My Wishlist</Text>
				<TouchableOpacity style={styles.editButton}>
					<Text>Edit</Text>
				</TouchableOpacity>
			</View>
			<ScrollView style={{ marginHorizontal: 12 }}>
				<View style={styles.containerSection}>
					{beerData.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={styles.containerItem}
							onPress={() => openBeerModal(item)}
						>
							<View style={styles.leftContainer}>
								<Text style={styles.beerName}>{item.beerName}</Text>
							</View>
							<View style={styles.rightContainer}>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 3 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 4 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 5 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 6 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 7 ? COLORS.foam : COLORS.white}
								/>
							</View>
						</TouchableOpacity>
					))}
				</View>
				<View style={styles.containerSection}>
					{venueData.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={styles.containerItem}
							onPress={() => openVenueModal(item)}
						>
							<View style={styles.leftContainer}>
								<Text style={styles.venueName}>{item.venueName}</Text>
							</View>
							<View style={styles.rightContainer}>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 3 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 4 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 5 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 6 ? COLORS.foam : COLORS.white}
								/>
								<Ionicons
									name="star"
									size={20}
									color={item.rating >= 7 ? COLORS.foam : COLORS.white}
								/>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			{/* Beer Modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={beerModalVisible}
				onRequestClose={() => setBeerModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Beer Details</Text>
						<Text style={styles.modalText}>
							Beer Name: {selectedBeer?.beerName}
						</Text>
						{/* Add more beer details here */}
						<TouchableOpacity
							style={{
								backgroundColor: COLORS.foam,
								padding: 10,
								borderRadius: 8,
								alignItems: "center",
								marginHorizontal: 22,
							}}
							onPress={() => setBeerModalVisible(false)}
						>
							<Text
								style={{
									color: COLORS.black,
									fontWeight: "bold",
									fontSize: 16,
								}}
							>
								Close
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* Venue Modal */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={venueModalVisible}
				onRequestClose={() => setVenueModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Venue Details</Text>
						<Text style={styles.modalText}>
							Venue Name: {selectedVenue?.venueName}
						</Text>
						{/* Add more venue details here */}
						<TouchableOpacity
							style={{
								backgroundColor: COLORS.foam,
								padding: 10,
								borderRadius: 8,
								alignItems: "center",
								marginHorizontal: 22,
							}}
							onPress={() => setVenueModalVisible(false)}
						>
							<Text
								style={{
									color: COLORS.black,
									fontWeight: "bold",
									fontSize: 16,
								}}
							>
								Close
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	editButton: {
		backgroundColor: COLORS.foam,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 0,
		elevation: 2,
	},
	containerSection: {
		marginTop: 5,
		paddingHorizontal: 10,
	},
	containerItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		backgroundColor: COLORS.grey,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 0,
		paddingHorizontal: 20,
		elevation: 2,
	},
	leftContainer: {
		flex: 1,
		justifyContent: "center",
		paddingLeft: 10,
	},
	beerName: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.black,
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
	},
	venueName: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.black,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: COLORS.white,
		padding: 20,
		borderRadius: 10,
		width: "80%",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalText: {
		fontSize: 16,
		marginBottom: 10,
	},
});

export default Wishlist;
