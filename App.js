import * as React from "react";
import { CookieProvider } from "./frontend/CookieContext";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard, Signup, Welcome, Profile, BeersVenue } from "./frontend/screens";
import { AdminLogin, ManageUsers } from "./frontend/components";
import BottomTabNavigation from './frontend/navigation/BottomTabNavigation'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CookieProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, tabBarVisible: false }}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
          <Stack.Screen name="BeersVenue" component={BeersVenue} options={{headerShown:false}}/>
          <Stack.Screen name="AdminLogin" component={AdminLogin} options={{headerShown:false}}/>
          <Stack.Screen name="ManageUsers" component={ManageUsers} options={{headerShown:false}}/>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{
                headerShown: false,
            }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </CookieProvider>
  );
}