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

const Social = () => {
  const [comment, setComment] = useState('Bitter, but it\'s decent');
  const [comments, setComments] = useState([]);

  const handleComment = () => {
    setComments([...comments, comment]);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={[COLORS.white, COLORS.yellow]}>
        <Header />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.grid}>
              {['My Feed', 'Forums', 'Rate & Review', 'Refer a friend'].map((title, index) => (
                <Button
                  key={index}
                  title={title}
                  color={COLORS.orange}
                  filled
                  style={styles.longButton}
                />
              ))}
              <Button
                title="Recommendation"
                color={COLORS.orange}
                filled
                style={styles.mediumButton}
              />
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search..."
                style={styles.searchInput}
              />
              <Button
                title="Search for user"
                color={COLORS.orange}
                filled
                style={styles.searchButton}
              />
            </View>

            <View style={styles.userContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.userName}>Fred</Text>
                <Button
                  title="Follow +"
                  color={COLORS.foam}
                  filled
                  style={styles.followButton}
                />
              </View>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Location 1 Rating</Text>
              </View>
              <Image
                source={require('../assets/specialtybeer.png')} // Replace this with the actual path of your image
                style={styles.userImage}
              />
              <Text style={styles.commentText}>{comment}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingStarContainer}>
                  <AirbnbRating
                    count={5}
                    defaultRating={3}
                    size={20}
                    selectedColor={COLORS.foam}
                    unSelectedColor={COLORS.gray}
                    reviews={[]}
                    isDisabled={false}
                    style={styles.ratingStyle}
                  />
                </View>
              </View>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.userName}>Fred</Text>
                <Button
                  title="Follow +"
                  color={COLORS.foam}
                  filled
                  style={styles.followButton}
                />
              </View>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Location 2 Rating</Text>
              </View>
              <Text style={styles.commentText}>Drink is nice!!!</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingStarContainer}>
                  <AirbnbRating
                    count={5}
                    defaultRating={3}
                    size={20}
                    selectedColor={COLORS.foam}
                    unSelectedColor={COLORS.gray}
                    reviews={[]}
                    isDisabled={false}
                    style={styles.ratingStyle}
                  />
                </View>
              </View>
            </View>
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
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: 0,
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
});

export default Social;
