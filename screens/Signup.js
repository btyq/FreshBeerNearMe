import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable, TextInput, ScrollView, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import Button from "../components/Button";

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  //variable for password comparison
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  //check password fields if it match
  const checkPassword = () => {
    if (password1 === password2) 
    {
      if (isChecked)
      {
        Alert.alert("Account signup success message");
      }
      else
      {
        Alert.alert("Age Restriction! You must be over 18 years old to sign up.");
      }
    }
    else
    {
      Alert.alert("Passwords do not match!");
    }
  }
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>  
      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, marginHorizontal: 22}}>
            <View style={{marginVertical: 22}}>
              <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 12,
                color: COLORS.black
              }}>Create Account</Text>

              <Text style={{
                fontSize: 16,
                color: COLORS.black
              }}>Welcome to Fresh Beer Near Me!</Text>
            </View>

            <View style={{marginBottom: 12}}>
              <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
              }}>Username</Text>

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
                  placeholder='Enter your username'
                  placeholderTextColor={COLORS.black}
                  keyboardType="text"
                  style={{
                    width: "100%"
                  }}>
                </TextInput>
              </View>
            </View>
            
            <View style={{marginBottom: 12}}>
              <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
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
                paddingLeft: 22
              }}>
                <Text style={{
                  fontSize: 14,
                  //fontWeight: 400,
                  width: "15%",
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  marginVertical: 8,
                  alignItems: 'center'
              }}>+65</Text>

                <TextInput
                  placeholder='Enter your phone number'
                  placeholderTextColor={COLORS.black}
                  keyboardType='numeric'
                  style={{
                    width: "80%",
                  }}>
                </TextInput>
              </View>
            </View>

            <View style={{marginBottom: 12}}>
              <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
              }}>Password</Text>

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
                  value = {password1}
                  onChangeText = {setPassword1}
                  placeholder='Enter your password'
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

            <View style={{marginBottom: 12}}>
              <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
              }}>Confirm Password</Text>

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
                  value = {password2}
                  onChangeText = {setPassword2}
                  placeholder='Enter your password'
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
              <Text>Are you over 18 years old?</Text>
            </View> 

            <Button
              title="Sign Up"
              color="black"
              onPress = {checkPassword}
              filled
              style={{
                marginTop: 15,
                marginBottom: 5,
              }}>
            </Button>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10
              }}>
              </View>
              <Text style={{fontSize: 14}}>Or sign up with</Text>
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
                  borderRadius: 10
                }}>
                  <Image 
                    source={require("../assets/facebook.png")}
                    style={{
                      height: 36,
                      width: 36,
                      marginRight: 8
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
                    borderRadius: 10
                }}>
                  <Image 
                    source={require("../assets/google.png")}
                    style={{
                      height: 36,
                      width: 36,
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
                    borderRadius: 10
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
              <Text style={{fontSize: 16, color: COLORS.black}}>Already have an account?</Text>
              <Pressable
                onPress={() => navigation.navigate("Welcome")}>
                  <Text style={{
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    color: COLORS.black,
                    marginLeft: 6
                  }}>Login</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  )
}

export default Signup