import { View, Text, TouchableOpacity, Image, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";

const BeersVenue = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:COLORS.white}}>
      <Text>
        BeersVenue SWAG
      </Text>

    </SafeAreaView>
  )
}
export default BeersVenue
