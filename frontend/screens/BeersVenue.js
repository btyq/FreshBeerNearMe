import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  let bgColor = COLORS.white; // Set default background color to white
  if (props.title === 'Find a Venue') {
    bgColor = COLORS.foam; // Set background color to foam for "Find a Venue" button
  } else if (props.title === 'Search for Venue') {
    bgColor = COLORS.foam; // Set background color to foam for "Search for Venue" button
  }
  const textColor = props.filled ? COLORS.black : COLORS.primary;

  const handlePressIn = () => {
    // Adjust the opacity and scale of the button when pressed
    if (props.onPressIn) {
      props.onPressIn();
    }
  };

  const handlePressOut = () => {
    // Reset the opacity and scale of the button when released
    if (props.onPressOut) {
      props.onPressOut();
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7} // Adjust the opacity when the button is pressed
    >
      <Text style={{ fontSize: 12, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const StarRating = () => {
  const [rating, setRating] = useState(4);

  const handleRating = () => {
    const randomRating = Math.floor(Math.random() * 3) + 3; // Generate a random number between 3 and 5
    setRating(randomRating);
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

const VenueItem = ({ venueName, rating }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity style={styles.itemContainer} onPress={handlePopupOpen}>
        <View style={styles.leftContainer}>
          <Text style={styles.venueName}>{venueName}</Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.starRatingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={16}
                color={star <= rating ? COLORS.foam : COLORS.grey}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={popupVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>{venueName}</Text>
            <Text style={styles.popupContent}>Popup Content</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handlePopupClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const BeersVenue = ({ navigation }) => {
  const handleFindABeerClick = () => {
    navigation.navigate('FindABeer');
  };

  const handleFindAVenueClick = () => {
    navigation.navigate('BeersVenue');
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
              { title: 'Find a Venue', page: 'BeersVenue', onPress: handleFindAVenueClick },
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
              title="Search for Venue"
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
        </ScrollView>

        <View style={styles.container}>
          <ScrollView>
            {Array.from({ length: 1 }).map((_, index) => (
              <VenueItem
                key={index}
                venueName={`Venue Name ${index + 1}`}
                rating={Math.floor(Math.random() * 3) + 3}
              />
            ))}
          </ScrollView>
        </View>
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
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10, // Adjust the margin value to make it lower
    borderWidth: 1, // Add a border width
    borderColor: COLORS.black, // Specify the border color
    borderRadius: 10, // Add border radius for rounded corners
    padding: 10, // Add padding to create space between the border and the content
    minHeight: 340, // Adjust the height as per your requirement
    backgroundColor: COLORS.foam,
    shadowColor: COLORS.black, // Add shadow color
    shadowOffset: { width: 0, height: 2 }, // Add shadow offset
    shadowOpacity: 0.3, // Add shadow opacity
    shadowRadius: 3, // Add shadow radius
    elevation: 5, // Add elevation for Android
  },
  subContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: COLORS.black, // Add shadow color
    shadowOffset: { width: 0, height: 2 }, // Add shadow offset
    shadowOpacity: 0.3, // Add shadow opacity
    shadowRadius: 3, // Add shadow radius
    elevation: 5, // Add elevation for Android
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  venueName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%', // Adjust the width of the popup
    height: 300, // Adjust the height of the popup
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '50%', // Adjust the marginTop to shift the close button down
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BeersVenue;
