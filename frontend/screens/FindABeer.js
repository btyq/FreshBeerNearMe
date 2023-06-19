import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import axios from "axios";

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

//Function to display each beer item in a container
const BeerItem = ({ beerName, beerPrice, rating, beerDescription, beerImage, ABV, IBU, communityReviews, venueAvailability }) => {
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
          <Text style={styles.beerName}>{beerName}</Text>
          <Text style={styles.beerName}>Price: ${beerPrice}</Text>
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
              <ScrollView>
                <Text style={styles.popupTitle}>{beerName}</Text>
                <Image source={{ uri: beerImage}} style={styles.beerImage}/>
                  <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.popupTitle}>Price: ${beerPrice}</Text>
                    <View style={{...styles.starRatingContainer, marginBottom: 5}}>
                      <Text style={styles.popupTitle}>Ratings: </Text>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name="star"
                          size={16}
                          color={star <= rating ? COLORS.foam : COLORS.grey}
                          style={{marginBottom: 4}}
                        />
                      ))}
                    </View>
                  </View>
                  <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.popupTitle}>Alcohol%: {ABV}</Text>
                    <Text style={styles.popupTitle}>Bitter Units: {IBU}</Text>
                  </View>
                  <Text style={styles.popupTitle}>Beer Description</Text>
                  <Text>{beerDescription}</Text>
                  <Text style={{...styles.popupTitle, marginTop: 10}}>Locations </Text>
                  <Text>{venueAvailability}</Text>
                  <Text style={{...styles.popupTitle, marginTop: 10}}>Community Reviews </Text>
                  <Text>{communityReviews}</Text>
                <Button
                  title="Close"
                  onPress={handlePopupClose}
                  color={COLORS.yellow}
                  filled
                  style={styles.closeButton}
                />
              </ScrollView>
            </View>
        </View>
      </Modal>
    </View>
  );
};

const FindABeer = ({ navigation }) => {

  const [beerData, setBeerData] = useState([]);

  //Function to retrieve the list of beer data in the database
  useEffect(() => {
    const fetchBeerData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/beerData');
        const { success, beerData } = response.data;
        if (success) {
          setBeerData(beerData);
        } else {
          console.error('Error retrieving beer data:', response.data.message);
        }
      } catch (error) {
        console.error('Error retrieving beer data:', error);
      }
    };
  
    fetchBeerData();
  }, []);

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
              { title: 'Find a Venue', page: 'FindAVenue', onPress: handleFindAVenueClick },
              { title: 'Nearby Venues', page: 'NearbyVenues', onPress: handleNearbyVenuesClick },
              { title: 'Top Rated', page: 'TopRated', onPress: handleTopRatedClick },
              { title: 'Breweries', page: 'Breweries', onPress: handleBreweriesClick },
            ].map(({ title, page, onPress }) => (
              <Button
                key={title}
                title={title}
                color={title === 'Find a Beer' ? COLORS.foam : COLORS.white}
                filled={title === 'Find a Beer' || title === 'Search for Beer'}
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
              color={COLORS.foam}
              filled
              style={styles.searchButton}
            />
          </View>
          <View style={styles.grid}>
            {['Sort by Name', 'Sort by Price', 'Sort by Rating'].map((title, index) => (
              <Button
                key={index}
                title={title}
                color={COLORS.white}
                filled={false}
                style={styles.shortButton}
              />
            ))}
          </View>
          <View style={styles.grid}>
            {['Ascending', 'Descending'].map((title, index) => (
              <Button
                key={index}
                title={title}
                color={COLORS.white}
                filled={false}
                style={styles.shortButton}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.container}>
          <ScrollView>
            {beerData.map((beer, index) => (
              <BeerItem
                key={index}
                beerName={beer.beerName}
                beerPrice={beer.price}
                rating={beer.rating}
                beerDescription={beer.beerDescription}
                beerImage={beer.beerImage}
                ABV={beer.abv}
                IBU={beer.ibu}
                venueAvailability={beer.venueAvailability}
                communityReviews={beer.communityReviews}
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
  },
  subContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
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
  beerName: {
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
    width: '90%', 
    height: 550, 
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  popupContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: COLORS.foam,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '5%', 
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  beerImage: {
    width: '100%', 
    height: 200, 
    resizeMode: 'cover', 
    borderRadius: 10, 
    marginBottom: 10, 
  }
});

export default FindABeer;
