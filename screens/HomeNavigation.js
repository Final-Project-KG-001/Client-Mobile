import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import Home from './Home'
import MakeAppointment from './MakeAppointment'

const Stack = createStackNavigator()

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true, gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="Homepage" component={Home} />
      <Stack.Screen name="MakeAppointment" component={MakeAppointment} />
    </Stack.Navigator>
  )
}
