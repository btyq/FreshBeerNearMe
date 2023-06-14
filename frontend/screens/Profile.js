import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

// Define your custom colors
const COLORS = {
  primary: '#6D4C41', // Dark Brown color (resembles dark craft beer)
  secondary: '#DAA520', // Golden color (resembles light craft beer)
  foam: '#F0E68C', // Frothy beer foam color
  white: '#FFFFFF',
  black: '#000000',
};

const Button = (props) => {
  const filledBgColor = props.color || COLORS.secondary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.white;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, // Lowered shadow opacity
        shadowRadius: 1, // Lowered shadow radius
        elevation: 2,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 15, color: textColor, fontWeight: 'bold' }}>{props.title}</Text>
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
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.secondary, COLORS.primary]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          paddingTop: 30,
          backgroundColor: COLORS.foam,
          height: 70,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 22, color: COLORS.primary, fontWeight: 'bold' }}>FreshBeer</Text>
        <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.foam }}>My Profile</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={{ ...styles.label, color: COLORS.white }}>Username</Text>
            <TextInput
              style={{ ...styles.input, borderColor: COLORS.foam, color: COLORS.white }}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor={COLORS.white}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={{ ...styles.label, color: COLORS.secondary }}>Email</Text>
            <TextInput
              style={{ ...styles.input, borderColor: COLORS.foam, color: COLORS.white }}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.white}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={{ ...styles.label, color: COLORS.secondary }}>Password</Text>
            <TextInput
              style={{ ...styles.input, borderColor: COLORS.foam, color: COLORS.white }}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.white}
              secureTextEntry
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              value={receiveNotification}
              onValueChange={setReceiveNotification}
              color={COLORS.primary}
            />
            <Text style={{ ...styles.checkboxLabel, color: COLORS.white }}>
              Receive notification for new releases, events & personalized recommendations
            </Text>
          </View>

          <Button
            title="Save Changes"
            onPress={saveChanges}
            style={{ ...styles.saveButton, backgroundColor: COLORS.secondary }}
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
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
});

export default Profile;
