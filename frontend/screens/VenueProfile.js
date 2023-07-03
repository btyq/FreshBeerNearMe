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
    Image,
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

const InquiriesNFeedback = ({ navigation }) => {
    const { cookies } = useCookies();
    const [index, setIndex] = React.useState(0);
    const [index1, setIndex1] = React.useState(0);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const sessionToken = cookies.sessionToken;
        const venueOwnerID = cookies.venueOwnerID;
        setUsername(cookies.username);
    }, []);


    //=====================================================================================================
    return (
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
                        Venue Profile
                    </Text>
                    <Image
                        source={require("../assets/brewlander.jpg")}
                        style={{ width: 200, height: 200, marginTop: 10 }}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
                            Website:
                        </Text>
                        <TextInput
                            style={{
                                marginLeft: 10,
                                borderWidth: 1,
                                borderRadius: 20,
                                borderColor: COLORS.grey,
                                padding: 5,
                                width: 310,
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
                            Contact:
                        </Text>
                        <TextInput
                            style={{
                                marginLeft: 10,
                                borderWidth: 1,
                                borderRadius: 20,
                                borderColor: COLORS.grey,
                                padding: 5,
                                width: 310,
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
                            Address:
                        </Text>
                        <TextInput
                            style={{
                                marginLeft: 10,
                                borderWidth: 1,
                                borderRadius: 20,
                                borderColor: COLORS.grey,
                                padding: 5,
                                width: 310,
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10, flex: 1 }}>
                            Working hours:
                        </Text>
                    </View>
                </View>
                <View>
                    <TextInput
                        style={{
                            marginTop: 20,
                            marginLeft: 10,
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: COLORS.grey,
                            padding: 5,
                            width: "96%",
                            height: 200,
                        }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            marginTop: 30,
                            marginBottom: 50,
                            backgroundColor: COLORS.grey,
                            borderRadius: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                        }}
                    >
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default InquiriesNFeedback;
