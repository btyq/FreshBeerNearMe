import React from 'react';
import { View, Text, Button } from 'react-native';

const TopRated = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Breweries Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')} // Make sure 'Home' screen exists in your navigation stack
      />
    </View>
  );
};

export default TopRated;
