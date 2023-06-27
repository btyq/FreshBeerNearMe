import React from 'react';
import { CookieProvider } from './frontend/CookieContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, Signup, Dashboard, Profile, BeersVenue, Social, Feedback, Journal, Wishlist} from './frontend/screens';
import {Forums, ReferAFriend, RateNReview, Recommendation} from './frontend/screens';
import { AdminDashboard, ManageUsers } from './frontend/components';
import { FindABeer, NearbyVenues, TopRated, Breweries } from './frontend/screens';
import BottomTabNavigation from './frontend/navigation/BottomTabNavigation';
import BottomTab from './frontend/navigation/BottomTab';

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
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="ManageUsers" component={ManageUsers} options={{ headerShown: false }} />
          <Stack.Screen name="Social" component={Social} options={{ headerShown: false }} />
          <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
          <Stack.Screen name="Journal" component={Journal} options={{ headerShown: false }} />
          <Stack.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false }} />
          <Stack.Screen name="FindABeer" component={FindABeer} options={{ headerShown: false }} />
          <Stack.Screen name="NearbyVenues" component={NearbyVenues} options={{ headerShown: false }} />
          <Stack.Screen name="TopRated" component={TopRated} options={{ headerShown: false }} />
          <Stack.Screen name="Breweries" component={Breweries} options={{ headerShown: false }} />
          <Stack.Screen name="Forums" component={Forums} options={{ headerShown: false }} />
          <Stack.Screen name="RateNReview" component={RateNReview} options={{ headerShown: false }} />
          <Stack.Screen name="ReferAFriend" component={ReferAFriend} options={{ headerShown: false }} />
          <Stack.Screen name="Recommendation" component={Recommendation} options={{ headerShown: false }} />
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CookieProvider>
  );
}
