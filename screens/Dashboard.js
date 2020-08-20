import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

import ListDoctor from '../screens/ListDoctor'
import Home from '../screens/Home'
import Profile from '../screens/Profile'

function getHeaderTitle(route) {
    const routeName = route.state ? route.state.routes[route.state.index].name : 'Home'
    switch(routeName) {
      case "Home":
        return "Home";
      case "ListDoctor":
        return "List Doctor"
    }
  }

export default function Dashboard({ navigation, route }) {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) })
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon:({color, size}) => {
                let iconName
                if(route.name == 'Home') {
                    iconName = 'ios-home'
                } else if(route.name == 'ListDoctor') {
                    iconName = 'ios-clipboard'
                } else if(route.name == 'Profile') {
                    iconName = 'ios-person'
                }
                return <Ionicons name={iconName} color={color} size={size}/>
            }
        })}>
            <Tab.Screen name="Home" component={ Home }/>
            <Tab.Screen name="ListDoctor" component={ ListDoctor }/>
            <Tab.Screen name="Profile" component={ Profile }/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 25 : 0
    }
})