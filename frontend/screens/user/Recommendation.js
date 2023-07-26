import {
	Entypo,
	Feather,
	FontAwesome,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { SelectList } from "react-native-dropdown-select-list";
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

// beer data
const BeerItem = ({
	beerID,
	beerName,
	price,
	rating,
	beerDescription,
	beerImage,
	ABV,
	IBU,
}) => {
	const [popupVisible, setPopupVisible] = useState(false); // beer names popup
	const [beerLocation, setBeerLocation] = useState([]);
	const [userID, setUserID] = useState("");
	const { cookies } = useCookies();

	const handlePopup = () => {
		setPopupVisible(!popupVisible); // created 1st modal
	};

	// for beer locations
	useEffect(() => {
		setUserID(cookies.userID);

		const fetchBeerLocations = async () => {
			try {
				const response = await axios.get(
					"http://10.0.2.2:3000/getBeerLocation",
					{
						params: { beerID },
					}
				);
				const { success, venues } = response.data;

				if (success) {
					setBeerLocation(venues);
				}
			} catch (error) {
				console.error("Error fetching beer location:", error);
			}
		};

		if (popupVisible) {
			fetchBeerLocations();
		}
	}, [popupVisible]);

	return (
		<View style={styles.subContainer}>
			<TouchableOpacity
				style={{
					backgroundColor: COLORS.grey,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: 5,
					borderRadius: 20,
					padding: 15,
					borderWidth: 1,
					borderColor: 0,
				}}
				onPress={handlePopup}
			>
				<CustomText
					style={{
						flex: 1,
						marginLeft: 10,
						flexWrap: "wrap",
						maxWidth: "80%",
					}}
				>
					Beer Name: {beerName}
				</CustomText>
				<AirbnbRating
					count={5}
					defaultRating={rating}
					showRating={false}
					size={14}
					isDisabled={true}
				/>
			</TouchableOpacity>

			{/* beer popup */}
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
					<ScrollView showsVerticalScrollIndicator={false}>
						<Image source={{ uri: beerImage }} style={styles.beerImage} />
						<CustomText
							style={{
								fontSize: 18,
								textAlign: "center",
							}}
						>
							{beerName} -- ${price}
						</CustomText>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									justifyContent: "flex-end",
									paddingTop: 16,
									marginBottom: 15,
								}}
							>
								{[1, 2, 3, 4, 5].map((star) => (
									<Ionicons
										key={star}
										name="star"
										size={16}
										color={star <= rating ? COLORS.foam : COLORS.grey}
										style={{ marginBottom: 4 }}
									/>
								))}
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								elevation: 5,
							}}
						>
							<CustomText style={{ marginBottom: 12 }}>
								Alcohol%: {ABV}
							</CustomText>
							<CustomText style={{ marginBottom: 12 }}>
								Bitter Units: {IBU}
							</CustomText>
						</View>
						<CustomText style={{ fontSize: 17 }}>Description</CustomText>
						<CustomText>{beerDescription}</CustomText>
						<Text
							style={{
								...GlobalStyle.headerFont,
								fontSize: 17,
								marginBottom: 10,
								marginTop: 10,
							}}
						>
							Locations
						</Text>
						{beerLocation.map((location) => (
							<View key={location.venueID}>
								<CustomText>{location.venueName}</CustomText>
							</View>
						))}
						<Button
							title="Close"
							onPress={handlePopup}
							filled
							style={{
								marginTop: 12,
								marginBottom: 12,
								borderColor: 0,
								elevation: 2,
								borderRadius: 12,
							}}
						/>
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
};

