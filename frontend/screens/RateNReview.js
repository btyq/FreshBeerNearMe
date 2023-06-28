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
				const response = await axios.get("http://10.0.2.2:3000/getVenueData");
				const { success, venueData } = response.data;
				if (success) {
					setVenueData(venueData);
				} else {
					console.error("Error retrieving venue data:", response.data.message);
				}
			} catch (error) {
				console.error("Error retrieving venue data:", error);
			}
		};

    fetchBeerData();
    fetchVenueData();
  }, []);

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
          {beerData.map((beer, index) => (
            <BeerItem
              key={index}
              beerName={beer.beerName}
              beerPrice={beer.price}
              rating={beer.rating}
              beerDescription={beer.beerDescription}
              beerImage={beer.beerImage}
              ABV={beer.abv}
              IBU={beer.ibu}
              venueAvailability={beer.venueAvailability}
              communityReviews={beer.communityReviews}
            />
          ))}
          {venueData.map((venue) => (
            <VenueItem
              key={venue._id}
              venueID={venue.venueID}
              venueName={venue.venueName}
              venueAddress={venue.venueAddress}
              venueContact={venue.venueContact}
              venueRating={venue.venueRating}
              venueImage={venue.venueImage}
              venueOperatingHours={venue.venueOperatingHours}
            />
          ))}
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
            onPress={showPopOut}
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
          <PopOut visible={popOutVisible} text="This is a pop-up" onPress={closePopOut} />
          <Button
            title="Write a Review"
            color={COLORS.primary}
            filled
            onPress={() => {
              // Handle button press
            }}
            style={{
              ...styles.rateButton,
              backgroundColor: COLORS.grey, // Set the desired background color
              borderColor: COLORS.grey, // Set the desired border color
              borderWidth: 1, // Set the desired border thickness
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
            onPress={showPopOut}
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
          <PopOut visible={popOutVisible} text="This is a pop-up" onPress={closePopOut} />
          <Button
            title="Write a Review"
            color={COLORS.primary}
            filled
            onPress={() => {
              // Handle button press
            }}
            style={{
              ...styles.rateButton,
              backgroundColor: COLORS.grey, // Set the desired background color
              borderColor: COLORS.grey, // Set the desired border color
              borderWidth: 1, // Set the desired border thickness
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
            onPress={showPopOut}
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
          <PopOut visible={popOutVisible} text="This is a pop-up" onPress={closePopOut} />
          <Button
            title="Write a Review"
            color={COLORS.primary}
            filled
            onPress={() => {
              // Handle button press
            }}
            style={{
              ...styles.rateButton,
              backgroundColor: COLORS.grey, // Set the desired background color
              borderColor: COLORS.grey, // Set the desired border color
              borderWidth: 1, // Set the desired border thickness
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
    borderColor: COLORS.grey,
    borderWidth: 1,
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
  userContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 1,
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

export default RateNReview;
