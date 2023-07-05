import { Ionicons, Octicons } from "@expo/vector-icons";
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
import DatePicker from '@react-native-community/datetimepicker';
import COLORS from "../constants/colors";
import GlobalStyle from "../utils/GlobalStyle";

const CreatePromotion = ({ navigation }) => {
    const { cookies } = useCookies();
    const [index, setIndex] = React.useState(0);
    const [index1, setIndex1] = React.useState(0);
    const [username, setUsername] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const handleClearButton = () => {
        setTitle('');
        setDate(new Date());
        setDescription('');
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);

        const today = new Date().setHours(0, 0, 0, 0);

        if (currentDate < today) {
            setDate(new Date());
            setErrorMessage("Date cannot be set earlier than today");
        } else if (currentDate > today) {
            setDate(new Date());
            setErrorMessage("Date cannot be set beyond today");
        } else {
            setDate(currentDate);
            setErrorMessage("");
        }
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

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
                <View style={{ marginTop: 20, marginLeft: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Text
                        style={{
                            marginLeft: 20,
                            marginBottom: 10,
                            fontSize: 17,
                            marginBottom: 5,
                            flex: 1,
                        }}
                    >
                        Create Post
                    </Text>
                    <View style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.black,
                        marginLeft: -150,
                    }} />
                </View>
                <View
                    style={{
                        width: '95%',
                        alignSelf: 'center',
                        marginTop: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Title</Text>
                    <TextInput
                        style={{
                            height: 40,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            paddingHorizontal: 5,
                            borderWidth: 1,
                            borderRadius: 10,
                        }}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Date</Text>
                        {/* Error message */}
                        {errorMessage ? (
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        ) : null}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{
                                flex: 1,
                                height: 40,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                paddingHorizontal: 5,
                                borderWidth: 1,
                                borderRadius: 10,
                            }}
                            value={formatDate(date)}
                            placeholder="DD/MM/YYYY"
                            onChangeText={(text) => {
                                // Validate and set the date
                                const [day, month, year] = text.split('/');
                                const parsedDate = new Date(`${year}-${month}-${day}`);
                                if (!isNaN(parsedDate.getTime())) {
                                    setDate(parsedDate);
                                    setErrorMessage("");
                                } else {
                                    setErrorMessage("Invalid date format");
                                }
                            }}
                        />
                        <TouchableOpacity onPress={showDatePickerModal} style={{ marginLeft: 5 }}>
                            <Ionicons name="calendar" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                    {showDatePicker && (
                        <DatePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}

                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Description</Text>
                    <TextInput
                        style={{
                            height: 150,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            paddingHorizontal: 5,
                            borderWidth: 1,
                            borderRadius: 5,
                            textAlignVertical: 'top',
                        }}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        multiline={true}
                        numberOfLines={5}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            paddingHorizontal: 140,
                            paddingVertical: 7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.grey,
                        }}
                        onPress={selectImage}
                    >
                        {selectedImage ? (
                            <>
                                <Image
                                    source={{ uri: selectedImage.uri }}
                                    style={{ width: 100, height: 100, borderRadius: 10 }}
                                    resizeMode="cover"
                                />
                                <Text>{selectedImage.name}</Text>
                                <Text>{selectedImage.type}</Text>
                            </>
                        ) : (
                            <Text>Select an Image</Text>
                        )}
                    </TouchableOpacity>
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
                        onPress={handleClearButton}
                    >
                        <Text style={{ color: COLORS.black, fontSize: 16 }}>Clear</Text>
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
                        <Text style={{ color: COLORS.black, fontSize: 16 }}>Submit</Text>
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
    errorMessage: {
        color: COLORS.red,
        marginTop: 5,
        marginLeft: 10,
        fontStyle: 'italic',
    },
});

export default CreatePromotion;
