import React from 'react';
import { StyleSheet, Text, View, Easing } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import Dashboard from './screens/Dashboard'
import LandingPage from './screens/LandingPage'
import Login from './screens/Login'
import Register from './screens/Register'
import QRCode from './screens/QRCode'

const Stack = createStackNavigator()

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true, gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: closeConfig
          }
        }}
        headerMode= "none"
        animation= "fade"
      >
        <Stack.Screen options={{ title: 'Landing Page' }} name="LandingPage" component={ LandingPage }/>
        <Stack.Screen name="Dashboard" component={ Dashboard }/>
        <Stack.Screen name="Login" component={ Login }/>
        <Stack.Screen name="Register" component={ Register }/>
        <Stack.Screen name="QRCode" component={ QRCode }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
