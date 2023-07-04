import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
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

const Respond = ({ navigation }) => {
    const { cookies } = useCookies();
    const [index, setIndex] = React.useState(0);
    const [index1, setIndex1] = React.useState(0);
    const [username, setUsername] = useState("");

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

    const navigateToVenueProfile = () => {
        navigation.navigate('VenueProfile');
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
                     {/* "User asks:" Text */}
                    <View style={{ marginTop: 20, marginLeft: 10, }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack(); // Go back to the previous screen
                            }}
                            style={{
                                backgroundColor: COLORS.grey,
                                borderRadius: 10,
                                paddingHorizontal: 8,
                                paddingVertical: 5,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Text style={{ color: 'black', fontSize: 15 }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={{ fontSize: 18, marginTop: 25, marginLeft: 20, }}>User asks:</Text>
                    </View>
                    {/* User Description */}
                    <View style={{
                        marginTop: 5,
                        borderWidth: 1,
                        borderColor: COLORS.black,
                        borderRadius: 10,
                        padding: 10,
                        width: '95%',
                        height: 50,
                        alignSelf: 'center',
                    }}>
                        <Text>User description</Text>
                    </View>
                    {/* Text Input */}
                    <View style={{
                        marginTop: 30,
                        borderWidth: 1,
                        borderColor: COLORS.black,
                        borderRadius: 10,
                        padding: 10,
                        width: '95%',
                        height: 240,
                        alignSelf: 'center',
                    }}>
                        <TextInput style={{
                            width: '100%',
                            height: 100,
                            textAlignVertical: 'top',
                        }} placeholder="Enter Respond..." />
                    </View>
                    {/* Submit Button */}
                    <View style={{ alignSelf: 'flex-end', marginTop: 10, marginRight: 10, }}>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={{
                                backgroundColor: COLORS.grey,
                                borderRadius: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                padding: 30,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Text style={{ color: 'black', fontSize: 18 }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
});

export default Respond;
