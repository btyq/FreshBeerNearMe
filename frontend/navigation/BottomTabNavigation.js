import {
	AntDesign,
	Entypo,
	Feather,
	FontAwesome,
	Ionicons,
	MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import COLORS from "../constants/colors";
import {
	BeersVenue,
	Dashboard,
	Feedback,
	Journal,
	Profile,
	Social,
	Welcome,
} from "../screens";

const Tab = createBottomTabNavigator();

const screenOptions = {
	tabBarShowLabel: false,
	headerShown: false,
	tabBarHideOnKeyboard: true,
	tabBarStyle: {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		elevation: 20,
		height: 65,
		backgroundColor: COLORS.secondary,
	},
};

const BottomTabNavigation = () => {
	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Feather
								name="home"
								size={24}
								color={focused ? COLORS.black : COLORS.grey}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<FontAwesome
								name="user-circle"
								size={24}
								color={focused ? COLORS.black : COLORS.grey}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="BeersVenue"
				component={BeersVenue}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Entypo
								name="shop"
								size={24}
								color={focused ? COLORS.black : COLORS.grey}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Social"
				component={Social}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Ionicons
								name="people"
								size={24}
								color={focused ? COLORS.black : COLORS.grey}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Feedback"
				component={Feedback}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<MaterialIcons
								name="feedback"
								size={24}
								color={focused ? COLORS.black : COLORS.grey}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Journal"
				component={Journal}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<Ionicons
								name="journal"
								size={24}
								color={focused ? COLORS.black : COLORS.grey}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Welcome"
				component={Welcome}
				options={{
					tabBarIcon: ({ focused }) => {
						return (
							<AntDesign
								name="logout"
								size={24}
								color={focused ? COLORS.black : COLORS.grey}
							/>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigation;
