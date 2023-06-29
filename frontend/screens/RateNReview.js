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

const CloseButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ alignSelf: 'flex-end' }}>
    <Ionicons name="close" size={24} color={COLORS.black} />
  </TouchableOpacity>
);

const BeerPopOut = (props) => {
  const defaultComment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac felis nisl. Vestibulum condimentum libero nec dui ullamcorper, vitae cursus nisi commodo.';

  const [comment, setComment] = useState(defaultComment);

  const handleCommentChange = (text) => {
    if (text.length <= 300) {
      setComment(text);
    }
  };

  const handleClose = () => {
    setComment(defaultComment);
    props.onPress();
  };

  return (
    <Modal visible={props.visible} transparent={true} animationType="fade">
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: COLORS.white,
          padding: 20,
          borderRadius: 10,
          width: '90%',
          height: 550, // Adjust the height value as needed
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            {/* Picture */}
            <View style={{
              width: '80%',
              height: '30%',
              backgroundColor: 'gray',
              borderRadius: 10,
            }} />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
            {/* Beer Name */}
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>{props.beerName}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
            {/* Address */}
            <Text style={{
              fontSize: 16,
            }}>{props.address}</Text>
            {/* Write a Review button */}
            <TouchableOpacity style={{
              backgroundColor: COLORS.grey,
              padding: 10,
              borderRadius: 20,
            }} onPress={props.onPress}>
              <Text style={{
                color: COLORS.black,
                fontSize: 14,
                fontWeight: 'bold',
              }}>Write a Review</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.numbersContainer, { paddingTop: 5 }]}>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>5</Text>
              <View style={[styles.bar, { width: '90%', height: 10, backgroundColor: 'yellow', marginTop: -14, marginLeft: 25 }]} />
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>4</Text>
              <View style={[styles.bar, { width: '75%', height: 10, backgroundColor: 'yellow', marginTop: -14, marginLeft: 25 }]} />
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>3</Text>
              <View style={[styles.bar, { width: '50%', height: 10, backgroundColor: 'yellow', marginTop: -14, marginLeft: 25 }]} />
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>2</Text>
              <View style={[styles.bar, { width: '25%', height: 10, backgroundColor: 'yellow', marginTop: -14, marginLeft: 25 }]} />
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>1</Text>
              <View style={[styles.bar, { width: '10%', height: 10, backgroundColor: 'yellow', marginTop: -14, marginLeft: 25 }]} />
            </View>
          </View>

          <View
            style={{
              borderBottomColor: COLORS.grey,
              borderBottomWidth: 2,
              marginTop: 10,
            }}
          />
          <View style={styles.postedByContainer}>
            <Text style={{ fontSize: 20, marginTop: 20 }}>Posted by User</Text>
          </View>
          <ScrollView style={{ maxHeight: 200 }}>
            <TextInput
              style={{ fontSize: 15, marginTop: 10, height: 200, textAlignVertical: 'top' }}
              multiline
              placeholder="Comment Section"
              value={comment}
              onChangeText={handleCommentChange}
              editable={false}
            />
          </ScrollView>
          <Button
            title="Close"
            onPress={props.onPress}
            color={COLORS.foam}
            filled
            style={{
              backgroundColor: COLORS.foam,
              padding: 10,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 10,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const VenuePopOut = (props) => {
  const handleClose = () => {
    props.onPress();
  };

  return (
    <Modal visible={props.visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.popOutContainer}>
          <CloseButton onPress={handleClose} />
          <View style={styles.pictureContainer}>
            <View style={styles.picture} />
          </View>
          <Text style={styles.popOutTitle}>{props.venueName}</Text>
          <Text style={styles.popOutText}>{props.address}</Text>
          <Button
            title="Write a Review"
            onPress={props.onPress}
            color={COLORS.black}
            filled
            style={styles.writeReviewButton}
          />
          <View style={styles.border} />
          <View style={styles.ratingContainer}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <View key={rating} style={styles.numberContainer}>
                <Text style={[styles.number, { fontSize: 20 }]}>{rating}</Text>
                <View style={[styles.bar, { width: `${rating * 20}%` }]} />
              </View>
            ))}
          </View>
          <View style={styles.border} />
          <View style={styles.postedUserContainer}>
            <Text style={styles.postedUserText}>Posted by User</Text>
          </View>
          <View style={styles.commentSection}>
            <TextInput
              style={styles.commentInput}
              multiline
              placeholder="Comment Section"
              value=""
              editable={false}
            />
            <Button
              title="Close"
              onPress={handleClose}
              color={COLORS.foam}
              filled
              style={styles.closeButton}
            />
          </View>
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
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.itemButton} onPress={handlePopupOpen}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{beerName}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name="star"
              size={16}
              color={star <= rating ? COLORS.foam : COLORS.grey}
            />
          ))}
        </View>
      </TouchableOpacity>
      <BeerPopOut visible={popupVisible} beerName={beerName} address="123 Main St" onPress={handlePopupClose} />
    </View>
  );
};

