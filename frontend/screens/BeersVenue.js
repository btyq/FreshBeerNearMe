import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { Header } from 'react-native-elements';
import axios from 'axios';


const Button = (props) => {
  let bgColor = COLORS.white; // Set default background color to white
  let textColor = COLORS.black;

  if (props.title === 'Find a Venue') {
    bgColor = COLORS.orange; // Set background color to foam for "Find a Venue" button
    textColor = COLORS.black;
  } else if (props.title === 'Sort by Distance' && props.activeSortBy === 'Sort by Distance') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  } else if (props.title === 'Sort by Name' && props.activeSortBy === 'Sort by Name') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  } else if (props.title === 'Sort by Rating' && props.activeSortBy === 'Sort by Rating') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  } else if (props.title === 'Ascending' && props.activeSortOrder === 'Ascending') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  } else if (props.title === 'Descending' && props.activeSortOrder === 'Descending') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  } else if (props.title === 'Search for Venue') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  } else if (props.title === 'Close') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  } else if (props.title === 'View Reviews') {
    bgColor = COLORS.orange;
    textColor = COLORS.black;
  }

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

const VenueItem = ({ venueName, venueAddress, venueContact, venueRating, venueImage, venueOperatingHours }) => {
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
                color={star <= venueRating ? COLORS.foam : COLORS.grey}
                style={{ marginBottom: 4 }}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={popupVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <ScrollView>
              <Text style={styles.popupTitle}>{venueName}</Text>
              <Image source={{ uri: venueImage }} style={styles.venueImage} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ ...styles.starRatingContainer }}>
                  <Text style={styles.popupTitle}>Ratings: </Text>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={16}
                      color={star <= venueRating ? COLORS.foam : COLORS.grey}
                      style={{ marginBottom: 9 }}
                    />
                  ))}
                </View>
                <Button
                  title="View Reviews"
                  style={styles.shortButton}
                />
              </View>
              <Text style={{ ...styles.popupTitle, marginTop: 5 }}>Address </Text>
              <Text style>{venueAddress}</Text>
              <Text style={{ ...styles.popupTitle, marginTop: 5 }}>Contact </Text>
              <Text style>{venueContact}</Text>
              <Text style={{ ...styles.popupTitle, marginTop: 5 }}>Operating Hours </Text>
              <Text style>{venueOperatingHours}</Text>
              <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginTop: 15 }}>
                <Text style={{ ...styles.popupTitle, marginTop: 5 }}>Menu </Text>
              </View>
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

const BeersVenue = ({ navigation }) => {
  const [sortedVenueData, setSortedVenueData] = useState([]);
  const [activeSortBy, setActiveSortBy] = useState('Sort by Distance');
  const [activeSortOrder, setActiveSortOrder] = useState('Ascending');
  const [searchInput, setSearchInput] = useState('');
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/venueData');
        const { success, venueData } = response.data;
        if (success) {
          let sortedData = [...venueData];
          switch (activeSortBy) {
            case 'Sort by Name':
              sortedData.sort((a, b) => a.venueName.localeCompare(b.venueName));
              break;
            case 'Sort by Rating':
              sortedData.sort((a, b) => a.venueRating - b.venueRating);
              break;
            default:
              break;
          }
          if (activeSortOrder === 'Descending') {
            sortedData.reverse();
          }
          setSortedVenueData(sortedData);
          setVenueData(venueData);
        } else {
          console.error("Error retrieving venue data:", response.data.message);
        }
      } catch (error) {
        console.error("Error retrieving venue data:", error);
      }
    };
    fetchVenueData();
  }, [activeSortBy, activeSortOrder]);

  const handleSortBy = (by) => {
    if (by === activeSortBy) return;
    setActiveSortBy(by);
  };

  const handleSortOrder = (order) => {
    if (order === activeSortOrder) return;
    setActiveSortOrder(order);
    let sortedData = [...sortedVenueData];
    if (order === "Descending") {
      sortedData.reverse();
    }
    setSortedVenueData(sortedData);
  };

  const handleFindABeerClick = () => {
    navigation.navigate('BottomTab', { screen: 'FindABeer' });
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
    if (by === activeSortBy) return;
    setActiveSortBy(by);
  };

  const handleSortOrderClick = (order) => {
    if (order === activeSortOrder) return;
    setActiveSortOrder(order);
    let sortedData = [...sortedVenueData];
    if (order === "Descending") {
      sortedData.reverse();
    }
    setSortedVenueData(sortedData);
  };

  return (
    <View style={{ height: 620, backgroundColor: COLORS.white }}>
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
              color={COLORS.orange}
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
              color={COLORS.orange}
              filled
              style={styles.longButton}
              onPress={handleNearbyVenuesClick}
            />
            <Button
              title="Top Rated"
              color={COLORS.orange}
              filled
              style={styles.longButton}
              onPress={handleTopRatedClick}
            />
            <Button
              title="Breweries"
              color={COLORS.orange}
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
              title="Search for Venue"
              color={COLORS.orange}
              filled
              style={styles.searchButton}
              onPress={() => {
                const filteredData = venueData.filter((venue) =>
                  venue.venueName.toLowerCase().includes(searchInput.toLowerCase())
                );
                setSortedVenueData(filteredData);
              }}
            />
          </View>
          <View style={styles.grid}>
            <Button
              title="Sort by Distance"
              color={COLORS.orange}
              style={styles.shortButton}
              activeSortBy={activeSortBy}
              onPress={() => handleSortBy('Sort by Distance')}
            />
            <Button
              title="Sort by Name"
              color={COLORS.orange}
              filled={activeSortBy === "Sort By Name"}
              style={styles.shortButton}
              activeSortBy={activeSortBy}
              onPress={() => handleSortByClick('Sort by Name')}
            />
            <Button
              title="Sort by Rating"
              color={COLORS.orange}
              filled={activeSortBy === "Sort By Rating"}
              style={styles.shortButton}
              activeSortBy={activeSortBy}
              onPress={() => handleSortByClick('Sort by Rating')}
            />
          </View>
          <View style={styles.grid}>
            <Button
              title="Ascending"
              color={COLORS.orange}
              filled
              style={styles.shortButton}
              activeSortOrder={activeSortOrder}
              onPress={() => handleSortOrderClick('Ascending')}
            />
            <Button
              title="Descending"
              color={COLORS.orange}
              filled
              style={styles.shortButton}
              activeSortOrder={activeSortOrder}
              onPress={() => handleSortOrderClick('Descending')}
            />
          </View>

        <View style={styles.container}>
          <ScrollView>
            {sortedVenueData.map((venue) => (
              <VenueItem
                key={venue._id}
                venueName={venue.venueName}
                venueAddress={venue.venueAddress}
                venueContact={venue.venueContact}
                venueRating={venue.venueRating}
                venueImage={venue.venueImage}
                venueOperatingHours={venue.venueOperatingHours}
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
  popupContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: COLORS.orange,
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
  venueImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  }
});

export default BeersVenue;
