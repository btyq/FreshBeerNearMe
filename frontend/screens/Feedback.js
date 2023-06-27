import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { Header } from 'react-native-elements';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.orange;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.black : COLORS.black;
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
      </View>
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
    borderWidth: 1,
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
    borderWidth: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    paddingVertical: 10,
    borderColor: COLORS.black,
    borderWidth: 1,
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
    borderWidth: 1,
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
    borderWidth: 1, // Add border width
    borderColor: COLORS.black, // Add border color
  },  
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});

export default Feedback;
