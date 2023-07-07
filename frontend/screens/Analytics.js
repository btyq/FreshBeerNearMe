import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal
} from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCookies } from "../CookieContext";
import COLORS from "../constants/colors";
import GlobalStyle from "../utils/GlobalStyle";

// CODES TO STYLE BUTTON
const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
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
            <Text style={{ fontSize: 14, ...{ color: textColor } }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const Analytics = ({ navigation }) => {
    const { cookies } = useCookies();
    const [index, setIndex] = React.useState(0);
    const [index1, setIndex1] = React.useState(0);
    const [username, setUsername] = useState("");
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    useEffect(() => {
        const sessionToken = cookies.sessionToken;
        const venueOwnerID = cookies.venueOwnerID;
        setUsername(cookies.username);
    }, []);

    const data = [30, 40, 25, 50, 45, 20];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const maxDataValue = Math.max(...data);
    const scaleY = 150 / maxDataValue;

    const navigateToInquiriesNFeedback = () => {
        navigation.navigate('InquiriesNFeedback');
    };

    const navigateToRespond = () => {
        navigation.navigate('Respond');
    };

    const navigateToVenueProfile = () => {
        navigation.navigate('VenueProfile');
    };

    const navigateToManageInventory = () => {
        navigation.navigate('ManageInventory');
    };

    const navigateToManageSocialInformation = () => {
        navigation.navigate('ManageSocialInformation');
    };

    const navigateToManagePromotion = () => {
        navigation.navigate('ManagePromotion');
    };

    // ================================== Functions for different button ==================================
    const handleUpcomingEventsClick = () => {
        // Handle click for "Upcoming Events" here
    };

    const handleRecommendedSpecialtyClick = () => {
        // Handle click for "Recommended Specialty for You" here
    };

    //=====================================================================================================
    return (
        <SafeAreaView backgroundColor={COLORS.secondary} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header
                        placement="left"
                        backgroundColor={COLORS.primary}
                        containerStyle={{
                            height: 100,
                            borderBottomLeftRadius: 40,
                            borderBottomRightRadius: 40,
                        }}
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                        <Text
                            style={{
                                marginLeft: 20,
                                marginBottom: 10,
                                fontSize: 18,
                                // Add any additional styles from GlobalStyle.headerFont
                                marginBottom: 5,
                                flex: 1, // Take up remaining space
                            }}
                        >
                            Social
                        </Text>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 1, // Adjust the thickness as desired
                            borderBottomColor: COLORS.black,
                            marginLeft: -240, // Adjust the value to prevent overlapping
                        }} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', width: '98%' }}>
                            <View style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: COLORS.black, marginTop: 10, borderRadius: 20, width: '98%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            marginTop: 15,
                                            marginLeft: 10,
                                            fontSize: 18,
                                            // Add any additional styles from GlobalStyle.headerFont
                                            marginBottom: 5,
                                            flex: 1, // Take up remaining space
                                        }}
                                    >
                                        Analytics
                                    </Text>
                                </View>
                                <View style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ padding: 16 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
                                            Beer Popularity this week
                                        </Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            {data.map((value, index) => (
                                                <View
                                                    key={index}
                                                    style={{
                                                        width: 30,
                                                        marginLeft: 10,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            height: value * scaleY,
                                                            width: 8,
                                                            backgroundColor: 'blue',
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 12, marginTop: 5 }}>{labels[index]}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                        <Text
                            style={{
                                marginLeft: 15,
                                marginBottom: 10,
                                fontSize: 18,
                                // Add any additional styles from GlobalStyle.headerFont
                                marginBottom: 5,
                                flex: 1, // Take up remaining space
                            }}
                        >
                            All Analytics
                        </Text>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 1, // Adjust the thickness as desired
                            borderBottomColor: COLORS.black,
                            marginLeft: -180, // Adjust the value toprevent overlapping
                        }} />
                    </View>
                    <View style={{ width: '95%', alignSelf: 'center', marginTop: 10, borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, padding: 10, marginBottom: 10 }}>
                        {/* First Subcontainer */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Most Popular Beer</Text>
                            {/* Add your input field or component for the title here */}
                        </View>

                        {/* Black Line */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.black, marginVertical: 10, width: '100%' }} />

                        {/* Description Subcontainer */}
                        <View style={{ height: 100 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.grey,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderBottomColor: COLORS.black,
                                    }}
                                    onPress={() => setModalVisible1(true)}
                                >
                                    <Text style={{ color: COLORS.black, fontSize: 14 }}>See More</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 0, left: 0 }}>Description</Text>
                            {/* Add your input field or component for the description here */}
                        </View>
                    </View>
                    <View style={{ width: '95%', alignSelf: 'center', marginTop: 10, borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, padding: 10, marginBottom: 100 }}>
                        {/* First Subcontainer */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Favorite Promotion</Text>
                            {/* Add your input field or component for the title here */}
                        </View>

                        {/* Black Line */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.black, marginVertical: 10, width: '100%' }} />

                        {/* Description Subcontainer */}
                        <View style={{ height: 100 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.grey,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderBottomColor: COLORS.black,
                                    }}
                                    onPress={() => setModalVisible2(true)}
                                >
                                    <Text style={{ color: COLORS.black, fontSize: 14 }}>See More</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 0, left: 0 }}>Description</Text>
                            {/* Add your input field or component for the description here */}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { width: '90%', height: 500 }]}>
                        <Text style={styles.modalText}>Modal 1 Content</Text>

                        {/* Close Modal Button */}
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible1(false)}
                            >
                                <Text style={styles.textStyle}>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => setModalVisible2(false)}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { width: '90%', height: 500 }]}>
                        <Text style={styles.modalText}>Modal 2 Content</Text>

                        {/* Close Modal Button */}
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible2(false)}
                            >
                                <Text style={styles.textStyle}>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 3, // increased padding
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 20,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: COLORS.grey,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderBottomColor: COLORS.black,
        marginTop: 10,
    },
    textStyle: {
        color: COLORS.black,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Analytics;
