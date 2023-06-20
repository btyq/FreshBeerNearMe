import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { Header } from 'react-native-elements';

const MyWishlist = () => {
  const beerData = [
    { beerName: 'Beer Name 1', rating: 3 },
    { beerName: 'Beer Name 2', rating: 4 },
    { beerName: 'Beer Name 3', rating: 3 },
    { beerName: 'Beer Name 4', rating: 4 },
    { beerName: 'Beer Name 5', rating: 3 },
    { beerName: 'Beer Name 6', rating: 4 },
    { beerName: 'Beer Name 7', rating: 3 },
    { beerName: 'Beer Name 8', rating: 4 },
    { beerName: 'Beer Name 9', rating: 3 },
    { beerName: 'Beer Name 10', rating: 4 },
  ];

  const venueData = [
    { venueName: 'Venue Name 1', rating: 3 },
    { venueName: 'Venue Name 2', rating: 4 },
    { venueName: 'Venue Name 3', rating: 3 },
    { venueName: 'Venue Name 4', rating: 4 },
    { venueName: 'Venue Name 5', rating: 3 },
    { venueName: 'Venue Name 6', rating: 4 },
    { venueName: 'Venue Name 7', rating: 3 },
    { venueName: 'Venue Name 8', rating: 4 },
    { venueName: 'Venue Name 9', rating: 3 },
    { venueName: 'Venue Name 10', rating: 4 },
  ];

  return (
    <LinearGradient style={styles.container} colors={[COLORS.white, COLORS.yellow]}>
      <Header
        placement="left"
        backgroundColor={COLORS.foam}
        centerComponent={{ text: 'FreshBeer', style: {fontSize: 20, color: COLORS.black, fontWeight: 'bold', flexDirection: 'row'} }}
        rightComponent={
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={24} color={COLORS.black} style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color={COLORS.black} />                    
            </TouchableOpacity>
          </View>}
      />
      <View style={styles.wishlistContainer}>
        <Text style={styles.wishlistText}>My Wishlist</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.wishlistContainer}>
        </View>
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
        <View style={styles.containerSection}>
          {venueData.map((item, index) => (
            <View key={index} style={styles.containerItem}>
              <View style={styles.leftContainer}>
                <Text style={styles.venueName}>{item.venueName}</Text>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wishlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 5, // reduce paddingRight to bring items closer together
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
    marginTop: 20,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '80%',
    alignSelf: 'center',
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

export default MyWishlist;
