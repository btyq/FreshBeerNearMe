import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { Header } from 'react-native-elements';

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

const BreweryItem = ({ breweryName, rating }) => {
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
          <Text style={styles.breweryName}>{breweryName}</Text>
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
            <Text style={styles.popupTitle}>{breweryName}</Text>
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

const Breweries = ({ navigation }) => {
  const [sortByDistance, setSortByDistance] = useState(true);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByRating, setSortByRating] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [sortDescending, setSortDescending] = useState(false);

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

  const handleSortByDistance = () => {
    setSortByDistance(true);
    setSortByPrice(false);
    setSortByRating(false);
  };

  const handleSortByPrice = () => {
    setSortByDistance(false);
    setSortByPrice(true);
    setSortByRating(false);
  };

  const handleSortByRating = () => {
    setSortByDistance(false);
    setSortByPrice(false);
    setSortByRating(true);
  };

  const handleSortAscending = () => {
    setSortAscending(true);
    setSortDescending(false);
  };

  const handleSortDescending = () => {
    setSortAscending(false);
    setSortDescending(true);
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
      <Header
        placement="left"
        backgroundColor={COLORS.foam}
        centerComponent={{ text: 'FreshBeer', style: {fontSize: 20, color: COLORS.black, fontWeight: 'bold', flexDirection: 'row'} }}
        rightComponent={
          <View style={{flexDirection: 'row', marginTop: 5}}>
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
                color={page === 'Breweries' ? COLORS.foam : COLORS.white}
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
              title="Search for Brewery"
              color={COLORS.foam}
              filled
              style={styles.searchButton}
            />
          </View>
          <View style={styles.grid}>
            <Button
              title="Sort by Distance"
              color={sortByDistance ? COLORS.foam : COLORS.white}
              filled={sortByDistance}
              style={styles.shortButton}
              onPress={handleSortByDistance}
            />
            <Button
              title="Sort by Price"
              color={sortByPrice ? COLORS.foam : COLORS.white}
              filled={sortByPrice}
              style={styles.shortButton}
              onPress={handleSortByPrice}
            />
            <Button
              title="Sort by Rating"
              color={sortByRating ? COLORS.foam : COLORS.white}
              filled={sortByRating}
              style={styles.shortButton}
              onPress={handleSortByRating}
            />
          </View>
          <View style={styles.grid}>
            <Button
              title="Ascending"
              color={sortAscending ? COLORS.foam : COLORS.white}
              filled={sortAscending}
              style={styles.shortButton}
              onPress={handleSortAscending}
            />
            <Button
              title="Descending"
              color={sortDescending ? COLORS.foam : COLORS.white}
              filled={sortDescending}
              style={styles.shortButton}
              onPress={handleSortDescending}
            />
          </View>
        </ScrollView>

        <View style={styles.container}>
          <ScrollView>
            {Array.from({ length: 10 }).map((_, index) => (
              <BreweryItem
                key={index}
                breweryName={`Brewery Name ${index + 1}`}
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
    marginTop: 10,
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
  breweryName: {
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
    width: '80%',
    height: 300,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default Breweries;
