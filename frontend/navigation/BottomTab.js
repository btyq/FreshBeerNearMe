import { View, Text, Platform } from 'react-native'
import React from 'react'
import { Feather, Ionicons, FontAwesome, FontAwesome5, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import  COLORS from '../constants/colors'
import { FindABeer, BeersVenue, NearbyVenues, TopRated, Breweries } from '../screens'

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

const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="BeersVenue"
                component={BeersVenue}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Entypo
                                name="shop"
                                size={24}
                                color={focused ? COLORS.primary : COLORS.black}
                            />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="FindABeer"
                component={FindABeer}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name="beer"
                                size={24}
                                color={focused ? COLORS.primary : COLORS.black}
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="NearbyVenues"
                component={NearbyVenues}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <FontAwesome
                                name="location-arrow"
                                size={24}
                                color={focused ? COLORS.primary : COLORS.black}
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="TopRated"
                component={TopRated}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                                name="star"
                                size={24}
                                color={focused ? COLORS.primary : COLORS.black}
                            />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Breweries"
                component={Breweries}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Entypo
                                name="drink"
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

export default BottomTab