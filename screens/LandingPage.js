import React from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

const {height} = Dimensions.get('window')

export default function LandingPage({ navigation }) {
    function signIn(event) {
        event.preventDefault()
        navigation.navigate('Login')
    }

    function register(event) {
        event.preventDefault()
        navigation.navigate('Register')
    }

    function toDashboard(event) {
        event.preventDefault()
        navigation.navigate('Dashboard')
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground source={require('../assets/Rainbow-Pattern.jpg')} style={styles.droidSafeArea}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Landing Page</Text>
                </ImageBackground>
            </View>
            <View style={{ height: height/3 }}>
                <TouchableOpacity onPress={signIn} style={{ ...styles.button }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold' }}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={register} style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toDashboard} style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Dashboard</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        height: null,
        width: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
});
