import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import Button from "../components/Button";

const Dashboard = ({ navigation }) => {

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#ffffff', '#ffffff']}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10,paddingTop: 30, backgroundColor: 'yellow', height: 70 }}>
        <Text style={{ fontSize: 20 }}>FreshBeer</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome</Text>
            <View style={styles.grid}>
              <Button style={styles.gridItem}>Button 1</Button>
              <Button style={styles.gridItem}>Button 2</Button>
              <Button style={styles.gridItem}>Button 3</Button>
              <Button style={styles.gridItem}>Button 4</Button>
              <Button style={styles.gridItem}>Button 5</Button>
              <Button style={styles.gridItem}>Button 6</Button>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text>Upcoming Events</Text>
            <View style={styles.card}>
              <Text>Event details...</Text>
            </View>

            <Text>Recommended Specialty for You</Text>
            <View style={styles.card}>
              <Text>Specialty details...</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

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
    marginBottom: 10
  },
  cardImage: {
    width: '100%',
    height: '70%'
  }
});

export default Dashboard;
