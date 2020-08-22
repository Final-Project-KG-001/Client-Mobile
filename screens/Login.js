import React, {useState} from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import client, { LOGIN } from '../config/apolloClient'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    function signIn(event) {
        event.preventDefault()
        const {login} = client.readQuery({
            query: LOGIN
        })
        client.writeQuery({
            query: LOGIN,
            data: {
                login: {
                    token: "abcd",
                    isLogin: true,
                    email: email
                }
            }
        })
        navigation.navigate('Dashboard')
    }
    function register(event) {
        event.preventDefault()
        navigation.navigate('Register')
    }

    return (
        <View style={ styles.container }>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground source={require('../assets/Rainbow-Pattern.jpg')} style={styles.imgBackground}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Login Page</Text>
                </ImageBackground>
            </View>
            <View style={{ marginBottom: 30 }}>
                <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" style={styles.textInput} placeholderTextColor="black"/>
                <TextInput onChangeText={(text) => setPassword(text)} placeholder="Password" style={styles.textInput} placeholderTextColor="black"/>
                <TouchableOpacity onPress={signIn} style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <Text style={{ ...styles.buttonText, color: 'white' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={register} style={{ ...styles.button, backgroundColor: 'red' }}>
                    <Text style={{ ...styles.buttonText, color: 'white' }}>Register</Text>
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
        borderWidth: 2,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'black'
    }
});
