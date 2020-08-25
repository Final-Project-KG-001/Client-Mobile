import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { gql, useMutation } from '@apollo/client'

const REGISTER = gql`
    mutation Register($name:String, $dob:String, $email:String, $password:String, $phoneNumber:String) {
        registerUser(name: $name, dob: $dob, email: $email, password: $password, phoneNumber: $phoneNumber) {
            message
        }
    }
`

export default function Register({ navigation }) {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [registerUser, result] = useMutation(REGISTER)
    
    async function register(event) {
        event.preventDefault()
        try {
            await registerUser({
                variables: {
                    name: name,
                    dob: dob,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber
                }
            })
            console.log(result)
            navigation.navigate('Login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={ styles.container }>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground source={require('../assets/Rainbow-Pattern.jpg')} style={{ flex: 1 }}/>
            </View>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 30, alignSelf: 'center' }}>Register Page</Text>
                <TextInput onChangeText={(text) => setName(text)} placeholder="Your Name" style={styles.textInput} placeholderTextColor="black"/>
                <TextInput onChangeText={(text) => setDob(text)} placeholder="Date of Birth" style={styles.textInput} placeholderTextColor="black"/>
                <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" style={styles.textInput} placeholderTextColor="black"/>
                <TextInput onChangeText={(text) => setPassword(text)} placeholder="Password" style={styles.textInput} placeholderTextColor="black"/>
                <TextInput onChangeText={(text) => setPhoneNumber(text)} placeholder="Phone Number" style={styles.textInput} placeholderTextColor="black"/>
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
    button: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 30
    },
    buttonText: {
        fontSize:20,
        fontWeight: 'bold',
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