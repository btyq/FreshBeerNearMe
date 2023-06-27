import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Octicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import COLORS from '../constants/colors';
import { useCookies} from "../CookieContext";
import axios from "axios"; 
import { Header } from 'react-native-elements';
//import { useNavigation } from '@react-navigation/native';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.black : COLORS.white;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style}}
      onPress={props.onPress}>
      <Text style={{ fontSize: 15, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

// custom alert
const CustomAlert = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', backgroundColor: COLORS.white, borderRadius: 40, padding: 30,}}>
          <Ionicons name="md-beer" size={34} color={COLORS.foam} style={{alignSelf: 'center'}} />
          <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20 }}>Success</Text>
          <Text style={{ fontSize: 16, marginBottom: 20, alignSelf: 'center' }}>Profile updated!</Text>
          <TouchableOpacity style={{ backgroundColor: COLORS.foam, padding: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 22 }} onPress={onClose}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16 }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Profile = ( {navigation} ) => {
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [receiveNotification, setReceiveNotification] = useState(false);
  const { cookies } = useCookies();
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const sessionToken = cookies.sessionToken;
    const userID = cookies.userID;
    console.log(sessionToken);
    console.log(userID);

    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://10.0.2.2:3000/getUserData', { userID });

        const userData = response.data;
        const { username, email, mobileNumber, password, receiveNotification } = userData;

        setUserID(userID);
        setUsername(username);
        setEmail(email);
        setMobileNumber(mobileNumber);
        setPassword(password);
        setReceiveNotification(receiveNotification)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  
  //Function for save changes button
  const saveChanges = async () => {
    try {
      const newData = {
        userID: userID,
        username: username,
        password: password,
        email: email,
        mobileNumber: mobileNumber
      };
      // Make a POST request to the /updateProfile endpoint with the new data
      const response = await axios.post('http://10.0.2.2:3000/editProfile', newData);
  
      // Handle the response
      if (response.data.success) {
        console.log('Profile updated successfully');
        setIsDialogVisible(true);
        
        // Update the cookies.username value
        if (response.data.success) {
          const updatedUsername = response.data.username;
          // Update the value in the cookies
          const updatedCookies = { ...cookies, username: updatedUsername };
          // Update the context with the new cookies
          //setCookies(updatedCookies);
        }
      } else {
        console.log('Failed to update profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  return (
<View style={{ height: 1500, backgroundColor: COLORS.white }}>
<Header
  placement="left"
  backgroundColor={COLORS.primary}
  containerStyle={{
    height: 100,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  }}
  centerComponent={{
    text: 'FreshBeer',
    style: {
      fontSize: 20,
      color: COLORS.black,
      fontWeight: 'bold',
      flexDirection: 'row',
    },
  }}
  rightComponent={
    <View style={{ flexDirection: 'row', marginTop: 5 }}>
      <TouchableOpacity>
        <Octicons name="bookmark" size={24} color={COLORS.black} style={{ marginRight: 5 }} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  }
/>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.black}}>My Profile</Text>
          </View>

          <View style={{flex: 1, marginHorizontal: 32, marginBottom: 12}}>

            <View style={{marginBottom: 8}}>
              <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  marginTop: 10
                }}>Username</Text>

              <View style={{
                width: "100%",
                height: 45,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginTop: 10,
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

            <View style={{marginBottom: 8}}>
              <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  marginTop: 10
                }}>Email</Text>

              <View style={{
                width: "100%",
                height: 45,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginTop: 10,
              }}>

                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder='Email'
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  style={{
                    width: "100%"
                  }}>
                </TextInput>
              </View>
            </View>
            
            <View style={{marginBottom: 8}}>
              <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.black,
                  marginTop: 10
                }}>Mobile Number</Text>

              <View style={{
                width: "100%",
                height: 45,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginTop: 10,
              }}>

                <TextInput
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  placeholder='Mobile Number'
                  placeholderTextColor={COLORS.black}
                  keyboardType="default"
                  style={{
                    width: "100%"
                  }}>
                </TextInput>
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
                  placeholder='Password'
                  value={password}
                  onChangeText={setPassword}
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

            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                value={receiveNotification}
                onValueChange={setReceiveNotification}
                tintColors = {COLORS.black}
              />
              <Text style={styles.checkboxLabel}>
                Receive notifications for new releases, events & personalized recommendations
              </Text>
            </View>

          <Button
            title="Save Changes"
            onPress={saveChanges}
            color={COLORS.orange}
            filled
            style={{
              marginTop: 10,
              marginBottom: 4,
            }}>
          </Button>
          <CustomAlert
              visible={isDialogVisible}
              onClose={handleCloseDialog}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    marginRight: 5, // Adjusted value for closer spacing
  },
  checkboxLabel: {
    color: COLORS.black,
    marginHorizontal: 12,
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: COLORS.black,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
  },
});

export default Profile;
