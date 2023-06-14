import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from 'react-native-dropdown-picker';



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
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
      <SafeAreaView>
        <View style={{flex: 1}}>
          <Image 
            source={require("../assets/home.png")} 
            style={{
              paddingHorizontal: 60,
              width: 80,
              height: 80,
              resizeMode: "contain",
              }}>
          </Image>
        </View>

        <View style={{
          paddingHorizontal: 20,
          position: "absolute",
          top: 130,
          width: "50%"
        }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 700,
            color: COLORS.black
          }}>Welcome</Text>
        </View>

        <DropDownPicker
          items={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
          defaultValue={'option1'}
          containerStyle={{ height: 10, marginTop: 150 }}
          style={{ 
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 22,
            padding: 10,
            height: 10 }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          itemStyle={{ justifyContent: 'flex-start' }}
          labelStyle={{ fontSize: 16, color: 'black' }}
          onChangeItem={(item) => console.log(item.value)}>
        </DropDownPicker>


      </SafeAreaView>
    </LinearGradient>
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
