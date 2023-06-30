import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { CookieProvider } from "./frontend/CookieContext";
import { AdminDashboard, ManageUsers } from "./frontend/components";
import BottomTabNavigation from "./frontend/navigation/BottomTabNavigation";
import {
	Forums,
	RateNReview,
	Recommendation,
	ReferAFriend,
	Signup,
	Welcome,
	WriteAReview,
} from "./frontend/screens";

const Stack = createNativeStackNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		"Poppins-Regular": require("./frontend/assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Bold": require("./frontend/assets/fonts/Poppins-Bold.ttf"),
	});
	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}
		prepare();
	}, []);

	if (!fontsLoaded) {
		return undefined;
	} else {
		SplashScreen.hideAsync();
	}

	return (
		<CookieProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Welcome">
					<Stack.Screen
						name="Welcome"
						component={Welcome}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Signup"
						component={Signup}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="BottomTabNavigation"
						component={BottomTabNavigation}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="AdminDashboard"
						component={AdminDashboard}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ManageUsers"
						component={ManageUsers}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Forums"
						component={Forums}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RateNReview"
						component={RateNReview}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ReferAFriend"
						component={ReferAFriend}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Recommendation"
						component={Recommendation}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="WriteAReview"
						component={WriteAReview}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</CookieProvider>
	);
}
