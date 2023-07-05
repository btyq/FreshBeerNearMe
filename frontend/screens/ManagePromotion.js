import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import ImagePicker from 'react-native-image-picker'
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

const ManagePromotion = ({ navigation }) => {
    const { cookies } = useCookies();
    const [index, setIndex] = React.useState(0);
    const [index1, setIndex1] = React.useState(0);
    const [username, setUsername] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const sessionToken = cookies.sessionToken;
        const venueOwnerID = cookies.venueOwnerID;
        setUsername(cookies.username);
    }, []);

    const [isFacebookPressed, setIsFacebookPressed] = useState(false);
    const [isGooglePressed, setIsGooglePressed] = useState(false);
    const [isInstagramPressed, setIsInstagramPressed] = useState(false);

    const handleFacebookPress = () => {
        setIsFacebookPressed(!isFacebookPressed);
    };

    const handleGooglePress = () => {
        setIsGooglePressed(!isGooglePressed);
    };

    const handleInstagramPress = () => {
        setIsInstagramPressed(!isInstagramPressed);
    };

    const navigateToCreatePromotion = () => {
		navigation.navigate('CreatePromotion');
	};

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                setSelectedImage(result);
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    //=====================================================================================================
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                {/* Remove button */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30, marginRight: 10, }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.grey,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            // Handle remove button press
                        }}
                    >
                        <Text style={{ color: COLORS.black, fontSize: 16 }}>Sort</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text
                        style={{
                            marginLeft: 20,
                            marginBottom: 10,
                            fontSize: 17,
                            // Add any additional styles from GlobalStyle.headerFont
                            marginBottom: 5,
                            flex: 1, // Take up remaining space
                        }}
                    >
                        Previous Post
                    </Text>
                    <View style={{
                        flex: 1,
                        borderBottomWidth: 1, // Adjust the thickness as desired
                        borderBottomColor: COLORS.black,
                        marginLeft: -150, // Adjust the value to prevent overlapping
                    }} />
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 10, borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, padding: 10 }}>
                    {/* First Subcontainer */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: COLORS.black, paddingRight: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Title</Text>
                            {/* Add your input field or component for the title here */}
                        </View>

                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                            {/* Add your input field or component for the date here */}
                        </View>
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
                                }}
                                onPress={() => {
                                    // Handle edit button press
                                }}
                            >
                                <Text style={{ color: COLORS.black, fontSize: 14 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 0, left: 0 }}>Description</Text>
                        {/* Add your input field or component for the description here */}
                    </View>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 10, borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, padding: 10 }}>
                    {/* First Subcontainer */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: COLORS.black, paddingRight: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Title</Text>
                            {/* Add your input field or component for the title here */}
                        </View>

                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                            {/* Add your input field or component for the date here */}
                        </View>
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
                                }}
                                onPress={() => {
                                    // Handle edit button press
                                }}
                            >
                                <Text style={{ color: COLORS.black, fontSize: 14 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 0, left: 0 }}>Description</Text>
                        {/* Add your input field or component for the description here */}
                    </View>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 10, borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, padding: 10 }}>
                    {/* First Subcontainer */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: COLORS.black, paddingRight: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Title</Text>
                            {/* Add your input field or component for the title here */}
                        </View>

                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                            {/* Add your input field or component for the date here */}
                        </View>
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
                                }}
                                onPress={() => {
                                    // Handle edit button press
                                }}
                            >
                                <Text style={{ color: COLORS.black, fontSize: 14 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 0, left: 0 }}>Description</Text>
                        {/* Add your input field or component for the description here */}
                    </View>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 10, borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, padding: 10 }}>
                    {/* First Subcontainer */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: COLORS.black, paddingRight: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Title</Text>
                            {/* Add your input field or component for the title here */}
                        </View>

                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                            {/* Add your input field or component for the date here */}
                        </View>
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
                                }}
                                onPress={() => {
                                    // Handle edit button press
                                }}
                            >
                                <Text style={{ color: COLORS.black, fontSize: 14 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 0, left: 0 }}>Description</Text>
                        {/* Add your input field or component for the description here */}
                    </View>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', marginTop: 10, borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, padding: 10 }}>
                    {/* First Subcontainer */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: COLORS.black, paddingRight: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Title</Text>
                            {/* Add your input field or component for the title here */}
                        </View>

                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date</Text>
                            {/* Add your input field or component for the date here */}
                        </View>
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
                                }}
                                onPress={() => {
                                    // Handle edit button press
                                }}
                            >
                                <Text style={{ color: COLORS.black, fontSize: 14 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', position: 'absolute', top: 0, left: 0 }}>Description</Text>
                        {/* Add your input field or component for the description here */}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.grey,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20,
                            marginLeft: 50,
                            borderWidth: 1,
                            borderRadius: 20,
                        }}
                        onPress={navigateToCreatePromotion}
                    >
                        <Text style={{ color: COLORS.black, fontSize: 16 }}>Create</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.grey,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20,
                            marginRight: 50,
                            borderWidth: 1,
                            borderRadius: 20,
                        }}
                        onPress={() => {
                            // Handle remove button press
                        }}
                    >
                        <Text style={{ color: COLORS.black, fontSize: 16 }}>Remove</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
});

export default ManagePromotion;
