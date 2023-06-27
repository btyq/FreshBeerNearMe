import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { AirbnbRating } from 'react-native-ratings';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.black : COLORS.primary;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 12, ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const PopOut = (props) => {
  return (
    <Modal visible={props.visible} transparent={true} animationType="fade">
      <View style={styles.popOutContainer}>
        <View style={styles.popOutContent}>
          <Text style={styles.popOutText}>{props.text}</Text>
          <TouchableOpacity style={styles.popOutButton} onPress={props.onPress}>
            <Text style={styles.popOutButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Social = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('Bitter, but it\'s decent');
  const [comments, setComments] = useState([]);
  const [popOutVisible, setPopOutVisible] = useState(false);

  const handleComment = () => {
    setComments([...comments, comment]);
    setComment('');
  };


  const showPopOut = () => {
    setPopOutVisible(true);
  };

  const closePopOut = () => {
    setPopOutVisible(false);
  };

  const navigateToSocial = () => {
    // Navigate to the Forums.js page
    navigation.navigate('Social');
  }; 

  const navigateToForums = () => {
    // Navigate to the Forums.js page
    navigation.navigate('Forums');
  };

  const navigateToRateNReview = () => {
    // Navigate to the RateNReview.js page
    navigation.navigate('RateNReview');
  };

  const navigateToReferAFriend = () => {
    // Navigate to the RateNReview.js page
    navigation.navigate('ReferAFriend');
  };

  const navigateToRecommendation = () => {
    // Navigate to the RateNReview.js page
    navigation.navigate('Recommendation');
  };

  return (
    <ScrollView>
      <LinearGradient style={{ height: 1500 }} colors={[COLORS.white, COLORS.yellow]}>
        <Header
          placement="left"
          backgroundColor={COLORS.foam}
          centerComponent={{ text: 'FreshBeer', style: { fontSize: 20, color: COLORS.black, fontWeight: 'bold', flexDirection: 'row' } }}
          rightComponent={
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity>
                <Octicons name="bookmark" size={24} color={COLORS.black} style={{ marginRight: 5 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.grid}>
            <Button
              title="My Feed"
              color={COLORS.white}
              filled
              style={styles.longButton}
              onPress={navigateToSocial}
            />
           <Button
              title="Forums"
              color={COLORS.white}
              filled
              style={styles.longButton}
              onPress={navigateToForums}
            />
            <Button
              title="Rate & Review"
              color={COLORS.foam}
              filled
              style={styles.longButton}
              onPress={navigateToRateNReview}
            />
            <Button
              title="Refer a friend"
              color={COLORS.white}
              filled
              style={styles.longButton}
              onPress={navigateToReferAFriend}
            />
            <Button
              title="Recommendation"
              color={COLORS.white}
              filled
              style={styles.mediumButton}
              onPress={navigateToRecommendation}
            />
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
            />
            <Button
              title="Search for user"
              color={COLORS.foam}
              filled
              style={styles.searchButton}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.foam,
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
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  longButton: {
    width: '15%',
    height: 55,
    marginVertical: 0,
    borderRadius: 50,
    marginRight: 0,
  },
  mediumButton: {
    width: '35%',
    height: 40,
    marginVertical: 4,
    borderRadius: 30,
    marginHorizontal: '0%',
  },
  button: {
    paddingVertical: 10,
    borderColor: COLORS.black,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    width: '30%',
    height: 40,
    borderRadius: 30,
  },
  userContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.foam,
    padding: 5,
    marginBottom: 10,
    borderRadius: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  followButton: {
    width: '20%',
    height: 40,
    borderRadius: 30,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -3,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  commentText: {
    marginTop: 10,
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.yellow,
    padding: 5,
    borderRadius: 8,
    height: 30,
  },
  ratingStarContainer: {
    position: 'relative',
    top: -10,
    marginLeft: 'auto',
    marginRight: 10,
  },
  ratingStyle: {
    position: 'relative',
  },
  popOutContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  popOutContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popOutText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  popOutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  popOutButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default Social;
