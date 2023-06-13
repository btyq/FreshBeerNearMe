import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

const Profile = ({ navigation }) => {
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    
  });

export default Profile;
