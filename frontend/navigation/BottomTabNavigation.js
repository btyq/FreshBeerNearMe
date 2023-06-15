import { View, Text, Platform } from 'react-native'
import React from 'react'
import { Feather, Ionicons, FontAwesome, FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import  COLORS from '../constants/colors'
import { Dashboard, Profile, BeersVenue, Welcome } from '../screens'

const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 50,
        backgroundColor: '#ffcc00',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
}

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
                                color={focused ? COLORS.primary : COLORS.black}
                            />
                        )
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
                                color={focused ? COLORS.primary : COLORS.black}
                            />
                        )
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
                                color={COLORS.black}
                            />
                        )
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
                                color={focused ? COLORS.primary : COLORS.black}
                            />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation