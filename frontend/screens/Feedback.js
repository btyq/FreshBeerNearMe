import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { AirbnbRating } from 'react-native-ratings';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.black : COLORS.primary;
  const fontSize = props.selected ? 16 : 15;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize, ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const Header = () => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.logo}>FreshBeer</Text>
      <View style={styles.iconsContainer}>
        <Octicons name="bookmark" size={24} color={COLORS.black} style={styles.icon} />
        <Ionicons name="notifications-outline" size={24} color={COLORS.black} style={styles.icon} />
      </View>
    </View>
  );
};

const Feedback = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleButtonPress = (title) => {
    setSelectedButton(title);
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log('Issue Description:', issueDescription);
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={[COLORS.white, COLORS.yellow]}>
        <Header />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                title="Report an Issue"
                color={COLORS.orange}
                filled={selectedButton === 'Report an Issue'}
                selected={selectedButton === 'Report an Issue'}
                style={styles.mediumButton}
                onPress={() => handleButtonPress('Report an Issue')}
              />
              <Button
                title="Submit feedback"
                color={COLORS.orange}
                filled={selectedButton === 'Submit feedback'}
                selected={selectedButton === 'Submit feedback'}
                style={styles.largeButton}
                onPress={() => handleButtonPress('Submit feedback')}
              />
            </View>

            <Text style={styles.descriptionLabel}>Please describe the issue:</Text>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Type here..."
              value={issueDescription}
              onChangeText={setIssueDescription}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.foam,
  },
  gradient: {
    flex: 1,
  },
  topBar: {
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
  },
  logo: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mediumButton: {
    width: '48%',
    height: 48,
    borderRadius: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  largeButton: {
    width: '50%',
    height: 48,
    borderRadius: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    paddingVertical: 10,
    borderColor: COLORS.black,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
  },
  textInput: {
    height: 300, // Adjust the height value as needed
    fontSize: 20, // Adjust the font size value as needed
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 10,
    textAlignVertical: 'top', // Align text to start at the top
  },
  submitButton: {
    backgroundColor: COLORS.orange,
    borderRadius: 30,
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2, // Add border width
    borderColor: COLORS.black, // Add border color
  },  
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});

export default Feedback;
