import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
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

//CODES FOR THE MAIN PAGE
const Welcome = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
            marginVertical: 6
          }}>
            <CheckBox 
            style={{marginRight: 8}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}>
            </CheckBox>

            <Text>Remember Me</Text>
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

          <Button
            title="Login"
            onPress={() => navigation.navigate("Dashboard")}
            color="black"
            filled
            style={{
              marginTop: 10,
              marginBottom: 4,
            }}>
          </Button>

          <Button
            title="I am an admin"
            onPress={() => navigation.navigate("AdminLogin")}
            color="black"
            filled
            style={{
              marginTop: 10,
              marginBottom: 4,
            }}>
          </Button>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}>
            </View>
            <Text style={{fontSize: 14}}>Or log in with</Text>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
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
                borderColor: COLORS.grey,
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
                  borderColor: COLORS.grey,
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
                borderColor: COLORS.grey,
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
          
          <View style={{
            flexDirection: "row",
            justifyContent: "center"
          }}>
            <Pressable
              onPress={() => navigation.navigate("AdminLogin")}>
                <Text style={{
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  color: COLORS.black,
                  marginLeft: 6
                }}>I am an admin</Text>
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