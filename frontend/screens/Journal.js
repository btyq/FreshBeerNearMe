import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import { AirbnbRating } from 'react-native-ratings';

const Button = ({ title, selected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: selected ? COLORS.foam : COLORS.white },
      ]}
      onPress={() => onSelect(title)}
    >
      <Text style={{ color: selected ? COLORS.black : COLORS.black }}>
        {title}
      </Text>
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

const Journal = () => {
  const [selectedButton, setSelectedButton] = useState("My Beer Journal");
  const [beerName, setBeerName] = useState('');
  const [tastingNotes, setTastingNotes] = useState('');
  const [beerNameRating, setBeerNameRating] = useState(0);
  const [tastingNotesRating, setTastingNotesRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleSave = () => {
    // Handle save functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={[COLORS.white, COLORS.yellow]}>
        <Header />

        <View style={styles.buttonContainer}>
          <Button
            title="My Beer Journal"
            selected={selectedButton === "My Beer Journal"}
            onSelect={setSelectedButton}
          />
          <Button
            title="My Statistics"
            selected={selectedButton === "My Statistics"}
            onSelect={setSelectedButton}
          />
        </View>

        {selectedButton === "My Beer Journal" ? (
          <ScrollView style={styles.scrollView}>
            <TouchableOpacity style={styles.beerContainer} onPress={() => setShowPopup(true)}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/specialtybeer.png')}
                  style={styles.userImage}
                />
                <TouchableOpacity style={styles.editButton} onPress={() => { }}>
                  <Text style={{ color: COLORS.white }}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.detailContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.beerName}>Beer Name</Text>
                  <View style={styles.starContainer}>
                    <AirbnbRating
                      count={5}
                      defaultRating={beerNameRating}
                      size={20}
                      selectedColor={COLORS.foam}
                      unSelectedColor={COLORS.gray}
                      reviews={[]}
                      isDisabled={false}
                      showRating={false}
                      onFinishRating={setBeerNameRating}
                    />
                  </View>
                </View>
                <View style={styles.tastingNoteContainer}>
                  <Text style={styles.tastingNote}>Tasting Note</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shortButton}>
              <Text style={styles.shortButtonText}>Add a Beer</Text>
            </TouchableOpacity>

            <View style={styles.line} />
            <View style={styles.bottomLine} />

            <View style={styles.textBoxContainer}>
              <View style={styles.textInputWrapper}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textInputLabel}>Name of Beer</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={beerName}
                  onChangeText={setBeerName}
                />
              </View>

              <View style={styles.textInputWrapper}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textInputLabel}>Tasting Notes</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={tastingNotes}
                  onChangeText={setTastingNotes}
                  multiline
                />
              </View>

              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Rating</Text>
                <View style={styles.ratingStarContainer}>
                  <AirbnbRating
                    count={5}
                    defaultRating={tastingNotesRating}
                    size={20}
                    selectedColor={COLORS.black}
                    unSelectedColor={COLORS.gray}
                    reviews={[]}
                    isDisabled={false}
                    showRating={false}
                    onFinishRating={setTastingNotesRating}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollView}>
            <View style={styles.statisticsContainer}>
              <LinearGradient style={styles.gradient} colors={[COLORS.white, COLORS.yellow]}>
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Number of unique places checked in: 5</Text>
                  <Text style={styles.emptyText}>Types of beer tried: 10</Text>
                  <Text style={styles.emptyText}>Your favorite tasting notes are: fruity</Text>
                  <Text style={styles.emptyText}>Your favorite bar is: Brewerkz Orchard (Visited 20 times!)</Text>
                </View>
                <View style={styles.container1}>
                  <Text style={styles.label}>Most Recently Visited</Text>
                  <Image
                    source={require('../assets/event1.png')}
                    style={styles.placeImage}
                  />
                  <View style={styles.detailsContainer}>
                    <Text style={styles.placeLabel}>Brewerkz Orchard</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={4}
                      size={15}
                      selectedColor={COLORS.foam}
                      unSelectedColor={COLORS.gray}
                      reviews={[]}
                      isDisabled={true}
                      showRating={false}
                    />
                  </View>
                </View>
                <View style={styles.container1}>
                  <Text style={styles.label}>Most Recently Tried</Text>
                  <Image
                    source={require('../assets/specialtybeer.png')}
                    style={styles.placeImage}
                  />
                  <View style={styles.detailsContainer}>
                    <Text style={styles.placeLabel}>Tiger Beer</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={4}
                      size={15}
                      selectedColor={COLORS.foam}
                      unSelectedColor={COLORS.gray}
                      reviews={[]}
                      isDisabled={true}
                      showRating={false}
                    />
                  </View>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        )}
        <Modal visible={showPopup} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <Text style={styles.popupText}>Container Clicked!</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowPopup(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  scrollView: {
    flex: 1,
  },
  beerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 0,
    borderColor: COLORS.black,
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: COLORS.orange,
    borderRadius: 12,
  },
  detailContainer: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: COLORS.white,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  beerName: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: COLORS.white,
  },
  starContainer: {
    marginLeft: 10,
  },
  tastingNoteContainer: {
    backgroundColor: COLORS.foam,
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  tastingNote: {
    fontSize: 15,
    color: COLORS.black,
  },
  shortButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.foam,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  shortButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 20,
  },
  bottomLine: {
    height: 1,
    backgroundColor: COLORS.black,
    marginHorizontal: 20,
  },
  textBoxContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInputLabel: {
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  labelContainer: {
    marginRight: 10,
  },
  saveButton: {
    alignSelf: 'flex-end',
    marginTop: 0,
    marginRight: 0,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: COLORS.foam,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statisticsContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 30,
  },
  container1: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeLabel: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.foam,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Journal;
