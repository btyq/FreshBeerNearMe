// Import necessary libraries and components
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

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
            <Text style={{ fontSize: 12, ...{ color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const StarRating = () => {
    const [rating, setRating] = useState(4);

    const handleRating = (value) => {
        setRating(value);
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.yellow, marginTop: -7 }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                    <Ionicons
                        name="star"
                        size={20}
                        color={star <= rating ? COLORS.foam : COLORS.grey}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const FindABeer = ({ navigation }) => {
    const handleFindABeerClick = () => {
        navigation.navigate('FindABeer');
    };

    const handleFindAVenueClick = () => {
        navigation.navigate('FindAVenue');
    };

    const handleNearbyVenuesClick = () => {
        navigation.navigate('NearbyVenues');
    };

    const handleTopRatedClick = () => {
        navigation.navigate('TopRated');
    };

    const handleBreweriesClick = () => {
        navigation.navigate('Breweries');
    };

    const beerData = [
        { beerName: 'Beer Name 1', rating: 3 },
    ];

    return (
        <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                    paddingTop: 30,
                    backgroundColor: COLORS.foam,
                    height: 70,
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 5,
                }}
            >
                <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>FreshBeer</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Octicons name="bookmark" size={24} color={COLORS.black} style={{ marginRight: 12 }} />
                    <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
                </View>
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.grid}>
                        {[
                            { title: 'Find a Beer', page: 'FindABeer', onPress: handleFindABeerClick },
                            { title: 'Find a Venue', page: 'FindAVenue', onPress: handleFindAVenueClick },
                            { title: 'Nearby Venues', page: 'NearbyVenues', onPress: handleNearbyVenuesClick },
                            { title: 'Top Rated', page: 'TopRated', onPress: handleTopRatedClick },
                            { title: 'Breweries', page: 'Breweries', onPress: handleBreweriesClick },
                        ].map(({ title, page, onPress }) => (
                            <Button
                                key={title}
                                title={title}
                                color={COLORS.orange}
                                filled
                                style={styles.longButton}
                                onPress={onPress}
                            />
                        ))}
                    </View>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder="Search..."
                            style={styles.searchInput}
                        />
                        <Button
                            title="Search for Beer"
                            color={COLORS.orange}
                            filled
                            style={styles.searchButton}
                        />
                    </View>
                    <View style={styles.grid}>
                        {['Sort by Distance', 'Sort by Price', 'Sort by Rating'].map((title, index) => (
                            <Button
                                key={index}
                                title={title}
                                color={COLORS.orange}
                                filled
                                style={styles.shortButton}
                            />
                        ))}
                    </View>
                    <View style={styles.grid}>
                        {['Ascending', 'Descending'].map((title, index) => (
                            <Button
                                key={index}
                                title={title}
                                color={COLORS.orange}
                                filled
                                style={styles.shortButton}
                            />
                        ))}
                    </View>

                    <LinearGradient style={styles.container} colors={[COLORS.foam, COLORS.foam]}>
                      <ScrollView>
                        <View style={styles.BeerContainer}>
                        </View>
                        <ScrollView>
                            <View style={styles.containerSection}>
                                {beerData.map((item, index) => (
                                    <View key={index} style={styles.containerItem}>
                                        <View style={styles.leftContainer}>
                                            <Text style={styles.beerName}>{item.beerName}</Text>
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <Ionicons
                                                name="star"
                                                size={20}
                                                color={item.rating >= 3 ? COLORS.foam : COLORS.grey}
                                            />
                                            <Ionicons
                                                name="star"
                                                size={20}
                                                color={item.rating >= 4 ? COLORS.foam : COLORS.grey}
                                            />
                                            <Ionicons
                                                name="star"
                                                size={20}
                                                color={item.rating >= 5 ? COLORS.foam : COLORS.grey}
                                            />
                                            <Ionicons
                                                name="star"
                                                size={20}
                                                color={item.rating >= 6 ? COLORS.foam : COLORS.grey}
                                            />
                                            <Ionicons
                                                name="star"
                                                size={20}
                                                color={item.rating >= 7 ? COLORS.foam : COLORS.grey}
                                            />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                      </ScrollView>
                    </LinearGradient>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginHorizontal: 20,
    },
    longButton: {
        width: '20%',
        height: 55,
        marginVertical: 0,
        borderRadius: 50,
        marginRight: 0,
    },
    shortButton: {
        width: '30%',
        height: 40,
        marginVertical: 5,
        borderRadius: 30,
        marginHorizontal: '1%',
        marginTop: 10, // Adjust the top spacing here
    },
    button: {
        paddingVertical: 10,
        borderColor: COLORS.black,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        padding: 20,
    },
    card: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImage: {
        width: '110%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    clickableSection: {
        marginBottom: 20,
    },
    venueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: COLORS.yellow,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 10,
        height: 50, // adjust the height as per your requirement
        width: '105%', // adjust the width as per your requirement
        marginLeft: -10, // add left margin to move the container to the left
    },
    venueTitle: {
        fontSize: 20,
        color: COLORS.black,
    },
    starRatingContainer: {
        backgroundColor: COLORS.yellow,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20, // Adjust the top spacing here
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        width: '40%',
        height: 40,
        borderRadius: 10,
    },
    container: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 10, // Adjust the margin value to make it lower
        borderWidth: 1, // Add a border width
        borderColor: COLORS.black, // Specify the border color
        borderRadius: 10, // Add border radius for rounded corners
        padding: 10, // Add padding to create space between the border and the content
        height: 340, // Adjust the height as per your requirement
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingTop: 30, // reduce paddingTop to bring the header closer to the top
        backgroundColor: COLORS.foam,
        height: 70,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        color: COLORS.black,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 12,
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        height: 50, // Adjust the height value to make it bigger
        borderRadius: 10,
        borderWidth: 1, // Add border width
        borderColor: COLORS.black, // Specify the border color
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        width: '100%',
        alignSelf: 'center',
    },
    wishlistText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: COLORS.foam,
        padding: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
    },
    containerSection: {
        marginTop: 0,
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    beerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    venueName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
});

export default FindABeer;
