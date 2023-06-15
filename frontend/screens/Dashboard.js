import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import COLORS from "../constants/colors";
import { useFocusEffect } from '@react-navigation/native';

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
      <Text style={{ fontSize: 14, ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const Dashboard = ({ navigation, route }) => {
const { sessionToken, username } = route.params;
console.log("Username:", username);
console.log("Session Token:", sessionToken);
  
// ================================== Functions for different button ==================================
  const handleUpcomingEventsClick = () => {
    // Handle click for "Upcoming Events" here
  };

  const handleRecommendedSpecialtyClick = () => {
    // Handle click for "Recommended Specialty for You" here
  };

  
//=====================================================================================================
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
          <Octicons name="bookmark" size={24} color={COLORS.black} style={{marginRight: 12}}/>
          <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
        </View>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: COLORS.black }}>Welcome!</Text>
            <View style={styles.grid}>
              <Button
                title="My Profile"
                onPress={() => navigation.navigate('BottomTabNavigation', { screen: 'Profile' })}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Beers & Venues"
                onPress={() => navigation.navigate('BeersVenue')}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Social & Community"
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Feedback & Requests"
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="My Journal & Achievements"
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="My Wishlist"
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
            </View>
          </View>

          <View style={styles.cardContainer}>
          <Text style={{ fontSize: 17, color: COLORS.black }}>Upcoming Events</Text>
            <TouchableOpacity onPress={handleUpcomingEventsClick} style={styles.clickableSection}>
              <View style={styles.card}>
                <ImageBackground                 
                  source={require('../assets/event1.png')} 
                  style={styles.cardImage}
                >
                </ImageBackground>
                <Text style={{ fontSize: 16, color: COLORS.black }}></Text>
              </View>
            </TouchableOpacity>

            <Text style={{ fontSize: 17, color: COLORS.black }}>Recommended Specially for You</Text>
            <TouchableOpacity onPress={handleRecommendedSpecialtyClick} style={styles.clickableSection}>
              <View style={styles.card}>
                <ImageBackground                 
                  source={require('../assets/specialtybeer.png')} 
                  style={styles.cardImage}
                >
                </ImageBackground>
                <Text style={{ fontSize: 16, color: COLORS.black }}></Text>
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
    marginBottom: 10,
  },
  gridItem: {
    width: '45%',
    height: 50, // increased height
    marginVertical: 5,
    marginHorizontal: '2.5%',
  },
  button: {
    paddingVertical: 3, // increased padding
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 30,
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
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    width: '110%',
    height: '122%',
    resizeMode: 'cover',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
  },
  clickableSection: {
    marginBottom: 20,
  },
});

export default Dashboard;
