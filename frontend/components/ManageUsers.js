import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import CheckBox from "expo-checkbox";
import { SelectList } from 'react-native-dropdown-select-list';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

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

  // for dropdown select list
  const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1',value:'test1'},
    {key:'2',value:'test2'},
    {key:'3',value:'test3'},
    {key:'4',value:'test4'},
  ];

  const BackButton = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
      navigation.navigate('Welcome');
    };
  
    return (
      <TouchableOpacity onPress={handleBackPress}>
        <Feather name="home" size={24} color="black" style={{marginTop: 12}}/>
      </TouchableOpacity>
    );
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
        <ScrollView style={{ flex: 1, marginHorizontal: 0 }} contentContainerStyle={{ padding: 0 }}>
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <BackButton />
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

            <View style={{paddingHorizontal: 20, paddingVertical: 50, flex: 1, zIndex: 1}}>
              <SelectList 
                data={data} 
                setSelected={setSelected} 
                boxStyles={{
                  borderRadius:20, 
                  width: 280, 
                  opacity: 1
                }}
                dropdownStyles={{
                  position: 'absolute', 
                  top: "100%", 
                  width: 280, 
                  opacity: 1
                }}
                defaultOption={{ key:'1', value:'test1' }}   
                search={false}
              />
            </View>
          
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
                zIndex: -5
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
                value={isChecked1}
                onValueChange={setIsChecked1}
                color={isChecked1 ? COLORS.primary : undefined}
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
                value={isChecked2}
                onValueChange={setIsChecked2}
                color={isChecked2 ? COLORS.primary : undefined}
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
                value={isChecked3}
                onValueChange={setIsChecked3}
                color={isChecked3 ? COLORS.primary : undefined}
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
                value={isChecked4}
                onValueChange={setIsChecked4}
                color={isChecked4 ? COLORS.primary : undefined}
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
                value={isChecked5}
                onValueChange={setIsChecked5}
                color={isChecked5 ? COLORS.primary : undefined}
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
                value={isChecked6}
                onValueChange={setIsChecked6}
                color={isChecked6 ? COLORS.primary : undefined}
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
              onPress={() => navigation.navigate('ManageUsers')}
              color="black"
              filled
              style={{
                marginTop: 360,
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
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ManageUsers
