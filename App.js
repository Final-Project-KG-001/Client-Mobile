import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";

import Dashboard from "./screens/Dashboard";
import LandingPage from "./screens/LandingPage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Admin from "./screens/Admin";
// import QRCodeScanner from "./screens/QRCodeScanner";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={ client }>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={ {
            gestureEnabled: true,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          } }
          headerMode="none"
        >
          <Stack.Screen name="LandingPage" component={ LandingPage } />
          <Stack.Screen name="Dashboard" component={ Dashboard } />
          <Stack.Screen name="Login" component={ Login } />
          <Stack.Screen name="Register" component={ Register } />
          <Stack.Screen name="QRCodeScan" component={ QRCodeScanner } />
          <Stack.Screen name="Admin" component={ Admin } />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
