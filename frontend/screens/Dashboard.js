import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView, useFocusEffect } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Octicons, Entypo } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import { useCookies } from "../CookieContext";
import { Tab, TabView, ThemeProvider, Card } from '@rneui/themed';

// CODES TO STYLE BUTTON
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
      <Text style={{ fontSize: 14, ...{ color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const Dashboard = ({ navigation }) => {
  const { cookies } = useCookies();
  const [index, setIndex] = React.useState(0);
  const [index1, setIndex1] = React.useState(0);

  useEffect(() => {
    const sessionToken = cookies.sessionToken;
    const username = cookies.username;
    // Use the sessionToken and username as needed
    console.log("Session Token:", sessionToken);
    console.log("Username:", username);
  }, []);

  // ================================== Functions for different button ==================================
  const handleUpcomingEventsClick = () => {
    // Handle click for "Upcoming Events" here
  };

  const handleRecommendedSpecialtyClick = () => {
    // Handle click for "Recommended Specialty for You" here
  };
  
//=====================================================================================================
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.yellow]}>
      <View
        style={{
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
        }}
      >
        <Text style={{ fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>FreshBeer</Text>
        <View style={{ flexDirection: 'row' }}>
          <Octicons name="bookmark" size={24} color={COLORS.black} style={{marginRight: 12}}/>
          <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
        </View>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: COLORS.black }}>Welcome!</Text>
            <View style={styles.grid}>
              <Button
                title="My Profile"
                onPress={() => navigation.navigate('BottomTabNavigation', { screen: 'Profile' })}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Beers & Venues"
                onPress={() => navigation.navigate('BeersVenue')}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Social & Community"
                onPress={() => navigation.navigate('Social')}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="Feedback & Requests"
                onPress={() => navigation.navigate('Feedback')}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="My Journal & Achievements"
                onPress={() => navigation.navigate('Journal')}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
              <Button
                title="My Wishlist"
                onPress={() => navigation.navigate('Wishlist')}
                color={COLORS.foam}
                filled
                style={styles.gridItem}
              />
            </View>
          </View>

          <Card containerStyle={{ marginTop: 5 }}>
            <Card.Title>Upcoming Events</Card.Title>
            <Card.Divider />
            <ThemeProvider
              theme={{
                Tab: {
                  primary: {
                    backgroundColor: COLORS.foam, // Change the background color here
                  },
                },
              }}
            >
              <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                style={{ marginHorizontal: 20, height: 50 }}
                indicatorStyle={{
                  backgroundColor: 'white',
                  height: 3,
                }}
                variant="primary"
              >
                <Tab.Item
                  title="Event 1"
                  titleStyle={{ fontSize: 12 }}
                  icon={<MaterialIcons name="event-available" size={24} color="white" />}
                  style={{ paddingHorizontal: 5, marginHorizontal: -5 }}
                />
                <Tab.Item
                  title="Event 2"
                  titleStyle={{ fontSize: 12 }}
                  icon={<MaterialIcons name="event-available" size={24} color="white" />}
                  style={{ paddingHorizontal: 5, marginHorizontal: -5 }}
                />
                <Tab.Item
                  title="Event 3"
                  titleStyle={{ fontSize: 12 }}
                  icon={<MaterialIcons name="event-available" size={24} color="white" />}
                  style={{ paddingHorizontal: 5, marginHorizontal: -5 }}
                />
              </Tab>
              <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%', padding: 20 }}>
                  <Card>
                    <ImageBackground
                      source={require('../assets/event1.png')}
                      style={styles.cardImage}
                    >
                    </ImageBackground>
                  </Card>
                </TabView.Item>
                <TabView.Item style={{ width: '100%', padding: 20 }}>
                  <Card>
                    <ImageBackground
                      source={require('../assets/event2.png')}
                      style={styles.cardImage}
                    >
                    </ImageBackground>
                  </Card>
                </TabView.Item>
                <TabView.Item style={{ width: '100%', padding: 20 }}>
                  <Card>
                    <ImageBackground
                      source={require('../assets/event3.png')}
                      style={styles.cardImage}
                    >
                    </ImageBackground>
                  </Card>
                </TabView.Item>
              </TabView>
            </ThemeProvider>
          </Card>

          <Card containerStyle={{ marginTop: 15, color: COLORS.yellow }}>
          <Text style={{ fontSize: 17, color: COLORS.black, marginHorizontal: 22, marginBottom: 5 }}>Recommended Specially for you</Text>
            <ThemeProvider
              theme={{
                Tab: {
                  primary: {
                    backgroundColor: COLORS.foam, // Change the background color here
                  },
                },
              }}
            >
                <Tab
                  value={index1}
                  onChange={(e) => setIndex1(e)}
                  style={{ marginHorizontal: 20, height: 50 }}  
                  indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                  }}
                  variant="primary"
                >
                  <Tab.Item
                    title="Venue 1"
                    titleStyle={{ fontSize: 12 }}
                    icon={<Entypo name="drink" size={24} color="white" />}
                    style={{ paddingHorizontal: 5, marginHorizontal: -5 }}
                  />
                  <Tab.Item
                    title="Venue 2"
                    titleStyle={{ fontSize: 12 }}
                    icon={<Entypo name="drink" size={24} color="white" />}
                    style={{ paddingHorizontal: 5, marginHorizontal: -5 }}
                  />
                  <Tab.Item
                    title="Venue 3"
                    titleStyle={{ fontSize: 12 }}
                    icon={<Entypo name="drink" size={24} color="white" />}
                    style={{ paddingHorizontal: 5, marginHorizontal: -5 }}
                  />
                </Tab>
                <View style={styles.cardContainer}>
                <TabView value={index1} onChange={setIndex1} animationType="spring">
                  <TabView.Item style={{ backgroundColor: 'transparent', width: '100%', padding: 20 }}>
                    <View style={styles.card}>
                      <ImageBackground
                        source={require('../assets/event1.png')}
                        style={styles.cardImage}
                        >
                      </ImageBackground>
                    </View>
                  </TabView.Item>
                  <TabView.Item style={{ backgroundColor: 'transparent', width: '100%', padding: 20, }}>
                    <View style={styles.card}>
                      <ImageBackground
                        source={require('../assets/event2.png')}
                        style={styles.cardImage}
                          >
                      </ImageBackground>
                    </View>
                  </TabView.Item>
                  <TabView.Item style={{ backgroundColor: 'transparent', width: '100%', padding: 20 }}>
                      <ImageBackground
                        source={require('../assets/event3.png')}
                        style={styles.cardImage}
                          >
                      </ImageBackground>
                  </TabView.Item>
                </TabView>
                </View>
              </ThemeProvider>
              </Card>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  gridItem: {
    width: '45%',
    height: 50, // increased height
    marginVertical: 5,
    marginHorizontal: '2.5%',
  },
  button: {
    paddingVertical: 3, // increased padding
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    //backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    //marginBottom: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    overflow: 'hidden',
  }, 
  tabContent: {
    width: '100%',
    height: 50, // Adjust the height as per your requirement
  },
  tabView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tabViewItem: {
    //backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
});

export default Dashboard;
