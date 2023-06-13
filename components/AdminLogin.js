import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";



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

const AdminLogin = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:COLORS.white}}>
      <Text>
        AdminLoginSWAG
      </Text>
      <Button
            title="Back to welcome page (for easy navigation)"
            onPress={() => navigation.navigate("Welcome")}
            color="black"
            filled
            style={{
              marginTop: 10,
              marginBottom: 4,
            }}>
          </Button>
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
export default AdminLogin
