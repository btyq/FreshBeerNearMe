import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import axios from 'axios';
import { Header } from 'react-native-elements';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.orange;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.black : COLORS.black;

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

const BeerItem = ({
  beerName,
  price,
  rating,
  beerDescription,
  beerImage,
  ABV,
  IBU,
  communityReviews,
  venueAvailability,
}) => {
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
          <Text style={styles.beerName}>Price: ${price}</Text>
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
                <Text style={styles.popupTitle}>Price: ${price}</Text>
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
              <Text style={{ ...styles.popupTitle, marginTop: 10 }}>Locations</Text>
              {venueAvailability && venueAvailability.map((location, index) => (
                <Text key={index}>{location}</Text>
              ))}
              <Text style={{ ...styles.popupTitle, marginTop: 10 }}>Community Reviews</Text>
              {communityReviews && communityReviews.map((review, index) => (
                <Text key={index}>{review}</Text>
              ))}
              <Button
                title="Close"
                onPress={handlePopupClose}
                color={COLORS.foam}
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
  const [searchInput, setSearchInput] = useState('');
  const [beerData, setBeerData] = useState([]);

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
              sortedData.sort((a, b) => a.price - b.price);
              break;
            case 'rating':
              sortedData.sort((a, b) => a.rating - b.rating);
              break;
            default:
              break;
          }
          if (sortOrder === 'desc') {
            sortedData.reverse();
          }
          setSortedBeerData(sortedData);
          setBeerData(beerData);
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

  const handleSortByClick = (by) => {
    if (by === sortBy) return;
    setSortBy(by);
  };

  const handleSortOrderClick = (order) => {
    if (order === sortOrder) return;
    setSortOrder(order);
    let sortedData = [...sortedBeerData];
    if (order === 'desc') {
      sortedData.reverse();
    }
    setSortedBeerData(sortedData);
  };

  return (
    <View style={{ height: 630, backgroundColor: COLORS.white }}>
      <Header
        placement="left"
        backgroundColor={COLORS.primary}
        containerStyle={{
          height: 100,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
        centerComponent={{
          text: 'FreshBeer',
          style: {
            fontSize: 20,
            color: COLORS.black,
            fontWeight: 'bold',
            flexDirection: 'row',
          },
        }}
        rightComponent={
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity>
              <Octicons name="bookmark" size={24} color={COLORS.black} style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        }
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.grid}>
          <Button
            title="Find a Venue"
            color={COLORS.white}
            filled
            style={styles.longButton}
            onPress={handleFindAVenueClick}
          />
          <Button
            title="Find a Beer"
            color={COLORS.orange}
            filled
            style={styles.longButton}
            onPress={handleFindABeerClick}
          />
          <Button
            title="Nearby Venues"
            color={COLORS.white}
            filled
            style={styles.longButton}
            onPress={handleNearbyVenuesClick}
          />
          <Button
            title="Top Rated"
            color={COLORS.white}
            filled
            style={styles.longButton}
            onPress={handleTopRatedClick}
          />
          <Button
            title="Breweries"
            color={COLORS.white}
            filled
            style={styles.longButton}
            onPress={handleBreweriesClick}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            onChangeText={setSearchInput}
          />
          <Button
            title="Search for Beer"
            color={COLORS.orange}
            filled
            style={styles.searchButton}
            onPress={() => {
              const filteredData = beerData.filter((beer) =>
                beer.beerName.toLowerCase().includes(searchInput.toLowerCase())
              );
              setSortedBeerData(filteredData);
            }}
          />
        </View>
        <View style={styles.grid}>
          <Button
            title="Sort by Name"
            color={COLORS.orange}
            filled={sortBy === 'name'}
            style={styles.shortButton}
            onPress={() => handleSortByClick('name')}
          />
          <Button
            title="Sort by Price"
            color={COLORS.orange}
            filled={sortBy === 'price'}
            style={styles.shortButton}
            onPress={() => handleSortByClick('price')}
          />
          <Button
            title="Sort by Rating"
            color={COLORS.orange}
            filled={sortBy === 'rating'}
            style={styles.shortButton}
            onPress={() => handleSortByClick('rating')}
          />
        </View>
        <View style={styles.grid}>
          <Button
            title="Ascending"
            color={COLORS.orange}
            filled={sortOrder === 'asc'}
            style={styles.shortButton}
            onPress={() => handleSortOrderClick('asc')}
          />
          <Button
            title="Descending"
            color={COLORS.orange}
            filled={sortOrder === 'desc'}
            style={styles.shortButton}
            onPress={() => handleSortOrderClick('desc')}
          />
        </View>

        <View style={styles.container}>
        <ScrollView>
          {sortedBeerData.map((beer) => (
            <BeerItem
              key={beer._id}
              beerName={beer.beerName}
              price={beer.price}
              rating={beer.rating}
              beerDescription={beer.beerDescription}
              beerImage={beer.beerImage}
              ABV={beer.abv}
              IBU={beer.ibu}
              communityReviews={beer.communityReviews}
              venueAvailability={beer.venueAvailability}
            />
          ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
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
    borderWidth: 1,
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
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    padding: 10,
    minHeight: 50, // Adjust the height as per your requirement
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  subContainer: {
    marginBottom: 10,
    backgroundColor: COLORS.orange,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
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
    width: '80%', // Adjust the width of the popup
    height: 500, // Adjust the height of the popup
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
  beerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: COLORS.orange,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '50%', // Adjust the marginTop to shift the close button down
  },
});

export default FindABeer;
