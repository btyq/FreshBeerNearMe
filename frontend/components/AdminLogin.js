import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from "expo-checkbox";


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
  const [isChecked, setIsChecked] = useState(false);

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
          <View style={{
            position: "absolute",
            width: "50%"
          }}>
            <Text style={{
              fontSize: 25,
              fontWeight: 700,
              color: COLORS.black
            }}>Welcome</Text>
          </View>

          <View style={{
            flexDirection: "row",
            position: "absolute",
            width: "100%",
            marginHorizontal: 250,
            marginVertical: 6
          }}>
              <Pressable
                onPress={() => navigation.navigate("Welcome")}>
                  <Text style={{
                    color: COLORS.black,
                    marginLeft: 4
                  }}>Logout</Text>
              </Pressable>
          </View>

          <DropDownPicker
            items={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ]}
            defaultValue={'option1'}
            containerStyle={{ height: 10, marginTop: 50 }}
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
            dropDownStyle={{ backgroundColor: COLORS.white }}
            itemStyle={{ justifyContent: 'flex-start' }}
            labelStyle={{ fontSize: 16, color: 'black' }}
            onChangeItem={(item) => console.log(item.value)}>
          </DropDownPicker>

          <View style={{
            paddingHorizontal: 55,
            position: "absolute",
            top: 120,
            width: "100%"
          }}>
            <Text style={{
              flexDirection: "row",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 500,
              color: COLORS.black,
              textDecorationLine: 'underline',
            }}>Bugs//Problems Reported (5)</Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 6,
            paddingHorizontal: 45,
            position: "absolute",
            justifyContent: "center",
            top: 150,
            width: "100%"
          }}>
            <CheckBox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text>Bug Report 2</Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 6,
            paddingHorizontal: 45,
            position: "absolute",
            justifyContent: "center",
            top: 180,
            width: "100%"
          }}>
            <CheckBox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text>Bug Report 5</Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 6,
            paddingHorizontal: 45,
            position: "absolute",
            justifyContent: "center",
            top: 210,
            width: "100%"
          }}>
            <CheckBox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text>Bug Report 4</Text>
          </View>

          <View style={{
              flexDirection: 'row', 
              alignItems: 'center', 
              marginVertical: 6,
              paddingHorizontal: 45,
              position: "absolute",
              justifyContent: "center",
              top: 250,
              width: "100%"
            }}>
              <Pressable
                onPress={() => console.log("Pressed")}>
                  <Text style={{
                    fontSize: 16,
                    color: COLORS.black,
                    marginLeft: 6
                  }}>View all</Text>
              </Pressable>
          </View>

          <View style={{
            paddingHorizontal: 85,
            position: "absolute",
            justifyContent: "center",
            top: 290,
            width: "100%"
          }}>
            <Text style={{
              flexDirection: "row",
              fontSize: 16,
              fontWeight: 500,
              color: COLORS.black,
              textDecorationLine: 'underline',
            }}>Feedback received (2)</Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 6,
            paddingHorizontal: 45,
            position: "absolute",
            justifyContent: "center",
            top: 320,
            width: "100%"
          }}>
            <CheckBox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text>Feedback 1</Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 6,
            paddingHorizontal: 45,
            position: "absolute",
            justifyContent: "center",
            top: 350,
            width: "100%"
          }}>
            <CheckBox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text>Feedback 2</Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginVertical: 6,
            paddingHorizontal: 45,
            position: "absolute",
            justifyContent: "center",
            top: 380,
            width: "100%"
          }}>
            <CheckBox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text>Feedback 3</Text>
          </View>

          <View style={{
              flexDirection: 'row', 
              alignItems: 'center', 
              marginVertical: 6,
              paddingHorizontal: 45,
              position: "absolute",
              justifyContent: "center",
              top: 420,
              width: "100%"
            }}>
              <Pressable
                onPress={() => console.log("Pressed")}>
                  <Text style={{
                    fontSize: 16,
                    color: COLORS.black,
                    marginLeft: 6
                  }}>View all feedback</Text>
              </Pressable>
          </View>
          
          <Button
              title="Manage users"
              onPress={() => console.log("Pressed")}
              color="black"
              filled
              style={{
                marginTop: 420,
                marginBottom: 4,
              }}>
          </Button>

          <Button
              title="Performance Report"
              onPress={() => console.log("Pressed")}
              color="black"
              filled
              style={{
                marginTop: 15,
                marginBottom: 4,
              }}>
          </Button>

          <Button
              title="Manage Promotion/Events"
              onPress={() => console.log("Pressed")}
              color="black"
              filled
              style={{
                marginTop: 15,
                marginBottom: 4,
              }}>
          </Button>
          </View>
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
export default AdminLogin
