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

const ManageInventory = ({ navigation }) => {
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
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
                        Manage Inventory
                    </Text>
                </View>
                <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => { }} style={{
                        borderWidth: 1,
                        borderColor: COLORS.grey,
                        borderRadius: 5,
                        padding: 5,
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 18 }}>Sync Data</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
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
                        Current Inventory
                    </Text>
                    <View style={{
                        flex: 1,
                        borderBottomWidth: 2, // Adjust the thickness as desired
                        borderBottomColor: COLORS.grey,
                        marginLeft: -80, // Adjust the value to prevent overlapping
                    }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                            
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/beer1.png')} style={{
                            width: 140,
                            height: 140,
                            marginLeft: 20,
                            borderRadius: 10,
                        }} />

                        <View style={{
                            marginLeft: 10, borderWidth: 1,
                            borderColor: COLORS.black,
                            borderRadius: 10,
                            padding: 10,
                            width: 240,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Name:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'76%',
                                }}>Beer Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Current Stock:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'50%',
                                }}>10</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>Sold:</Text>
                                <Text style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    width:'80%',
                                }}>20</Text>
                            </View>


                            <TouchableOpacity style={{
                                alignItems: 'center',
                                backgroundColor: COLORS.grey,
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderRadius: 10,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: COLORS.black,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>Edit Inventory</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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

export default ManageInventory;
