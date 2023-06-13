import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import Button from "../components/Button";

const Dashboard = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:COLORS.white}}>
      <Text>
        Dashboard
      </Text>

      <Button
        title="Go back to welcome (temporary)"
        onPress={() => navigation.navigate("Welcome")}
        filled
        style={{
          marginTop: 10,
          marginBottom: 4,
        }}>
      </Button>
    </SafeAreaView>
  )
}

export default Dashboard