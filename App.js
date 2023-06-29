import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
} from "./frontend/screens";

const Stack = createNativeStackNavigator();

export default function App() {
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
				</Stack.Navigator>
			</NavigationContainer>
		</CookieProvider>
	);
}
