import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.yellow;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = COLORS.black;

  return (
    <TouchableOpacity
      style={{ ...styles.button, ...{ backgroundColor: bgColor }, ...props.style }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 15, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [receiveNotification, setReceiveNotification] = useState(false);

  const saveChanges = () => {
    // Implement logic to save changes here
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          paddingTop: 30,
          backgroundColor: '#ffff99',
          height: 70,
        }}
      >
        <Text style={{ fontSize: 20 }}>FreshBeer</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My Profile</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              value={receiveNotification}
              onValueChange={setReceiveNotification}
            />
            <Text style={styles.checkboxLabel}>
              Receive notification for new releases, events & personalized recommendations
            </Text>
          </View>

          <Button
            title="Save Changes"
            onPress={saveChanges}
            style={styles.saveButton}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: '50%', // Adjust the width as desired
    alignSelf: 'center', // Center the button horizontally
  },
});

export default Profile;
