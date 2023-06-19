import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import { useCookies } from "../CookieContext";


// CODES TO STYLE BUTTON
const Button = (props) => {
  const filledBgColor = props.color || COLORS.yellow;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{ ...styles.button, ...{ backgroundColor: bgColor }, ...props.style }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 15, ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

// CODES FOR THE MAIN PAGE
const Welcome = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { setCookies } = useCookies();
  const [selected, setSelected] = useState("");
  const data = [{key:'1',value:'User'}, {key:'2',value:'Venue Owner'}, {key:'3',value:'Admin'}];

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000', {
        username: username,
        password: password
      });

      if (response.data.success) {
        const { username, password } = response.data;
        const sessionToken = 'testtoken123';
        setCookies({sessionToken, username});
        console.log("Wow it works");
        navigation.navigate("BottomTabNavigation", { screen: 'Dashboard'});
      } else {
        const { message } = response.data;
        console.log("Login failed:", message);
      }
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
      <SafeAreaView>
        <View style={{flex: 1}}>
          <Image 
            source={require("../assets/beer.png")} 
            style={{
              height: 230, 
              width: 250, 
              alignSelf: 'center'
              }}>
          </Image>
        </View>

        <View style={{
          paddingHorizontal: 20,
          position: "absolute",
          top: 240,
          width: "100%"
        }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 700,
            textAlign: 'center',
            color: COLORS.black
          }}>FRESH BEER NEAR ME</Text>

        <View style={{flex: 1, marginHorizontal: 22}}>

          <View style={{marginBottom: 12}}>
            <View style={{
              width: "100%",
              height: 45,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
              marginTop: 15,
            }}>

              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder='Username'
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: "100%"
                }}>
              </TextInput>
            </View>
          </View>

          <View style={{marginBottom: 12}}>
            <View style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
            }}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isPasswordShown}
                style={{
                  width: "100%"
                }}>
              </TextInput>

              <TouchableOpacity 
                onPress={()=>setIsPasswordShown(!isPasswordShown)}
                style={{
                position: "absolute",
                right: 12,
              }}>
                {isPasswordShown == true ? 
                (<Ionicons name="eye" size={24} color={COLORS.black}></Ionicons>) 
                : (<Ionicons name="eye-off" size={24} color={COLORS.black}></Ionicons>)
                }
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 6
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox 
                style={{ marginRight: 8 }}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? COLORS.primary : undefined}
              />
              <Text>Remember Me</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <SelectList
                data={data}
                value={selected}
                setSelected={setSelected}
                boxStyles={{
                  borderRadius: 20,
                  position: 'absolute',
                  right: 8,
                  backgroundColor: "#ffe6b3", // Add background color here
                  opacity: 1, // Set opacity to 1
                }}
                dropdownStyles={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: "#ffe6b3", // Add background color here
                  opacity: 1, // Set opacity to 1
                }}
                defaultOption={{ key: '1', value: 'User' }}
                search={false}
              />
            </View>
          </View>
          <View style={{
            flexDirection: "row",
            marginVertical: 6
          }}>
            <Pressable
              onPress={() => navigation.navigate("Signup")}>
                <Text style={{
                  color: COLORS.black,
                  marginLeft: 4
                }}>Forgot your password?</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', zIndex: -5 }}>
            <Button
              title="Login"
              onPress={handleLogin}
              color="black"
              filled
              style={{
                marginTop: 10,
                paddingHorizontal: 15,
                marginBottom: 4,
                marginRight: 4, // Add marginRight to create spacing between buttons
                zIndex: -5,
              }}>
            </Button>

            <Button
              title="I am an admin"
              onPress={() => navigation.navigate("AdminDashboard")}
              color="black"
              filled
              style={{
                marginTop: 10,
                marginBottom: 4,
                zIndex: -5,
              }}>
            </Button>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.black,
              marginHorizontal: 10
            }}>
            </View>
            <Text style={{fontSize: 14}}>Or log in with</Text>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.black,
              marginHorizontal: 10,
              zIndex: -5
            }}>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <TouchableOpacity 
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.black,
                marginRight: 4,
                borderRadius: 10,
                paddingHorizontal: 15, // Add horizontal padding to create space
              }}>
                <Image 
                  source={require("../assets/facebook.png")}
                  style={{
                    height: 26,
                    width: 26,
                    marginRight: 4,
                  }}
                  resizeMode='contain'>
                  </Image>
                  <Text>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => console.log("Pressed")}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: 52,
                  borderWidth: 1,
                  borderColor: COLORS.black,
                  marginRight: 4,
                  borderRadius: 10,
                  paddingHorizontal: 10, // Add horizontal padding to create space
              }}>
                <Image 
                  source={require("../assets/google.png")}
                  style={{
                    height: 26,
                    width: 26,
                    marginRight: 8
                  }}
                  resizeMode='contain'>
                  </Image>
                  <Text>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.black,
                marginRight: 4,
                borderRadius: 10,
                paddingHorizontal: 10, // Add horizontal padding to create space
              }}>
                <Image 
                  source={require("../assets/email.png")}
                  style={{
                    height: 36,
                    width: 36,
                    marginRight: 8,
                  }}
                  resizeMode='contain'>
                  </Image>
                  <Text>Email</Text>
              </TouchableOpacity>
          </View>
          
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22
          }}>
            <Text style={{fontSize: 16, color: COLORS.black}}>Don't have an account?</Text>
            <Pressable
              onPress={() => navigation.navigate("Signup")}>
                <Text style={{
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  color: COLORS.black,
                  marginLeft: 6
                }}>Register</Text>
            </Pressable>
          </View>
        </View>
        </View>
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
export default Welcome