import React from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

const {height} = Dimensions.get('window')

export default function Register() {
    function register(event) {
        console.log('diklik')
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground source={require('../assets/Rainbow-Pattern.jpg')} style={styles.droidSafeArea}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Register Page</Text>
                </ImageBackground>
            </View>
            <View style={{ height: height/3 }}>
                <TextInput placeholder="Email" style={styles.textInput} placeholderTextColor="black"/>
                <TextInput placeholder="Password" style={styles.textInput} placeholderTextColor="black"/>
                <TouchableOpacity onPress={register} style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Submit</Text>
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
    },
    textInput: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'black'
    }
});