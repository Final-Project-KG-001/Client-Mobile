import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'

export default function LandingPage({ navigation }) {
  function toLoginPage(event) {
    event.preventDefault();
    navigation.navigate("Login");
  }
  function toQR(event) {
    event.preventDefault();
    navigation.navigate("QRCode");
  }

  function toQRScan(event) {
    event.preventDefault();
    navigation.navigate("QRCodeScan");
  }

  return (
    <View style={ styles.container }>
      <View style={ { ...StyleSheet.absoluteFill } }>
        <ImageBackground source={ require('../assets/Rainbow-Pattern.jpg') } style={ styles.imgBackground }>
          <Text style={ { fontWeight: 'bold', fontSize: 30 } }>Landing Page</Text>
          <Text style={ { fontSize: 20, textAlign: 'center' } }>lorem ipsum quia dolor sit amet, consectetur, adipisci velit...dsdwaddsdwd</Text>
        </ImageBackground>
      </View>
      <TouchableOpacity onPress={ toLoginPage } style={ { ...styles.button, backgroundColor: 'blue' } }>
        <Text style={ { ...styles.buttonText, color: 'white' } }>Click to Start</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={ toQR }
          style={ { ...styles.button, backgroundColor: "blue" } }
        >
          <Text style={ { ...styles.buttonText, color: "white" } }>QRCode</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={ toQRScan }
          style={ { ...styles.button, backgroundColor: "blue" } }
        >
          <Text style={ { ...styles.buttonText, color: "white" } }>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  imgBackground: {
    flex: 1,
    paddingTop: 300,
    alignItems: "center",
  },
  button: {
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
