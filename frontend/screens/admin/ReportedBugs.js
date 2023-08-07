import {
	FontAwesome5,
	Ionicons,
	MaterialIcons,
	Octicons,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
    Modal,
    Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Row, Rows, Table } from "react-native-table-component";
import { Feather } from "react-native-vector-icons";
import { useCookies } from "../../CookieContext";
import COLORS from "../../constants/colors";
import GlobalStyle from "../../utils/GlobalStyle";
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

const ReportedBugs = ({ navigation }) => {
	const { cookies } = useCookies();
	const [bugData, setBugData] = useState([]);
    const [modalVisibilities, setModalVisibilities] = useState([]);
    const [useEffectRefresh, setUseEffectRefresh] = useState(false);

    const toggleModal = (index) => {
        const newVisibilities = [...modalVisibilities];
        newVisibilities[index] = !newVisibilities[index];
        setModalVisibilities(newVisibilities);
    };

    useEffect(() => {
        axios
            .get("http://10.0.2.2:3000/getBugs")
            .then((response) => {
                setBugData(response.data);
                setModalVisibilities(Array(response.data.length).fill(false));
                setUseEffectRefresh(false);
            })
            .catch((error) => {
                console.error("Error retrieving Bugs", error);
            });
    }, [useEffectRefresh])

    const handleResolve = (issueID) => {

        const data = {
            issueID: issueID
        }

        axios
            .post("http://10.0.2.2:3000/resolveBugs", data)
            .then((response) => {
                if (response.data.success) {
                    Alert.alert("Successfully resolved bugs!")
                    setUseEffectRefresh(true);
                }
                else { 
                    const { message } = response.data;
                    Alert.alert("Error!", message)
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
						<View style={{ flexDirection: "row" }}>
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
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity>
								<Ionicons
									name="notifications-outline"
									size={24}
									color={COLORS.black}
									style={{ marginRight: 10 }}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
								<MaterialIcons name="logout" size={24} color={COLORS.black} />
							</TouchableOpacity>
						</View>
					}
				/>

                <Text
                    style={{
                        fontSize: 16,
                        ...GlobalStyle.headerFont,
                        marginTop: 10,
                    }}
                >
                    New bug reports: 3
                </Text>
                <View style={{ flex: 1, padding: 5, justifyContent: "center" }}>
                    <Table
                        borderStyle={{ borderWidth: 1, borderColor: COLORS.black }}
                    >
                        <Row
                            data={["Issue ID", "Description", "Status"]}
                            style={styles.head}
                            textStyle={styles.headText}
                        />
                        <Rows
                            data={bugData.map((bug, index) => [
                                bug.issueID,
                                bug.issueDescription,
                                bug.issueStatus ? (
                                    "Resolved"
                                ) : (
                                    <TouchableOpacity onPress={() => toggleModal(index)}>
                                        <Text>Update status</Text>
                                    </TouchableOpacity>
                                )
                            ])}
                            textStyle={styles.text}
                        />
                        {modalVisibilities.map((isVisible, index) => (
                            <Modal
                                key={index}
                                visible={isVisible}
                                animationType="fade"
                                transparent
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
                                    <Text>Case Number: {bugData[index].issueID}</Text>
                                    <Text>Date Reported: {bugData[index].issueDate}</Text>
                                    <Text>Reported by: {bugData[index].issueUser}</Text>
                                    <Text>Description: {bugData[index].issueDescription}</Text>
                                    <Text>
                                        Status: {bugData[index].issueStatus ? "Resolved" : "Pending"}
                                    </Text>
                                    <Button title="Mark as Resolved" onPress={() => handleResolve(bugData[index].issueID)} />
                                    <Button title="Close" onPress={() => toggleModal(index)} />
                                </View>
                            </Modal>
                        ))}
                    </Table>
                </View>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		padding: 5,
		justifyContent: "center",
	},
	head: {
		height: 34,
		backgroundColor: COLORS.foam,
	},
	headText: {
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.black,
	},
	text: {
		margin: 6,
		fontSize: 14,
		textAlign: "center",
	},
	smallButton: {
		marginTop: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: COLORS.foam,
		borderRadius: 8,
		alignSelf: "flex-end",
		elevation: 2,
	},
	subContainer: {
		height: 100,
		elevation: 2,
		backgroundColor: COLORS.grey,
		marginLeft: 10,
		marginTop: 10,
		borderRadius: 15,
		marginBottom: 3,
		width: "45%",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ReportedBugs;
