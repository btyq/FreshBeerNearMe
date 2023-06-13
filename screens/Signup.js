import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable, TextInput, ScrollView, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";

//CODES TO STYLE BUTTON
const Button = (props) => {
  const filledBgColor = COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{...styles.button,
              ...{backgroundColor: bgColor},
              ...props.style}}
      onPress={props.onPress}>
      <Text style={{fontSize: 16, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

//CODES FOR THE MAIN PAGE
const Signup = ({ navigation }) => {
  // ... same as before

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.foam]}>  
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 22}}>
          <View style={styles.cardContainer}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black
            }}>Create Account</Text>

            <Text style={{
              fontSize: 16,
              color: COLORS.black
            }}>Welcome to Fresh Beer Near Me!</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                placeholder='Enter your username'
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={styles.inputField}>
              </TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <View style={styles.phoneFieldContainer}>
                <Text style={styles.phoneFieldPrefix}>+65</Text>
                <TextInput
                  placeholder='Enter your phone number'
                  placeholderTextColor={COLORS.black}
                  keyboardType='numeric'
                  style={styles.phoneFieldInput}>
                </TextInput>
              </View>
            </View>

            // ... similar changes for the rest of the input fields
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  inputField: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
    padding: 10,
  },
  phoneFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
  },
  phoneFieldPrefix: {
    fontSize: 16,
    color: COLORS.black,
    width: '15%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: COLORS.grey,
  },
  phoneFieldInput: {
    width: '85%',
    padding: 10,
  },
  button: {
    paddingBottom: 16,
    paddingVertical:10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default Signup
