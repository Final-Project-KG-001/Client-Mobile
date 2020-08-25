import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
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
    const [ loginUser, result ] = useMutation(LOGIN_USER)
    const [ loginAdmin, res ] = useMutation(LOGIN_ADMIN)

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
                if (res.data) {
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
                // console.log(email, password)
            } else {
                loginUser({
                    variables: {
                        email: email,
                        password: password
                    }
                })
                if (result.data) {
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
                }
            }

            if (users.data) {
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
                if (user.role === 'admin') {
                    navigation.navigate('Admin')
                } else if (user.role === 'user') {
                    navigation.navigate('Dashboard')
                }
            }
        } catch (err) {
            // console.log('internal server')
        }
    }
    function register(event) {
        event.preventDefault()
        navigation.navigate('Register')
    }

    useEffect(() => {
        if (isLogin.data.isLogin.token !== "") {
            if (isLogin.data.isLogin.email === 'admin@mail.com') {
                navigation.navigate('Admin')
            } else {
                navigation.navigate('Dashboard')
            }
        }
    })

    return (
        <View style={ styles.container }>
            <View style={ styles.div_login }>
                <Image source={ require('../assets/loginicon.png') } style={ styles.login_icon } />
                <TextInput onChangeText={ (text) => setEmail(text) } placeholder="Email" placeholderTextColor="#838383" style={ styles.textInput } />
                <TextInput secureTextEntry={ true } onChangeText={ (text) => setPassword(text) } placeholderTextColor="#838383" type="password" placeholder="Password" style={ styles.textInput } />
                <TouchableOpacity onPress={ signIn } style={ {
                    ...styles.button, backgroundColor: '#ea8685',
                    marginTop: 20,
                } }>
                    <Text style={ { ...styles.buttonText } }>LOGIN</Text>
                </TouchableOpacity>
                <View style={ { ...styles.button, marginBottom: 20 } }>
                    <Text style={ { ...styles.buttonText, color: "#797a7e", fontSize: 15 } }>Not registered? <Text onPress={ register } style={ { color: "#eebb4d" } }>Create an account!</Text></Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#eae7dc",
        justifyContent: 'center',
        alignItems: 'center'
    },
    div_login: {
        backgroundColor: "#dee3e2",
        height: 400,
        width: 350,
        justifyContent: "center",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        shadowColor: "#6e6d6d",
        shadowOffset: {
            width: 15,
            height: 15
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 300,
        height: 40,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: 'white',
        marginTop: 10,
        height: 40,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        width: 300,
    },
    login_icon: {
        marginTop: 20,
        marginBottom: 20,
        width: 100,
        height: 100,
    }

});