// venue data
const VenueItem = ({
	venueID,
	venueName,
	venueAddress,
	venueContact,
	venueRating,
	venueImage,
	venueOperatingHours,
	venueFreshness,
	venueTemperature,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const [venueMenu, setVenueMenu] = useState([]);
	const [userID, setUserID] = useState("");
	const { cookies } = useCookies();

	const handlePopup = () => {
		setPopupVisible(!popupVisible);
	};

	useEffect(() => {
		setUserID(cookies.userID);
		const fetchVenueMenu = async () => {
			try {
				const response = await axios.get("http://10.0.2.2:3000/getVenueMenu", {
					params: { venueID },
				});
				const { success, beers } = response.data;

				if (success) {
					setVenueMenu(beers);
				}
			} catch (error) {
				console.error("Error fetching venue menu:", error);
			}
		};

		if (popupVisible) {
			fetchVenueMenu();
		}
	}, [popupVisible]);

	return (
		<View style={styles.subContainer}>
			<TouchableOpacity
				style={{
					backgroundColor: COLORS.grey,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: 5,
					borderRadius: 20,
					padding: 15,
					borderWidth: 1,
					borderColor: 0,
				}}
				onPress={handlePopup}
			>
				<CustomText
					style={{
						flex: 1,
						marginLeft: 10,
						flexWrap: "wrap",
						maxWidth: "80%",
					}}
				>
					Venue Name: {venueName}
				</CustomText>
				<AirbnbRating
					count={5}
					defaultRating={venueRating}
					showRating={false}
					size={14}
					isDisabled={true}
				/>
			</TouchableOpacity>

			{/* venue popup  */}
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
					<ScrollView
						contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
						showsVerticalScrollIndicator={false}
					>
						<Image source={{ uri: venueImage }} style={styles.venueImage} />
						<CustomText
							style={{
								fontSize: 18,
								textAlign: "center",
								marginBottom: 12,
							}}
						>
							{venueName}
						</CustomText>
						<View style={{ marginHorizontal: 12 }}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 12,
								}}
							>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Entypo name="location-pin" size={24} color={COLORS.black} />
									<CustomText
										style={{
											flexWrap: "wrap",
											marginLeft: 4,
											maxWidth: "65%",
										}}
									>
										{venueAddress}
									</CustomText>
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										marginHorizontal: 12,
									}}
								>
									<FontAwesome
										name="phone"
										size={24}
										color={COLORS.black}
										style={{ marginRight: 4 }}
									/>
									<CustomText
										style={{
											flexWrap: "wrap",
											maxWidth: "80%",
										}}
									>
										{venueContact}
									</CustomText>
								</View>
							</View>

							<View
								style={{
									width: "100%",
									borderColor: 0,
									paddingHorizontal: 20,
									paddingVertical: 10,
									borderRadius: 30,
									marginBottom: 25,
									backgroundColor: COLORS.grey,
									elevation: 2,
								}}
							>
								<CustomText
									style={{
										fontSize: 18,
									}}
								>
									Operating Hours{" "}
								</CustomText>
								<View>
									{venueOperatingHours.split("\n").map((line, index) => (
										<View
											key={index}
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<Text
												style={{
													...GlobalStyle.headerFont,
													fontSize: 14,
													flex: 1,
												}}
											>
												{line.split(" ")[0]}
											</Text>
											<CustomText style={{ justifyContent: "flex-end" }}>
												{line.substring(line.indexOf(" ") + 1)}
											</CustomText>
										</View>
									))}
								</View>
							</View>
							<CustomText>Average Beer Freshness: {venueFreshness}</CustomText>
							<CustomText>
								Average Beer Temperature: {venueTemperature}
							</CustomText>
							<View
								style={{
									borderTopColor: "black",
									borderBottomWidth: 1,
									marginTop: 5,
								}}
							></View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginTop: 12,
									marginBottom: 12,
								}}
							>
								<CustomText style={{ fontSize: 16 }}>Ratings: </CustomText>
								<View
									style={{
										flexDirection: "row",
										paddingTop: 6,
									}}
								>
									{[1, 2, 3, 4, 5].map((star) => (
										<Ionicons
											key={star}
											name="star"
											size={16}
											color={star <= venueRating ? COLORS.foam : COLORS.grey}
											style={{ marginBottom: 9 }}
										/>
									))}
								</View>
							</View>
							<View
								style={{
									borderTopColor: "black",
									borderTopWidth: 1,
								}}
							></View>
							<CustomText
								style={{ fontSize: 16, marginTop: 12, marginBottom: 12 }}
							>
								Menu
							</CustomText>

							<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
								{venueMenu.map((beer) => (
									<View
										key={beer.beerID}
										style={{
											width: "45%",
											marginHorizontal: 8,
											marginBottom: 20,
											borderRadius: 15,
											backgroundColor: COLORS.secondary,
											elevation: 5,
										}}
									>
										<View
											style={{
												marginTop: 12,
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Image
												source={{ uri: beer.beerImage }}
												style={{
													borderRadius: 12,
													height: 120,
													width: 120,
												}}
											/>
										</View>
										<View style={{ marginTop: 12, paddingHorizontal: 10 }}>
											<Text
												style={{
													...GlobalStyle.headerFont,
													fontSize: 13,
													marginBottom: 6,
												}}
											>
												{beer.beerName}
											</Text>
											<View
												style={{
													flexDirection: "row",
													justifyContent: "space-between",
													marginBottom: 6,
												}}
											>
												<CustomText style={{ marginRight: 5 }}>
													ABV: {beer.abv}
												</CustomText>
												<CustomText style={{ marginRight: 5 }}>
													IBU: {beer.ibu}
												</CustomText>
											</View>
											<Text
												style={{
													...GlobalStyle.headerFont,
													fontSize: 14,
													marginBottom: 12,
												}}
											>
												${beer.price}
											</Text>
										</View>
									</View>
								))}
							</View>
							<Button
								title="Close"
								onPress={handlePopup}
								filled
								style={{
									elevation: 2,
									borderColor: 0,
								}}
							/>
						</View>
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
};

const RecommendationItem = ({ data }) => {
	// console.log("Data prop in RecommendationItem:", data);

	const [popupVisible, setPopupVisible] = useState(false); // venue names popup
	const [popupVisible2, setPopupVisible2] = useState(false); // beer names popup

	const handlePopup = () => {
		setPopupVisible(!popupVisible); // venue names popup
	};

	const handlePopup2 = () => {
		setPopupVisible2(!popupVisible2); // beer names popup
	};

	// venue names
	if (data.venueID) {
		return (
			<View>
				<TouchableOpacity
					style={{
						backgroundColor: COLORS.grey,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: 5,
						borderRadius: 20,
						padding: 15,
						borderWidth: 1,
						borderColor: 0,
					}}
					onPress={handlePopup}
				>
					<CustomText
						style={{
							flex: 1,
							marginLeft: 10,
							flexWrap: "wrap",
							maxWidth: "80%",
						}}
					>
						Venue Name: {data.venueName}
					</CustomText>
					<AirbnbRating
						count={5}
						defaultRating={data.venueRating}
						showRating={false}
						size={14}
						isDisabled={true}
					/>
				</TouchableOpacity>

				{/* venue popup */}
				<Modal visible={popupVisible} transparent animationType="fade">
					<View style={styles.modalContainer}>
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
							<ScrollView
								contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
								showsVerticalScrollIndicator={false}
							>
								<Image
									source={{ uri: data.venueImage }}
									style={styles.venueImage}
								/>
								<CustomText
									style={{
										fontSize: 18,
										textAlign: "center",
										marginBottom: 12,
									}}
								>
									{data.venueName}
								</CustomText>
								<View style={{ marginHorizontal: 12 }}>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginBottom: 12,
										}}
									>
										<View
											style={{ flexDirection: "row", alignItems: "center" }}
										>
											<Entypo
												name="location-pin"
												size={24}
												color={COLORS.black}
											/>
											<CustomText
												style={{
													flexWrap: "wrap",
													marginLeft: 4,
													maxWidth: "65%",
												}}
											>
												{data.venueAddress}
											</CustomText>
										</View>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												marginHorizontal: 12,
											}}
										>
											<FontAwesome
												name="phone"
												size={24}
												color={COLORS.black}
												style={{ marginRight: 4 }}
											/>
											<CustomText
												style={{
													flexWrap: "wrap",
													maxWidth: "80%",
												}}
											>
												{data.venueContact}
											</CustomText>
										</View>
									</View>

									<View
										style={{
											width: "100%",
											borderColor: 0,
											paddingHorizontal: 20,
											paddingVertical: 10,
											borderRadius: 30,
											marginBottom: 25,
											backgroundColor: COLORS.grey,
											elevation: 2,
										}}
									>
										<CustomText
											style={{
												fontSize: 18,
											}}
										>
											Operating Hours{" "}
										</CustomText>
										<View>
											{data.venueOperatingHours
												.split("\n")
												.map((line, index) => (
													<View
														key={index}
														style={{
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Text
															style={{
																...GlobalStyle.headerFont,
																fontSize: 14,
																flex: 1,
															}}
														>
															{line.split(" ")[0]}
														</Text>
														<CustomText style={{ justifyContent: "flex-end" }}>
															{line.substring(line.indexOf(" ") + 1)}
														</CustomText>
													</View>
												))}
										</View>
									</View>
									<CustomText>
										Average Beer Freshness: {data.venueFreshness}
									</CustomText>
									<CustomText>
										Average Beer Temperature: {data.venueTemperature}
									</CustomText>
									<View
										style={{
											borderTopColor: "black",
											borderBottomWidth: 1,
											marginTop: 5,
										}}
									></View>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
											marginTop: 12,
											marginBottom: 12,
										}}
									>
										<CustomText style={{ fontSize: 16 }}>Ratings: </CustomText>
										<View
											style={{
												flexDirection: "row",
												paddingTop: 6,
											}}
										>
											{[1, 2, 3, 4, 5].map((star) => (
												<Ionicons
													key={star}
													name="star"
													size={16}
													color={
														star <= data.venueRating ? COLORS.foam : COLORS.grey
													}
													style={{ marginBottom: 9 }}
												/>
											))}
										</View>
									</View>
									<View
										style={{
											borderTopColor: "black",
											borderTopWidth: 1,
										}}
									></View>
									<CustomText
										style={{ fontSize: 16, marginTop: 12, marginBottom: 12 }}
									>
										Menu
									</CustomText>

									<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
										{data.venueMenu.map((data) => (
											<View
												key={data.beerID}
												style={{
													width: "45%",
													marginHorizontal: 8,
													marginBottom: 20,
													borderRadius: 15,
													backgroundColor: COLORS.secondary,
													elevation: 5,
												}}
											>
												<View
													style={{
														marginTop: 12,
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<Image
														source={{ uri: data.beerImage }}
														style={{
															borderRadius: 12,
															height: 120,
															width: 120,
														}}
													/>
												</View>
												<View style={{ marginTop: 12, paddingHorizontal: 10 }}>
													<Text
														style={{
															...GlobalStyle.headerFont,
															fontSize: 13,
															marginBottom: 6,
														}}
													>
														{data.beerName}
													</Text>
													<View
														style={{
															flexDirection: "row",
															justifyContent: "space-between",
															marginBottom: 6,
														}}
													>
														<CustomText style={{ marginRight: 5 }}>
															ABV: {data.abv}
														</CustomText>
														<CustomText style={{ marginRight: 5 }}>
															IBU: {data.ibu}
														</CustomText>
													</View>
													<Text
														style={{
															...GlobalStyle.headerFont,
															fontSize: 14,
															marginBottom: 12,
														}}
													>
														${data.price}
													</Text>
												</View>
											</View>
										))}
									</View>
									<Button
										title="Close"
										onPress={handlePopup}
										filled
										style={{
											elevation: 2,
											borderColor: 0,
										}}
									/>
								</View>
							</ScrollView>
						</View>
					</View>
				</Modal>
			</View>
		);

		// beer names
	} else if (data.beerID) {
		return (
			<View>
				<TouchableOpacity
					style={{
						backgroundColor: COLORS.grey,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: 5,
						borderRadius: 20,
						padding: 15,
						borderWidth: 1,
						borderColor: 0,
					}}
					onPress={handlePopup2}
				>
					<CustomText
						style={{
							flex: 1,
							marginLeft: 10,
							flexWrap: "wrap",
							maxWidth: "80%",
						}}
					>
						Beer Name: {data.beerName}
					</CustomText>
					<AirbnbRating
						count={5}
						defaultRating={data.rating}
						showRating={false}
						size={14}
						isDisabled={true}
					/>
				</TouchableOpacity>

				{/* beer popup */}
				<Modal visible={popupVisible2} transparent animationType="fade">
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
						<ScrollView showsVerticalScrollIndicator={false}>
							<Image
								source={{ uri: data.beerImage }}
								style={styles.beerImage}
							/>
							<CustomText
								style={{
									fontSize: 18,
									textAlign: "center",
								}}
							>
								{data.beerName} -- ${data.price}
							</CustomText>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View
									style={{
										flex: 1,
										flexDirection: "row",
										justifyContent: "flex-end",
										paddingTop: 16,
										marginBottom: 15,
									}}
								>
									{[1, 2, 3, 4, 5].map((star) => (
										<Ionicons
											key={star}
											name="star"
											size={16}
											color={star <= data.rating ? COLORS.foam : COLORS.grey}
											style={{ marginBottom: 4 }}
										/>
									))}
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									elevation: 5,
								}}
							>
								<CustomText style={{ marginBottom: 12 }}>
									Alcohol%: {data.ABV}
								</CustomText>
								<CustomText style={{ marginBottom: 12 }}>
									Bitter Units: {data.IBU}
								</CustomText>
							</View>
							<CustomText style={{ fontSize: 17 }}>Description</CustomText>
							<CustomText>{data.beerDescription}</CustomText>
							<Text
								style={{
									...GlobalStyle.headerFont,
									fontSize: 17,
									marginBottom: 10,
									marginTop: 10,
								}}
							>
								Locations
							</Text>
							{data.beerLocation.map((location) => (
								<View key={location.venueID}>
									<CustomText>{location.venueName}</CustomText>
								</View>
							))}
							<Button
								title="Close"
								onPress={handlePopup2}
								filled
								style={{
									marginTop: 12,
									marginBottom: 12,
									borderColor: 0,
									elevation: 2,
									borderRadius: 12,
								}}
							/>
						</ScrollView>
					</View>
				</Modal>
			</View>
		);
	}
};

