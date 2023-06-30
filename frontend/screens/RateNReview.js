import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons, Entypo, FontAwesome } from '@expo/vector-icons';
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


const BeerItem = ({
  beerName,
  price,
  rating,
  beerDescription,
  beerImage,
  ABV,
  IBU,
  communityReviews,
  venueAvailability,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePopupOpen = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <View style={{
      marginBottom: 10,
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 12,
      borderWidth: 1,
      shadowColor: COLORS.black, // Add shadow color
      shadowOffset: { width: 0, height: 2 }, // Add shadow offset
      shadowOpacity: 0.3, // Add shadow opacity
      shadowRadius: 3, // Add shadow radius
      elevation: 5, // Add elevation for Android
      borderColor: 0,
    }}>
      <TouchableOpacity style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderColor: 0,
      }} onPress={handlePopupOpen}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: COLORS.black,
          }}>{beerName}</Text>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: COLORS.black,
          }}>Price: ${price}</Text>
        </View>
        <View style={{
          flex: 0.3,
          marginRight: 12,
          flexDirection: "row-reverse",
          alignItems: "center",
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
          }}>
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

      <Modal visible={popupVisible} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: COLORS.overlay,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <View style={{
            width: "90%", // Adjust the width of the popup
            height: 500, // Adjust the height of the popup
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 20,
            elevation: 5,
          }}>
            <View style={styles.popup}>
              <ScrollView>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}>{beerName}</Text>
                <Image source={{ uri: beerImage }} style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "contain",
                  marginTop: 10,
                    marginBottom: 10,
                }} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 10,
                    marginBottom: 10,
                  }}>Price: ${price}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 4, marginBottom: 5
                    }}
                  >
                    <Text style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                    marginBottom: 10,
                    }}>Ratings: </Text>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name="star"
                        size={16}
                        color={star <= rating ? COLORS.foam : COLORS.grey}
                        style={{ marginBottom: 4 }}
                      />
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}>Alcohol%: {ABV}</Text>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}>Bitter Units: {IBU}</Text>
                </View>
                <Button
                  title="Write a Review"
                  color={COLORS.grey}
                  filled
                  style={{
                    width: '30%',
                    height: 40,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 'auto',
                  }}
                />
                <View style={{
                  borderBottomColor: COLORS.grey, borderBottomWidth: 2, marginTop: 10,
                  marginBottom: 10,
                }} />
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}>Beer Description</Text>
                <Text>{beerDescription}</Text>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10, marginTop: 10
                }}>
                  Locations
                </Text>
                {venueAvailability &&
                  venueAvailability.map((location, index) => (
                    <Text key={index}>{location}</Text>
                  ))}
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10, marginTop: 10
                }}>
                  Community Reviews
                </Text>
                {communityReviews &&
                  communityReviews.map((review, index) => (
                    <Text key={index}>{review}</Text>
                  ))}
                <Button
                  title="Close"
                  onPress={handlePopupClose}
                  color={COLORS.black}
                  filled
                  style={{
                    backgroundColor: COLORS.grey,
                    padding: 10,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: "50%", // Adjust the marginTop to shift the close button down
                    borderWidth: 1,
                    borderColor: COLORS.grey
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const VenueItem = ({
  venueID,
  venueName,
  venueAddress,
  venueContact,
  venueRating,
  venueImage,
  venueOperatingHours,
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
    <View style={{
      marginBottom: 10,
      backgroundColor: COLORS.white,
      padding: 10,
      borderRadius: 10,
      shadowColor: COLORS.black, // Add shadow color
      shadowOffset: { width: 0, height: 2 }, // Add shadow offset
      shadowOpacity: 0.3, // Add shadow opacity
      shadowRadius: 3, // Add shadow radius
      elevation: 5, // Add elevation for Android
    }}>
      <TouchableOpacity style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }} onPress={handlePopupOpen}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: COLORS.black,
          }}>{venueName}</Text>
        </View>
        <View style={{
          flex: 0.3,
          marginRight: 12,
          flexDirection: "row-reverse",
          alignItems: "center",
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
          }}>
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
      <Modal visible={popupVisible} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: COLORS.overlay,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <View style={{
            width: "90%", // Adjust the width of the popup
            height: 500, // Adjust the height of the popup
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 20,
            elevation: 5,
          }}>
            <ScrollView>
              <Image source={{ uri: venueImage }} style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
                marginBottom: 10,
              }} />
              <Text style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              }}>{venueName}</Text>
              <Entypo name="location-pin" size={24} color="black" />
              <Text style>{venueAddress}</Text>
              <FontAwesome
                name="phone"
                size={24}
                color="black"
                style={{ marginLeft: 2 }}
              />
              <Text style>{venueContact}</Text>
              <Text style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10, marginTop: 5
              }}>
                Operating Hours{" "}
              </Text>
              <Text style>{venueOperatingHours}</Text>
              <View
                style={{
                  borderTopColor: "black",
                  borderBottomWidth: 1,
                  marginTop: 10,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}>Ratings: </Text>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={16}
                      color={star <= venueRating ? COLORS.foam : COLORS.grey}
                      style={{ marginBottom: 9 }}
                    />
                  ))}
                </View>
                <Button
                  title="Write a Review"
                  color={COLORS.grey}
                  filled
                  style={{
                    width: '30%',
                    height: 40,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 'auto',
                  }}
                />
              </View>
              <View
                style={{
                  borderTopColor: "black",
                  borderTopWidth: 1,
                }}
              >
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10, marginTop: 5
                }}>Menu</Text>
                {venueMenu.map((beer) => (
                  <View key={beer.beerID}>
                    <Text>{beer.beerName}</Text>
                    <Text>{beer.abv}</Text>
                    <Text>{beer.ibu}</Text>
                    <Text>{beer.price}</Text>
                    <Image
                      source={{ uri: beer.beerImage }}
                      style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "contain",
                        marginBottom: 10,
                      }}
                    />
                  </View>
                ))}
              </View>
              <Button
                title="Close"
                onPress={handlePopupClose}
                color={COLORS.yellow}
                filled
                style={{
                  backgroundColor: COLORS.orange,
                  padding: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: "50%", // Adjust the marginTop to shift the close button down
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
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
        const response = await axios.get('http://10.0.2.2:3000/getBeerData');
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

        <View style={[styles.container, { width: '98%', borderColor: COLORS.grey, borderWidth: 1, marginLeft: 5, borderRadius: 10 }]}>
          <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
            {beerData.map((beer, index) => (
              <BeerItem
                key={beer._id}
                beerName={beer.beerName}
                price={beer.price}
                rating={beer.rating}
                beerDescription={beer.beerDescription}
                beerImage={beer.beerImage}
                ABV={beer.abv}
                IBU={beer.ibu}
                communityReviews={beer.communityReviews}
                venueAvailability={beer.venueAvailability}
              />
            ))}
            {venueData.map((venue, index) => (
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
