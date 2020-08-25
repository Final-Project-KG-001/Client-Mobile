import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const Tab = createMaterialBottomTabNavigator()

import ListDoctor from '../screens/ListDoctor'
import Profile from '../screens/Profile'
import HomeNavigation from './HomeNavigation'

export default function Dashboard() {
    return (
        <Tab.Navigator barStyle={ { backgroundColor: 'white' } } screenOptions={ ({ route }) => ({
            tabBarIcon: ({ color }) => {
                let iconName
                if (route.name == 'Home') {
                    iconName = 'ios-home'
                } else if (route.name == 'ListDoctor') {
                    iconName = 'ios-clipboard'
                } else if (route.name == 'Profile') {
                    iconName = 'ios-person'
                }
                return <Ionicons name={ iconName } color={ color } size={ 25 } />
            }
        }) }>
            <Tab.Screen name="Home" component={ HomeNavigation } />
            <Tab.Screen name="ListDoctor" component={ ListDoctor } />
            <Tab.Screen name="Profile" component={ Profile } />
        </Tab.Navigator>
    )
}