const Recommendation = ({ navigation }) => {
	const { cookies } = useCookies();
	const [userID, setUserID] = useState("");
	const [recommendationData, setRecommendationData] = useState({});
	const [searchData, setSearchData] = useState([]); //
	const [selectedData, setSelectedData] = useState(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [recommendOption, setRecommendOption] = useState(null);

	useEffect(() => {
		setUserID(cookies.userID);
		axios
			.get("http://10.0.2.2:3000/getRecommendation", {
				params: {
					userID: cookies.userID,
				},
			})
			.then((response) => {
				setRecommendationData(response.data);
			})
			.catch((error) => {
				console.error("Error retrieving recommendation:", error);
			});
	}, []);

	useEffect(() => {
		axios
			.get("http://10.0.2.2:3000/getSearch")
			.then((response) => {
				const { venues, beers } = response.data;
				setSearchData({ venues, beers });
			})
			.catch((error) => {
				console.error("Error retrieving search results:", error);
			});
	}, []);

	// for extracting data from both venue and beer data
	const getNames = () => {
		const beerAndVenue = [];

		Object.values(searchData).forEach((dataArray) => {
			dataArray.forEach((item) => {
				if (item.venueName) {
					beerAndVenue.push({
						id: item._id,
						name: item.venueName,
						rating: item.venueRating,
					});
				}

				if (item.beerName) {
					beerAndVenue.push({
						id: item._id,
						name: item.beerName,
						rating: item.rating,
					});
				}
			});
		});
		return beerAndVenue;
	};

	const searchResults = getNames();

	const handleRecommend = () => {
		setModalVisible(!isModalVisible);
	};

	// console.log("selectedData.rating:", selectedData.rating);
	// console.log("selectedData:", selectedData);

	// const showModal1 = () => {
	// 	setModalVisible1(true);
	// 	console.log(recommendationData);
	// };
	// const searchButton = () => {};

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

					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 50 }}
					>
						<View style={{ marginHorizontal: 20, marginVertical: 20 }}>
							<Text style={{ ...GlobalStyle.headerFont, marginBottom: 5 }}>
								Your friends' recommendations
							</Text>
							{Object.keys(recommendationData).length === 0 ? (
								<View style={{ alignItems: "center" }}>
									<Text
										style={{ ...GlobalStyle.bodyFont, textAlign: "center" }}
									>
										Start following someone!
									</Text>
									<Image
										source={require("../../assets/beer.png")}
										style={{ width: 100, height: 100 }}
									/>
								</View>
							) : (
								Object.keys(recommendationData).map((username) => (
									<View key={username} style={{ marginBottom: 12 }}>
										<CustomText>{username} recommends:</CustomText>
										{recommendationData[username].map((item) => {
											if (item.beerID) {
												return (
													<BeerItem
														key={item.beerID}
														beerID={item.beerID}
														beerName={item.beerName}
														price={item.price}
														rating={item.rating}
														beerDescription={item.beerDescription}
														beerImage={item.beerImage}
														ABV={item.abv}
														IBU={item.ibu}
														communityReviews={item.communityReviews}
														venueAvailability={item.venueAvailability}
													/>
												);
											} else if (item.venueID) {
												return (
													<VenueItem
														key={item.venueID}
														venueID={item.venueID}
														venueName={item.venueName}
														venueAddress={item.venueAddress}
														venueContact={item.venueContact}
														venueRating={item.venueRating}
														venueImage={item.venueImage}
														venueOperatingHours={item.venueOperatingHours}
														venueFreshness={item.venueFreshness}
														venueTemperature={item.venueTemperature}
													/>
												);
											}
											return null;
										})}

										{/* {recommendationData[username].map((item, index) => (
											<RecommendationItem key={index} data={item} />
										))} */}
									</View>
								))
							)}

							<Text style={{ ...GlobalStyle.headerFont, marginVertical: 12 }}>
								What do you recommend?
							</Text>
							<TouchableOpacity
								style={{
									backgroundColor: COLORS.grey,
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 10,
									borderRadius: 20,
									padding: 10,
									borderWidth: 1,
									borderColor: 0,
								}}
							>
								<CustomText style={{ marginLeft: 10 }}>
									{selectedData}
								</CustomText>

								<AirbnbRating
									count={5}
									defaultRating={4}
									showRating={false}
									size={16}
									isDisabled={true}
								/>
							</TouchableOpacity>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<View style={{ flex: 1 }}>
									<SelectList
										data={searchResults.map((result) => ({
											label: result.name,
											value: result.name,
										}))}
										value={selectedData}
										setSelected={(value) => setSelectedData(value)}
										boxStyles={{
											borderColor: 0,
											backgroundColor: COLORS.grey,
											opacity: 1,
										}}
										dropdownStyles={{
											right: 0,
											borderColor: 0,
											backgroundColor: COLORS.grey,
											opacity: 1,
										}}
										defaultOption={selectedData}
										search={true}
									/>
								</View>
								<Button
									title="Recommend!"
									color={COLORS.foam}
									filled
									style={{
										height: 45,
										marginLeft: 5,
										borderRadius: 10,
										borderColor: 0,
										padding: 5,
									}}
									onPress={handleRecommend}
								/>
								{/* for recommend button */}
								<Modal
									visible={isModalVisible}
									transparent
									animationType="fade"
								>
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
											<CustomText>What are you recommending?</CustomText>
											<View style={{ flexDirection: "row" }}>
												<Button
													title="Beer"
													filled
													style={{
														width: "40%",
														borderRadius: 10,
														marginTop: 15,
														borderColor: 0,
														elevation: 2,
														marginRight: 12,
													}}
													onPress={() => {
														setRecommendOption("beer");
														handleRecommend();
													}}
												/>
												<Button
													title="Venue"
													filled
													style={{
														width: "40%",
														borderRadius: 10,
														marginTop: 15,
														borderColor: 0,
														elevation: 2,
													}}
													onPress={() => {
														setRecommendOption("venue");
														handleRecommend();
													}}
												/>
											</View>
											<Button
												title="Cancel"
												onPress={handleRecommend}
												style={{
													width: "40%",
													borderRadius: 10,
													marginTop: 15,
													borderColor: 0,
													elevation: 2,
												}}
											/>
										</View>
									</View>
								</Modal>
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
	beerImage: {
		height: 230,
		width: 250,
		borderRadius: 15,
		borderWidth: 5,
		borderColor: 0,
		marginTop: 20,
		marginLeft: "auto",
		marginRight: "auto",
		justifyContent: "center",
		alignContent: "center",
		marginBottom: 10,
		alignSelf: "center",
	},
	venueImage: {
		height: 200,
		width: 320,
		borderRadius: 15,
		borderWidth: 5,
		borderColor: 0,
		marginTop: 20,
		marginLeft: "auto",
		marginRight: "auto",
		justifyContent: "center",
		alignContent: "center",
		marginBottom: 10,
		alignSelf: "center",
	},
});

export default Recommendation;
