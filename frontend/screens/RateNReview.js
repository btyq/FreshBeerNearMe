import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { AirbnbRating } from 'react-native-ratings';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

// Button component for displaying buttons
const Button = (props) => {
  // Set button colors based on props
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

// ModalContainer component for displaying a modal with text and a close button
const ModalContainer = (props) => {
  return (
    <Modal visible={props.visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{props.text}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={props.onPress}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const BeerItem = ({
	beerName,
	rating,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

	return (
		<View style={styles.subContainer}>
			<TouchableOpacity style={styles.itemContainer} onPress={handlePopupOpen}>
				<View style={styles.leftContainer}>
					<Text style={styles.beerName}>{beerName}</Text>
				</View>
				<View style={styles.rightContainer}>
					<View style={styles.starContainer}>
						{[1, 2, 3, 4, 5].map((star) => (
							<Ionicons
								key={star}
								name="star"
								size={16}
								color={star <= rating ? COLORS.foam : COLORS.grey}
							/>
						))}
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const VenueItem = ({
	venueName,
	venueRating,
}) => {
	const [popupVisible, setPopupVisible] = useState(false);
	const [venueMenu, setVenueMenu] = useState([]);

	const handlePopupOpen = () => {
		setPopupVisible(true);
	};

	const handlePopupClose = () => {
		setPopupVisible(false);
	};

	return (
		<View style={styles.subContainer}>
			<TouchableOpacity style={styles.itemContainer} onPress={handlePopupOpen}>
				<View style={styles.leftContainer}>
					<Text style={styles.venueName}>{venueName}</Text>
				</View>
				<View style={styles.rightContainer}>
					<View style={styles.starContainer}>
						{[1, 2, 3, 4, 5].map((star) => (
							<Ionicons
								key={star}
								name="star"
								size={16}
								color={star <= venueRating ? COLORS.foam : COLORS.grey}
								style={{ marginBottom: 4 }}
							/>
						))}
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const RateNReview = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('Bitter, but it\'s decent');
  const [comments, setComments] = useState([]);
  const [popOutVisible, setPopOutVisible] = useState(false);

  // Handle adding a new comment
  const handleComment = () => {
    setComments([...comments, comment]);
    setComment('');
  };

  // Functions to control the visibility of modals
  const showModal1 = () => {
    setModalVisible1(true);
  };

  const showModal2 = () => {
    setModalVisible2(true);
  };

  const showModal3 = () => {
    setModalVisible3(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const closeModal3 = () => {
    setModalVisible3(false);
  };

  // Navigation functions
  const navigateToSocial = () => {
    navigation.navigate('Social');
  };

  const navigateToForums = () => {
    navigation.navigate('Forums');
  };

  const navigateToRateNReview = () => {
    navigation.navigate('RateNReview');
  };

  const navigateToReferAFriend = () => {
    navigation.navigate('ReferAFriend');
  };

  const navigateToRecommendation = () => {
    navigation.navigate('Recommendation');
  };

  return (
    <ScrollView>
      <View style={{ height: 1500, backgroundColor: COLORS.white }}>
        {/* Header */}
        <Header
          placement="left"
          backgroundColor={COLORS.primary}
          containerStyle={{
            height: 100,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          centerComponent={{
            text: 'Fresh Beer',
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

        {/* SafeAreaView */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* Buttons */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginHorizontal: 10,
          }}>
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
              color={COLORS.grey}
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

          {/* Search */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
          }}>
            <TextInput
              placeholder="Search..."
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
              width: '90%',
              height: '3%',
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
              ...styles.containerContent,
            }}
            onPress={showModal1}
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
              Beer Name 1
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
              <AirbnbRating
                count={5}
                defaultRating={4}
                showRating={false}
                size={20}
                starContainerStyle={{
                  marginLeft: -8,
                  marginTop: -5,
                  ...styles.ratingStarContainer,
                }}
                starStyle={styles.ratingStyle}
                isDisabled={true}
              />
            </View>
          </TouchableOpacity>
          <ModalContainer visible={modalVisible1} text="This is a pop-up for Beer Name 1" onPress={closeModal1} />
          <Button
            title="Write a Review"
            color={COLORS.primary}
            filled
            onPress={() => {
              // Handle button press
            }}
            style={{
              ...styles.rateButton,
              backgroundColor: COLORS.grey,
              borderColor: COLORS.grey,
              borderWidth: 1,
              marginTop: 0,
              marginRight: 20,
            }}
          />
          <View style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.grey,
            marginHorizontal: 10,
            marginTop: 10,
          }} />

          {/* Beer Name 2 */}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              width: '90%',
              height: '3%',
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
              ...styles.containerContent,
            }}
            onPress={showModal2}
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
              Beer Name 2
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
              <AirbnbRating
                count={5}
                defaultRating={4}
                showRating={false}
                size={20}
                starContainerStyle={{
                  marginLeft: -8,
                  marginTop: -5,
                  ...styles.ratingStarContainer,
                }}
                starStyle={styles.ratingStyle}
                isDisabled={true}
              />
            </View>
          </TouchableOpacity>
          <ModalContainer visible={modalVisible2} text="This is a pop-up for Beer Name 2" onPress={closeModal2} />
          <Button
            title="Write a Review"
            color={COLORS.primary}
            filled
            onPress={() => {
              // Handle button press
            }}
            style={{
              ...styles.rateButton,
              backgroundColor: COLORS.grey,
              borderColor: COLORS.grey,
              borderWidth: 1,
              marginTop: 0,
              marginRight: 20,
            }}
          />
          <View style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.grey,
            marginHorizontal: 10,
            marginTop: 10,
          }} />

          {/* Venue Name */}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              width: '90%',
              height: '3%',
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
              ...styles.containerContent,
            }}
            onPress={showModal3}
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
              Venue Name
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
              <AirbnbRating
                count={5}
                defaultRating={4}
                showRating={false}
                size={20}
                starContainerStyle={{
                  marginLeft: -8,
                  marginTop: -5,
                  ...styles.ratingStarContainer,
                }}
                starStyle={styles.ratingStyle}
                isDisabled={true}
              />
            </View>
          </TouchableOpacity>
          <ModalContainer visible={modalVisible3} text="This is a pop-up for Venue Name" onPress={closeModal3} />
          <Button
            title="Write a Review"
            color={COLORS.primary}
            filled
            onPress={() => {
              // Handle button press
            }}
            style={{
              ...styles.rateButton,
              backgroundColor: COLORS.grey,
              borderColor: COLORS.grey,
              borderWidth: 1,
              marginTop: 0,
              marginRight: 20,
            }}
          />

        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  rateButton: {
    marginLeft: 'auto',
    marginRight: 10,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RateNReview;
