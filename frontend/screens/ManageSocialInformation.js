import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Card, Tab, TabView, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import { Alert } from "react-native";
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

const ManageSocialInformation = ({ navigation }) => {
    const { cookies } = useCookies();
    const [index, setIndex] = React.useState(0);
    const [index1, setIndex1] = React.useState(0);
    const [username, setUsername] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        (async() =>{
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status == 'granted');
        } )();
        setUsername(cookies.username);
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.image,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.cancelled) {
          setSelectedImage(result.assets[0]);
        } else {
          Alert.alert(
            "Selection Cancelled",
            "Please choose an image to proceed.",
            [{ text: "OK", onPress: () => console.log("OK pressed") }],
            { cancelable: false }
          );
        }
      };
      
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

   const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
   const [image, setImage] = useState(null);
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
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
                        Social Media Integration
                    </Text>
                    <View style={{
                        flex: 1,
                        borderBottomWidth: 1, // Adjust the thickness as desired
                        borderBottomColor: COLORS.black,
                        marginLeft: 0, // Adjust the value to prevent overlapping
                    }} />
                </View>
                <View style={{ flex: 1 }}>
                    {/* ... Other code ... */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginLeft: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require("../assets/facebook.png")}
                                style={{
                                    height: 26,
                                    width: 26,
                                    marginRight: 8,
                                }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: 18 }}>Facebook</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                marginRight: 30,
                                backgroundColor: isFacebookPressed ? COLORS.grey : 'white',
                                borderWidth: 1,
                                borderColor: COLORS.black,
                                borderRadius: 10
                            }}
                            onPress={handleFacebookPress}
                        >
                            <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 20, paddingVertical: 5 }}>
                                {isFacebookPressed ? 'Connected' : 'Connect'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginLeft: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require("../assets/google.png")}
                                style={{
                                    height: 26,
                                    width: 26,
                                    marginRight: 8,
                                }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: 18 }}>Google</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                marginRight: 30,
                                backgroundColor: isGooglePressed ? COLORS.grey : 'white',
                                borderWidth: 1,
                                borderColor: COLORS.black,
                                borderRadius: 10
                            }}
                            onPress={handleGooglePress}
                        >
                            <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 20, paddingVertical: 5 }}>
                                {isGooglePressed ? 'Connected' : 'Connect'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginLeft: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require("../assets/Instagram.png")}
                                style={{
                                    height: 26,
                                    width: 26,
                                    marginRight: 8,
                                }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontSize: 18 }}>Instagram</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                marginRight: 30,
                                backgroundColor: isInstagramPressed ? COLORS.grey : 'white',
                                borderWidth: 1,
                                borderColor: COLORS.black,
                                borderRadius: 10
                            }}
                            onPress={handleInstagramPress}
                        >
                            <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 20, paddingVertical: 5 }}>
                                {isInstagramPressed ? 'Connected' : 'Connect'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
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
                            New Post
                        </Text>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 1, // Adjust the thickness as desired
                            borderBottomColor: COLORS.black,
                            marginLeft: -220, // Adjust the value to prevent overlapping
                        }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <TextInput
                            style={{
                                height: 150,
                                width: '95%',
                                borderWidth: 0.5,
                                borderColor: COLORS.black,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                textAlignVertical: 'top',
                                paddingVertical: 10,
                            }}
                            placeholder="Description for posts/feeds"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: COLORS.grey,
                                borderRadius: 10,
                                paddingHorizontal: 149,
                                paddingVertical: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.grey
                            }}
                            onPress={() => pickImage()}
                        >
                            {selectedImage ? (
                                <>
                                    <Image
                                        source={{ uri: selectedImage.uri }}
                                        style={{ width: 100, height: 100, borderRadius: 10 }}
                                        resizeMode="cover"
                                    />
                                    <Text style={{ fontSize: 16, marginTop: 10 }}>Change Image</Text>
                                </>
                            ) : (
                                <Text style={{ fontSize: 16 }}>Select Image</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginRight: 10 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.grey,
                                borderColor: COLORS.grey,
                                borderWidth: 1,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 20,
                            }}
                        >
                            <Text style={{ color: COLORS.black, fontSize: 16 }}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
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
                 {/* Remove button */}
  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginBottom: 10, marginRight: 10, }}>
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.grey,
        paddingHorizontal: 20,
        paddingVertical: 10,
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

export default ManageSocialInformation;
