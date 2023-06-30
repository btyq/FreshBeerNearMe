import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
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
        paddingVertical: 10,
        borderColor: COLORS.grey,
        width: '20%',
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 15, ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};


const WriteAReview = () => {
  const navigation = useNavigation();

  const navigateToRateNReview = () => {
    navigation.navigate('RateNReview');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginHorizontal: 10,
        }}>
          <Button
            title="Back"
            color={COLORS.grey}
            filled
            style={{
            }}
            onPress={navigateToRateNReview}
          />

          <View style={{
            width: '100%',
            borderWidth: 1,
            borderColor: COLORS.grey,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 30,
            marginBottom: 25,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                flex: 1,
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>Beer Name:</Text>
              <View style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
                <AirbnbRating
                  count={5}
                  defaultRating={4}
                  size={20}
                  showRating={false}
                  isDisabled={true}
                />
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 25, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, color: COLORS.black, marginRight: 10 }}>Upload photo</Text>
            <TouchableOpacity
              style={{ backgroundColor: COLORS.grey, padding: 10, borderRadius: 20, borderColor: COLORS.grey, marginLeft: '52%',  width: 80 }}
              onPress={() => {
                // Handle the onPress event for the "Select" button
              }}
            >
              <Text style={{ fontSize: 16, color: COLORS.black, textAlign: 'center' }}>Select</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 16, color: COLORS.black, marginLeft: 20 }}>Review</Text>
          <TextInput
            style={{
              marginBottom: 25,
              width: '65%',
              height: '50%',
              borderWidth: 1,
              borderColor: COLORS.grey,
              borderRadius: 10,
              padding: 10,
              paddingRight: 0,
              paddingLeft: 10,
              marginRight: 5,
              textAlignVertical: 'top',
            }}
            placeholder="Enter your review"
            placeholderTextColor={COLORS.grey}
            multiline
            onChangeText={(text) => {
              // Handle the text change event
            }}
          />
          <View style={{
            width: '100%',
            marginBottom: 30,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                marginLeft: 20,
                flex: 1,
                fontSize: 16,
                color: COLORS.black,
              }}>Rating</Text>
              <View style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
                <AirbnbRating
                  count={5}
                  defaultRating={4}
                  size={20}
                  showRating={false}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{ backgroundColor: COLORS.grey, padding: 10, borderRadius: 20, borderColor: COLORS.grey, marginLeft: "80%", width: 80 }}
            onPress={() => {
              // Handle the onPress event for the "Submit" button
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black, textAlign: 'center' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default WriteAReview;
