import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, TextInput, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import COLORS from "../constants/colors";

//Define your custom colors
/*const COLORS = {
  primary: '#6D4C41', // Dark Brown color (resembles dark craft beer)
  secondary: '#DAA520', // Golden color (resembles light craft beer)
  white: '#FFFFFF',
  black: '#000000',
};*/

// Button component
const Button = (props) => {
  const filledBgColor = props.color || COLORS.black;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{ ...styles.button, ...{ backgroundColor: bgColor }, ...props.style }}
      onPress={props.onPress}>
      <Text style={{ fontSize: 16, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

// Signup component
const Signup = ({ navigation }) => {
  const ageRestriction = 18;
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSignUp = () => {
    if (!username) {
      // Username is missing
      Alert.alert("Missing Username", "Please enter your username.");
    } else if (!mobileNumber) {
      // Mobile number is missing
      Alert.alert("Missing Mobile Number", "Please enter your mobile number.");
    } else if (isChecked) {
      if (password1 !== password2) {
        // Passwords do not match
        Alert.alert("Password Mismatch", "Please make sure your passwords match.");
      } else {
        // Passwords match, send signup request
        axios.post('http://10.0.2.2:3000/signup', {
          username: username,
          password: password1,
          email: email,
          mobileNumber: mobileNumber
        })
          .then((response) => {
            if (response.data.success) {
              // Handle success response
              Alert.alert("Account Signup Success", "Your account has been successfully created!");
              console.log("Account signup success");
              navigation.navigate('Welcome');
            } else {
              // Display specific error message based on response
              if (response.data.message === 'Username already exists') {
                Alert.alert("Username is Taken", "Please choose a different username.");
              } else if (response.data.message === 'Email already exists') {
                Alert.alert("Email is Taken", "Please use a different email address.");
              } else if (response.data.message === 'Mobile number already exists') {
                Alert.alert("Mobile Number is Taken", "Please use a different mobile number.");
              } else {
                Alert.alert("Signup Error", "An error occurred during signup.");
              }
            }
          })
          .catch((error) => {
            // Handle error response
            console.error(error);
            Alert.alert("Signup Error", "An error occurred during signup.");
          });
      }
    } else {
      // Age restriction not met
      Alert.alert("Age Restriction", `You must be over ${ageRestriction} years old to sign up.`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
        <ScrollView style={{ flex: 1, marginHorizontal: 0 }} contentContainerStyle={{ padding: 0 }}>
          <View style={{ flex: 1, marginHorizontal: 22 }}>
            <View style={{ marginVertical: 22 }}>
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

            <View style={{ marginBottom: 12 }}>
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
                  keyboardType="default"
                  style={{
                    width: "100%",
                    color: COLORS.black,
                  }}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 8,
                color: COLORS.black,
              }}>Email</Text>

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
                  placeholder='Enter your email address'
                  placeholderTextColor={COLORS.black}
                  keyboardType="text"
                  style={{
                    width: "100%",
                    color: COLORS.black,
                  }}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
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
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
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
                  value={password1}
                  onChangeText={setPassword1}
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

            <View style={{ marginBottom: 12 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 8,
                color: COLORS.black,
              }}>Confirm Password</Text>

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
                  placeholder='Re-enter your password'
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={!isPasswordShown}
                  style={{
                    flex: 1,
                    color: COLORS.black,
                  }}
                  value={password2}
                  onChangeText={setPassword2}
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
                style={{ marginRight: 8 }}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? COLORS.black : undefined}
              />

              <Text style={{ color: COLORS.black }}>I am above 18</Text>
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
              onPress={handleSignUp}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.black,
                marginHorizontal: 10
              }}>
              </View>
              <Text style={{ fontSize: 14, color: COLORS.black }}>Or sign up with</Text>
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
                  borderRadius: 10,
                }}>
                <Image
                  source={require("../assets/facebook.png")}
                  style={{
                    height: 26,
                    width: 26,
                    marginRight: 4
                  }}
                  resizeMode='contain'
                />
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
                  borderRadius: 10
                }}>
                <Image
                  source={require("../assets/google.png")}
                  style={{
                    height: 26,
                    width: 26,
                    marginRight: 8
                  }}
                  resizeMode='contain'
                />
                <Text>Google</Text>
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
                <Text>Email</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22
            }}>
              <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
              <Pressable
                onPress={() => navigation.navigate("Login")}>
                <Text style={{
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  color: COLORS.black,
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
    paddingBottom: 16,
    paddingVertical:10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Signup;
