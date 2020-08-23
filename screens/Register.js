import React, {useState} from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

export default function Register({ navigation }) {
    const {height} = Dimensions.get('window')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    function register(event) {
        event.preventDefault()
        console.log({ email, password })
        navigation.navigate('Login')
    }

    return (
        <View style={ styles.container }>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground source={require('../assets/Rainbow-Pattern.jpg')} style={styles.imgBackground}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Register Page</Text>
                </ImageBackground>
            </View>
            <View style={{ height: height/3 }}>
                <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" style={styles.textInput} placeholderTextColor="black"/>
                <TextInput onChangeText={(text) => setPassword(text)} placeholder="Password" style={styles.textInput} placeholderTextColor="black"/>
                <TouchableOpacity onPress={register} style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <Text style={{ ...styles.buttonText, color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    imgBackground: {
        flex: 1,
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
    buttonText: {
        fontSize:20,
        fontWeight: 'bold'
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