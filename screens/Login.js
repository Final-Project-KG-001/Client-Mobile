import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { useQuery, gql, useMutation } from '@apollo/client'
import client, { IS_LOGIN, LOCAL_USER, GET_USERS } from '../config/apolloClient'

const LOGIN_USER = gql`
    mutation LoginUser($email:String, $password:String) {
        loginUser(email: $email, password:$password) {
            access_token
        }
    }
`
const LOGIN_ADMIN = gql`
    mutation LoginAdmin($email:String, $password:String) {
        loginAdmin(email: $email, password:$password) {
            access_token
        }
    }
`

export default function Login({ navigation }) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const isLogin = useQuery(IS_LOGIN)
    const users = useQuery(GET_USERS)
    const [loginUser, result] = useMutation(LOGIN_USER)
    const [loginAdmin, res] = useMutation(LOGIN_ADMIN)

    async function signIn(event) {
        event.preventDefault()
        try {
            if (email === 'admin@mail.com') {
                loginAdmin({
                    variables: {
                        email: email,
                        password: password
                    }
                })
                console.log(res.data)
                if(res.data) {
                    console.log('test')
                    client.readQuery({
                        query: IS_LOGIN
                    })
                    client.writeQuery({
                        query: IS_LOGIN,
                        data: {
                            isLogin: {
                                token: res.data.loginAdmin.access_token,
                                email: email
                            }
                        }
                    })
                }
            } else {
                loginUser({
                    variables: {
                        email: email,
                        password: password
                    }
                })
                if(result.data) {
                    console.log('test', result.data.loginUser.access_token)
                    const data = client.readQuery({
                        query: IS_LOGIN
                    })
                    console.log(data)
                    client.writeQuery({
                        query: IS_LOGIN,
                        data: {
                            isLogin: {
                                token: result.data.loginUser.access_token,
                                email: email
                            }
                        }
                    })
                }
            }
            
            if(users.data) {
                const user = users.data.users.find(x => (x.email === email))
                client.readQuery({
                    query: LOCAL_USER
                })
                client.writeQuery({
                    query: LOCAL_USER,
                    data: {
                        localUser: {
                            _id: user._id,
                            name: user.name,
                            email: email,
                            dob: user.dob,
                            phoneNumber: user.phoneNumber,
                            role: user.role
                        }
                    }
                })
                // if(user.role === 'admin') {
                //     navigation.navigate('Admin')
                // } else if (user.role === 'user') {
                //     navigation.navigate('Dashboard')
                // }
            }
        } catch (err) {
            console.log('internal server')
        }
    }
    function register(event) {
        event.preventDefault()
        navigation.navigate('Register')
    }

    useEffect(() => {
        if (isLogin.data.isLogin.token !== "") {
            if(isLogin.data.isLogin.email === 'admin@mail.com') {
                navigation.navigate('Admin')
            } else {
                navigation.navigate('Dashboard')
            }
        }
    })

    return (
        <View style={ styles.container }>
            <View style={{ marginBottom: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, alignSelf: 'center' }}>Login Page</Text>
                <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" placeholderTextColor="#003f5c" style={styles.textInput}/>
                <TextInput onChangeText={(text) => setPassword(text)}  placeholderTextColor="#003f5c" placeholder="Password" style={styles.textInput}/>
                <TouchableOpacity onPress={signIn} style={{ ...styles.button, backgroundColor: '#eb4d4b' }}>
                    <Text style={{ ...styles.buttonText, color: 'white' }}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={register} style={{ ...styles.button}}>
                    <Text style={{ ...styles.buttonText, color: 'white' }}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#2d3853",
        justifyContent: 'flex-end'
    },
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
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
        backgroundColor: '#465881',
        height: 40,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5
    }
});
