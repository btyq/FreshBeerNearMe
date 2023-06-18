import React from 'react';
import { CookieProvider } from './frontend/CookieContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, Signup, Dashboard, Profile, BeersVenue, Social, Feedback, Journal, Wishlist } from './frontend/screens';
import { AdminLogin, ManageUsers } from './frontend/components';
import BottomTabNavigation from './frontend/navigation/BottomTabNavigation';
import FindABeer from './frontend/screens/FindABeer';
import NearbyVenues from './frontend/screens/NearbyVenues';
import TopRated from './frontend/screens/TopRated';
import Breweries from './frontend/screens/Breweries';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CookieProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, tabBarVisible: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="BeersVenue" component={BeersVenue} options={{ headerShown: false }} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
          <Stack.Screen name="ManageUsers" component={ManageUsers} options={{ headerShown: false }} />
          <Stack.Screen name="Social" component={Social} options={{ headerShown: false }} />
          <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
          <Stack.Screen name="Journal" component={Journal} options={{ headerShown: false }} />
          <Stack.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false }} />
          <Stack.Screen name="FindABeer" component={FindABeer} options={{ headerShown: false }} />
          <Stack.Screen name="NearbyVenues" component={NearbyVenues} options={{ headerShown: false }} />
          <Stack.Screen name="TopRated" component={TopRated} options={{ headerShown: false }} />
          <Stack.Screen name="Breweries" component={Breweries} options={{ headerShown: false }} />
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CookieProvider>
  );
}
