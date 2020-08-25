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
    const [ name, setName ] = useState('')
    const [ dob, setDob ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')

    const [ registerUser, result ] = useMutation(REGISTER)

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
            navigation.navigate('Login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.div_register }>
                <Text style={ { fontWeight: 'bold', fontSize: 30, alignSelf: 'center', marginBottom: 20, color: "#3b6978" } }>Register</Text>
                <TextInput onChangeText={ (text) => setName(text) } placeholder="Your Name" style={ styles.textInput } placeholderTextColor="#838383" />
                <TextInput onChangeText={ (text) => setDob(text) } placeholder="Date of Birth" style={ styles.textInput } placeholderTextColor="#838383">
                </TextInput>
                <TextInput onChangeText={ (text) => setEmail(text) } placeholder="Email" style={ styles.textInput } placeholderTextColor="#838383" />
                <TextInput onChangeText={ (text) => setPassword(text) } placeholder="Password" style={ styles.textInput } placeholderTextColor="#838383" />
                <TextInput onChangeText={ (text) => setPhoneNumber(text) } placeholder="Phone Number" style={ styles.textInput } placeholderTextColor="#838383" />
                <TouchableOpacity onPress={ register } style={ { ...styles.button, backgroundColor: '#ea8685' } }>
                    <Text style={ { ...styles.buttonText, color: 'white' } }>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#eae7dc",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#dee3e2",
    },
    div_register: {
        height: 400,
        width: 350,
        display: "flex",
        justifyContent: "center",
        // shadowColor: "#6e6d6d",
        // shadowOffset: {
        //     width: 15,
        //     height: 15
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // backgroundColor: "#dee3e2",
    },
    button: {
        height: 40,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 30,
        marginTop: 10,
        shadowColor: "#6e6d6d",
        shadowOffset: {
            width: 8,
            height: 8
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    textInput: {
        // backgroundColor: '#465881',
        height: 40,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        backgroundColor: "white",
        shadowColor: "#6e6d6d",
        shadowOffset: {
            width: 8,
            height: 8
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }
});