import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function LandingPage({ navigation }) {
  function toLoginPage(event) {
    event.preventDefault();
    navigation.navigate("Login");
  }

  return (
    <View style={ styles.container }>
      <View style={ { ...StyleSheet.absoluteFill, alignItems: "center", marginTop: 100 } }>
        <Image source={ require('../assets/doctor.png') } style={ { width: 400, height: 330 } } />
        <Text style={ { fontSize: 25, textAlign: 'center', marginTop: 20 } }>Say good bye to snaky line</Text>
        <Text style={ { fontWeight: 'bold', fontSize: 30, marginBottom: 10, color: "#ffa931" } }>QME for Hospital</Text>
        <Text style={ { fontSize: 20, textAlign: 'center', marginBottom: 20, color: "#838383" } }>Help patients managing queue, no more time wasted standing in line.</Text>
      </View>
      <TouchableOpacity onPress={ toLoginPage } style={ { ...styles.button, backgroundColor: '#85a392' } }>
        <Text style={ { ...styles.buttonText, color: 'white' } }>Getting Started</Text>
      </TouchableOpacity>
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
    marginBottom: 60
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
