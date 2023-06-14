import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

// Define your custom colors
const COLORS = {
  primary: '#6D4C41', // Dark Brown color (resembles dark craft beer)
  secondary: '#DAA520', // Golden color (resembles light craft beer)
  foam: '#F0E68C', // Frothy beer foam color
  white: '#FFFFFF',
  black: '#000000',
};

// CODES TO STYLE BUTTON
const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold', ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const Dashboard = ({ navigation }) => {
  const handleUpcomingEventsClick = () => {
    // Handle click for "Upcoming Events" here
  };

  const handleRecommendedSpecialtyClick = () => {
    // Handle click for "Recommended Specialty for You" here
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.secondary, COLORS.primary]}>
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
        <Text style={{ fontSize: 22, color: COLORS.primary, fontWeight: 'bold' }}>FreshBeer</Text>
        <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: COLORS.foam }}>Welcome</Text>
            <View style={styles.grid}>
              <Button
                title="My Profile"
                onPress={() => navigation.navigate('Profile')}
                color={COLORS.secondary}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Beers & Venues"
                onPress={() => navigation.navigate('BeersVenue')}
                color={COLORS.secondary}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Social & Community"
                color={COLORS.secondary}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Feedback & Requests"
                color={COLORS.secondary}
                filled
                style={styles.gridItem}
              />
              <Button
                title="My Journal & Achievements"
                color={COLORS.secondary}
                filled
                style={styles.gridItem}
              />
              <Button
                title="My Wishlist"
                color={COLORS.secondary}
                filled
                style={styles.gridItem}
              />
            </View>
          </View>

          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={handleUpcomingEventsClick} style={styles.clickableSection}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.foam }}>Upcoming Events</Text>
              <View style={styles.card}>
                <ImageBackground                 
                  source={require('../assets/event1.png')} 
                  style={styles.cardImage}
                >
                </ImageBackground>
                <Text style={{ fontSize: 16, color: COLORS.black }}></Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRecommendedSpecialtyClick} style={styles.clickableSection}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.foam }}>Recommended Specialty for You</Text>
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
    marginBottom: 20,
  },
  gridItem: {
    width: '45%',
    height: 70, // increased height
    marginVertical: 10,
    marginHorizontal: '2.5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    paddingVertical: 15, // increased padding
    borderColor: COLORS.primary,
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
