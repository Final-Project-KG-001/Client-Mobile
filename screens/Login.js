import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useQuery, gql, useMutation } from '@apollo/client'
import client, { IS_LOGIN } from '../config/apolloClient'

const LOGIN = gql`
    mutation Login($email:String, $password:String) {
        loginUser(email: $email, password:$password) {
            access_token
        }
    }
`

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isLogin = useQuery(IS_LOGIN)
    const [loginUser, result] = useMutation(LOGIN)

    function signIn(event) {
        event.preventDefault()
        loginUser({
            variables: {
                email: email,
                password: password
            }
        })
        if(result.data) {
            client.readQuery({
                query: IS_LOGIN
            })
            client.writeQuery({
                query: IS_LOGIN,
                data: {
                    isLogin: {
                        token: result.data.loginUser.access_token,
                        email: email
                    }
                }
            })
            navigation.navigate('Dashboard')
        }
    }
    function register(event) {
        event.preventDefault()
        navigation.navigate('Register')
    }

    useEffect(() => {
        if (isLogin.data.isLogin.token !== "") {
            navigation.navigate('Dashboard')
        }
    })

    return (
        <View style={ styles.container }>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground source={require('../assets/Rainbow-Pattern.jpg')} style={styles.imgBackground}/>
            </View>
            <View style={{ marginBottom: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, alignSelf: 'center' }}>Login Page</Text>
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
