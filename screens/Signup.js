import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { LinearGradient } from 'expo-linear-gradient';

// Define your custom colors
const COLORS = {
  primary: '#6D4C41', // Dark Brown color (resembles dark craft beer)
  secondary: '#DAA520', // Golden color (resembles light craft beer)
  white: '#FFFFFF',
  black: '#000000',
};

// Button component
const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{...styles.button, ...{backgroundColor: bgColor}, ...props.style}}
      onPress={props.onPress}>
      <Text style={{fontSize: 16, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

// Signup component
const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.secondary, COLORS.primary]}>
    <ScrollView style={{flex: 1, marginHorizontal: 0}} contentContainerStyle={{ padding: 0 }}>
      <View style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginVertical: 22}}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 12,
            color: COLORS.black,
            textAlign: 'center',
          }}>Create Account</Text>

          <Text style={{
            fontSize: 16,
            color: COLORS.black,
            textAlign: 'center',
          }}>Welcome to Fresh Beer Near Me!</Text>
        </View>

        <View style={{marginBottom: 12}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 8,
            color: COLORS.black,
          }}>Username</Text>

          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
          }}>
            <TextInput
              placeholder='Enter your username'
              placeholderTextColor={COLORS.black}
              keyboardType="text"
              style={{
                width: "100%",
                color: COLORS.black,
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 12}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 8,
            color: COLORS.black,
          }}>Mobile Number</Text>

          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22,
          }}>
            <Text style={{
              fontSize: 14,
              width: "15%",
              borderRightWidth: 1,
              borderLeftColor: COLORS.black,
              marginVertical: 8,
              alignItems: 'center',
              color: COLORS.black,
            }}>+65</Text>

            <TextInput
              placeholder='Enter your phone number'
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={{
                width: "80%",
                color: COLORS.black,
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 12}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 8,
            color: COLORS.black,
          }}>Password</Text>

          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            flexDirection: 'row',
          }}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                flex: 1,
                color: COLORS.black,
              }}
            />

            <TouchableOpacity 
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}>
              <Ionicons
                name={isPasswordShown ? "eye" : "eye-off"}
                size={24}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          marginVertical: 6,
          alignItems: 'center',
        }}>
          <CheckBox 
            style={{marginRight: 8}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.black : undefined}
          />

          <Text style={{color: COLORS.black}}>I agree to the above terms and conditions</Text>
        </View> 

        <Button
          title="Sign Up"
          filled
          style={{
            marginTop: 15,
            marginBottom: 5,
            elevation: 2, // For Android shadow effect
            shadowColor: COLORS.black, // For iOS shadow effect
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            borderColor: COLORS.black, // Add black border
            borderWidth: 1, // Set border width to 1
          }}
          onPress={() => {
            console.log('Sign Up button pressed');
          }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
          <View style={{
            flex: 1,
            height: 1,
            backgroundColor: COLORS.black,
            marginHorizontal: 10
          }}>
          </View>
          <Text style={{fontSize: 14, color: COLORS.black}}>Or sign up with</Text>
          <View style={{
            flex: 1,
            height: 1,
            backgroundColor: COLORS.black,
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
              borderColor: COLORS.black,
              marginRight: 4,
              borderRadius: 10
            }}>
              <Image 
                source={require("../assets/facebook.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8
                }}
                resizeMode='contain'
              />
              <Text style={{color: COLORS.black}}>Facebook</Text>
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
                borderRadius: 10
            }}>
              <Image 
                source={require("../assets/google.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8
                }}
                resizeMode='contain'
              />
              <Text style={{color: COLORS.black}}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => console.log("black")}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10
              }}>
              <Image 
                source={require("../assets/email.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode='contain'
              />
              <Text style={{color: COLORS.black}}>Email</Text>
            </TouchableOpacity>
        </View>
        
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 22
        }}>
          <Text style={{fontSize: 16, color: COLORS.primary}}>Already have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate("Login")}>
              <Text style={{
                fontSize: 16,
                textDecorationLine: 'underline',
                color: COLORS.primary,
                marginLeft: 6
              }}>Login</Text>
          </Pressable>
        </View>
      </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  }
})

export default Signup;
