import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import axios from "axios";
import { Header } from 'react-native-elements';

const Button = (props) => {
  const isSelected = props.option === props.selectedOption; // Check if the button is selected
  const bgColor = isSelected ? COLORS.foam : COLORS.white; // Update color based on isSelected
  const textColor = isSelected ? COLORS.black : COLORS.primary; // Set the text color based on selection

  const handlePress = () => {
    if (!isSelected) {
      props.onPress(); // Call the onPress function from props only if not selected
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={handlePress} // Use the custom handlePress function for onPress event
    >
      <Text style={{ fontSize: 12, ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

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
              <Image source={{ uri: beerImage }} style={styles.beerImage} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.popupTitle}>Price: ${beerPrice}</Text>
                <View style={{ ...styles.starRatingContainer, marginBottom: 5 }}>
                  <Text style={styles.popupTitle}>Ratings: </Text>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={16}
                      color={star <= rating ? COLORS.foam : COLORS.grey}
                      style={{ marginBottom: 4 }}
                    />
                  ))}
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.popupTitle}>Alcohol%: {ABV}</Text>
                <Text style={styles.popupTitle}>Bitter Units: {IBU}</Text>
              </View>
              <Text style={styles.popupTitle}>Beer Description</Text>
              <Text>{beerDescription}</Text>
              <Text style={{ ...styles.popupTitle, marginTop: 10 }}>Locations </Text>
              <Text>{venueAvailability}</Text>
              <Text style={{ ...styles.popupTitle, marginTop: 10 }}>Community Reviews </Text>
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
  const [sortedBeerData, setSortedBeerData] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    const fetchBeerData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/beerData');
        const { success, beerData } = response.data;
        if (success) {
          let sortedData = [...beerData];
          switch (sortBy) {
            case 'name':
              sortedData.sort((a, b) => a.beerName.localeCompare(b.beerName));
              break;
            case 'price':
              sortedData.sort((a, b) => a.beerPrice - b.beerPrice);
              break;
            case 'rating':
              sortedData.sort((a, b) => b.rating - a.rating);
              break;
            default:
              break;
          }
          if (sortOrder === 'desc') {
            sortedData.reverse();
          }
          setSortedBeerData(sortedData);
        } else {
          console.error('Error retrieving beer data:', response.data.message);
        }
      } catch (error) {
        console.error('Error retrieving beer data:', error);
      }
    };

    fetchBeerData();
  }, [sortBy, sortOrder]);

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
      <Header
        placement="left"
        backgroundColor={COLORS.foam}
        centerComponent={{ text: 'FreshBeer', style: { fontSize: 20, color: COLORS.black, fontWeight: 'bold', flexDirection: 'row' } }}
        rightComponent={
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity>
              <Octicons name="bookmark" size={24} color={COLORS.black} style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.grid}>
            {[
              { title: 'Find a Venue', page: 'FindAVenue', onPress: handleFindAVenueClick },
              { title: 'Find a Beer', page: 'FindABeer', onPress: handleFindABeerClick },
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
            <Button
              title="Sort by Name"
              option="name"
              selectedOption={sortOption}
              color={COLORS.white}
              filled={false}
              style={styles.shortButton}
              onPress={() => {
                setSortBy('name');
                setSortOption('name');
              }}
            />
            <Button
              title="Sort by Price"
              option="price"
              selectedOption={sortOption}
              color={COLORS.white}
              filled={false}
              style={styles.shortButton}
              onPress={() => {
                setSortBy('price');
                setSortOption('price');
              }}
            />
            <Button
              title="Sort by Rating"
              option="rating"
              selectedOption={sortOption}
              color={COLORS.white}
              filled={false}
              style={styles.shortButton}
              onPress={() => {
                setSortBy('rating');
                setSortOption('rating');
              }}
            />
          </View>

          <View style={styles.grid}>
            <Button
              title="Ascending"
              option="asc"
              selectedOption={sortOrder}
              color={sortOrder === 'asc' ? COLORS.foam : COLORS.white}
              filled={false}
              style={styles.shortButton}
              onPress={() => setSortOrder('asc')}
            />
            <Button
              title="Descending"
              option="desc"
              selectedOption={sortOrder}
              color={sortOrder === 'desc' ? COLORS.foam : COLORS.white}
              filled={false}
              style={styles.shortButton}
              onPress={() => setSortOrder('desc')}
            />
          </View>
        </ScrollView>
        <View style={styles.container}>
          <ScrollView>
            {sortedBeerData.map((beer, index) => (
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
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    borderColor: COLORS.black,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
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
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    padding: 10,
    minHeight: 340,
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
