import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

//CODES TO STYLE BUTTON
const Button = (props) => {
  const filledBgColor = props.color || COLORS.yellow;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.black : COLORS.primary;
  
return (
  <TouchableOpacity 
  style={{...styles.button,
          ...{backgroundColor: bgColor},
          ...props.style}}
  onPress={props.onPress}>
      <Text style={{fontSize: 15, ... { color: textColor }}}>{props.title}</Text>
  </TouchableOpacity>
)
}

const Dashboard = ({ navigation }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          paddingTop: 30,
          backgroundColor: '#ffff99',
          height: 70,
        }}
      >
        <Text style={{ fontSize: 20 }}>FreshBeer</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome</Text>
            <View style={styles.grid}>
              <Button
                title="My Profile"
                onPress={() => navigation.navigate("Profile")}
                color="#ffff99"
                filled
                style={styles.gridItem}
              ></Button>
              <Button
                title="Beers & Venues"
                color="#ffff99"
                filled
                style={styles.gridItem}
              ></Button>
              <Button
                title="Social & Community"
                color="#ffff99"
                filled
                style={styles.gridItem}
              ></Button>
              <Button
                title="Feedback & Requests"
                color="#ffff99"
                filled
                style={styles.gridItem}
              ></Button>
              <Button
                title="My Journal & Achievements"
                color="#ffff99"
                filled
                style={styles.gridItem}
              ></Button>
              <Button
                title="My Wishlist"
                color="#ffff99"
                filled
                style={styles.gridItem}
              ></Button>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text>Upcoming Events</Text>
            <View style={styles.card}>
              <ImageBackground
                source={require('../assets/event1.png')} 
                style={styles.cardImage}>
              </ImageBackground>
              <Text>Event details...</Text>
            </View>

            <Text>Recommended Specialty for You</Text>
            <View style={styles.card}>
              <ImageBackground
                source={require('../assets/specialtybeer.png')} 
                style={styles.cardImage}>
              </ImageBackground>
              <Text>Specialty details...</Text>
            </View>
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
    height: 50,
    marginVertical: 10,
    marginHorizontal: '2.5%',
  },
  button:{
    paddingBottom: 16,
    paddingVertical:10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  cardImage: {
    flex : 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    overflow: 'hidden'
  },
});

export default Dashboard;
