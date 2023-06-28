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

const Recommendation = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('Bitter, but it\'s decent');
  const [comments, setComments] = useState([]);
  const [popOutVisible1, setPopOutVisible1] = useState(false);
  const [popOutVisible2, setPopOutVisible2] = useState(false);

  const handleComment = () => {
    setComments([...comments, comment]);
    setComment('');
  };

  const showPopOut1 = () => {
    setPopOutVisible1(true);
  };

  const showPopOut2 = () => {
    setPopOutVisible2(true);
  };

  const closePopOut = () => {
    setPopOutVisible1(false);
    setPopOutVisible2(false);
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
              color={COLORS.white}
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
              color={COLORS.grey}
              filled
              style={styles.mediumButton}
              onPress={navigateToRecommendation}
            />
          </View>
          <View>
            <Text style={{
              marginTop: 50,
              marginLeft: 15,
              fontSize: 15,
              color: COLORS.black,
            }}>Your Friend Recommendation</Text>
            <View style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.grey,
            marginHorizontal: 10,
            marginTop: -6,
            marginLeft: 220,
            width: '45%',
          }} />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              width: '95%',
              height: '3%',
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              marginTop: 20,
              marginLeft: 0,
              alignSelf: 'center',
              ...styles.containerContent,
            }}
            onPress={showPopOut1}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 6,
                ...styles.beerName,
              }}
            >
              Beer Name
            </Text>
            <View
              style={{
                position: 'relative',
                top: -13,
                marginLeft: 'auto',
                marginRight: 0,
                ...styles.starContainer,
              }}
            >
              {/* Add Airbnb star component here */}
              <AirbnbRating
                count={5}
                defaultRating={4}
                showRating={false}
                size={20}
                starContainerStyle={{
                  marginLeft: -8, // Adjust the value to bring the stars closer
                  marginTop: -5,
                  ...styles.ratingStarContainer,
                }}
                starStyle={styles.ratingStyle}
                isDisabled={true} // Make the star rating read-only
              />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={{
              marginTop: 50,
              marginLeft: 20,
              fontSize: 15,
              color: COLORS.black,
            }}>Recommend a Beer</Text>
          </View>
          <View style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.grey,
            marginHorizontal: 10,
            marginTop: -8,
            marginLeft: 160,
            marginBottom: 10,
            width: '60%',
          }} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            borderColor: COLORS.grey,
          }}>
            <TextInput
              placeholder="Search for beer"
              style={{
                height: 40,
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flex: 1,
                marginRight: 10,
              }}
            />
            <Button
              title="Search"
              color={COLORS.grey}
              filled
              style={{
                width: '30%',
                height: 40,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: COLORS.grey,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              width: '95%',
              height: '3%',
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              marginTop: 20,
              marginLeft: 0,
              alignSelf: 'center',
              ...styles.containerContent,
            }}
            onPress={showPopOut2}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 6,
                ...styles.beerName,
              }}
            >
              Beer Name
            </Text>
            <View
              style={{
                position: 'relative',
                top: -13,
                marginLeft: 'auto',
                marginRight: 0,
                ...styles.starContainer,
              }}
            >
              {/* Add Airbnb star component here */}
              <AirbnbRating
                count={5}
                defaultRating={4}
                showRating={false}
                size={20}
                starContainerStyle={{
                  marginLeft: -8, // Adjust the value to bring the stars closer
                  marginTop: -5,
                  ...styles.ratingStarContainer,
                }}
                starStyle={styles.ratingStyle}
                isDisabled={true} // Make the star rating read-only
              />
            </View>
          </TouchableOpacity>
          <Button
            title="Recommend"
            color={COLORS.grey}
            filled
            style={{
              marginLeft: 280,
              width: '30%',
              height: 40,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: COLORS.grey,
            }}
          />
        </SafeAreaView>
      </View>
      <PopOut visible={popOutVisible1} text="Pop-up 1 Content" onPress={closePopOut} />
      <PopOut visible={popOutVisible2} text="Pop-up 2 Content" onPress={closePopOut} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerContent: {
    marginBottom: 20,
  },
  beerName: {
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popOutContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popOutContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  popOutText: {
    fontSize: 16,
    marginBottom: 20,
  },
  popOutButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  popOutButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Recommendation;
