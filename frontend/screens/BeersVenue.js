// Import necessary libraries and components
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

// Import the FindABeer component
import FindABeer from './FindABeer';
import FindAVenue from './FindAVenue';
import NearbyVenues from './NearbyVenues';
import TopRated from './TopRated';
import Breweries from './Breweries';

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
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.yellow, marginTop: -7  }}>
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

const BeersVenue = ({ navigation }) => {
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

          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={handleFindABeerClick} style={styles.clickableSection}>
              <View style={styles.venueContainer}>
                <Text style={styles.venueTitle}>Venue 1</Text>
                <View style={styles.starRatingContainer}>
                  <StarRating />
                </View>
              </View>
              <View style={styles.card}>
                <ImageBackground
                  source={require('../assets/event1.png')}
                  style={styles.cardImage}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFindAVenueClick} style={styles.clickableSection}>
              <View style={styles.venueContainer}>
                <Text style={styles.venueTitle}>Venue 2</Text>
                <View style={styles.starRatingContainer}>
                  <StarRating />
                </View>
              </View>
              <View style={styles.card}>
                <ImageBackground
                  source={require('../assets/specialtybeer.png')}
                  style={styles.cardImage}
                />
              </View>
            </TouchableOpacity>
          </View>
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
});

export default BeersVenue;
