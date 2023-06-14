import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from "expo-checkbox";
import { SelectList } from 'react-native-dropdown-select-list';

//CODES TO STYLE BUTTON
const Button = (props) => {
  const filledBgColor = props.color || COLORS.yellow;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;
    
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

const ManageUsers = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
        <ScrollView style={{ flex: 1, marginHorizontal: 0 }} contentContainerStyle={{ padding: 0 }}>
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Image 
              source={require("../assets/home.png")} 
              style={{
                paddingHorizontal: 30,
                width: 80,
                height: 80,
                resizeMode: "contain",
                }}>
            </Image>
          </View>

          <View style={{flex: 1, marginHorizontal: 12, marginVertical: 22}}>
            <Text style={{
              fontSize: 25,
              fontWeight: 700,
              color: COLORS.black
            }}>Welcome</Text>
          </View>

          <Text style={{
              fontSize: 25,
              fontWeight: 700,
              color: COLORS.black
            }}>SHUI JIAO ZZZ</Text>

        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    button:{
        paddingBottom: 16,
        paddingVertical:10,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
  })
export default ManageUsers