const VenueItem = ({
  venueName,
  venueRating,
  venueImage,
  venueAddress,
  venueOperatingHours,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.itemButton} onPress={handlePopupOpen}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{venueName}</Text>
          <Text style={styles.itemText}>{venueAddress}</Text>
          <Text style={styles.itemText}>{venueOperatingHours}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name="star"
              size={16}
              color={star <= venueRating ? COLORS.foam : COLORS.grey}
            />
          ))}
        </View>
      </TouchableOpacity>
      <VenuePopOut visible={popupVisible} venueName={venueName} address={venueAddress} onPress={handlePopupClose} />
    </View>
  );
};

const RateNReview = () => {
  const navigation = useNavigation();
  const [beerData, setBeerData] = useState([]);
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    const fetchBeerData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/beerData');
        const { success, beerData } = response.data;
        if (success) {
          setBeerData(beerData);
        } else {
          console.error('Error retrieving beer data:', response.data.message);
        }
      } catch (error) {
        console.error('Error retrieving beer data:', error);
      }
    };

    const fetchVenueData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/getVenueData');
        const { success, venueData } = response.data;
        if (success) {
          setVenueData(venueData);
        } else {
          console.error('Error retrieving venue data:', response.data.message);
        }
      } catch (error) {
        console.error('Error retrieving venue data:', error);
      }
    };

    fetchBeerData();
    fetchVenueData();
  }, []);

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
    <View style={{ height: 680, backgroundColor: COLORS.white }}>
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
        <View style={styles.buttonContainer}>
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

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
          />
          <Button
            title="Search"
            color={COLORS.grey}
            filled
            style={styles.searchButton}
          />
        </View>

        <View style={styles.container}>
          <ScrollView>
            {beerData.map((beer, index) => (
              <BeerItem
                key={index}
                beerName={beer.beerName}
                rating={beer.rating}
              />
            ))}
            {venueData.map((venue, index) => (
              <VenueItem
                key={index}
                venueName={venue.venueName}
                venueRating={venue.venueRating}
                venueImage={venue.venueImage}
                venueAddress={venue.venueAddress}
                venueOperatingHours={venue.venueOperatingHours}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popOutContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  pictureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  picture: {
    width: '80%',
    height: '30%',
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  popOutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popOutText: {
    fontSize: 16,
    marginBottom: 10,
  },
  writeReviewButton: {
    backgroundColor: COLORS.grey,
    padding: 10,
    borderRadius: 20,
  },
  border: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  numbersContainer: {
    flexDirection: 'column',
  },
  number: {
    marginRight: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'yellow',
    marginTop: -14,
    marginLeft: 20,
  },
  postedUserContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  postedUserText: {
    fontSize: 20,
    marginTop: 20,
  },
  commentSection: {
    marginTop: 10,
  },
  commentInput: {
    fontSize: 15,
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: COLORS.foam,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  itemContainer: {
    marginBottom: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    padding: 1,
    width: '95%',
    alignSelf: 'center',
  },
  itemButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'grey',
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
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  buttonContainer: {
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
});

export default RateNReview;
