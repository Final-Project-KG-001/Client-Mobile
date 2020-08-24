import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import client, { IS_LOGIN, GET_Users } from '../config/apolloClient'

import DetailProfile from '../components/DetailProfile'
import FormEditProfile from '../components/FormEditProfile'

export default function Profile({ navigation }) {
    const users = useQuery(GET_Users)
    const isLogin = useQuery(IS_LOGIN)

    let user = null

    if (users.data && isLogin.data) {
        user = users.data.users.filter(x => x.email === isLogin.data.isLogin.email)
    }
    console.log(user)

    function logout(event) {
        event.preventDefault()
        client.readQuery({
            query: IS_LOGIN
        })
        client.writeQuery({
            query: IS_LOGIN,
            data: {
                isLogin: {
                    token: "",
                    email: ""
                }
            }
        })
        navigation.navigate('LandingPage')
    }

    return (
        <View style={ styles.container }>
            { users.data && 
                <View>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user[0].name}</Text>
                    </View>
                    <View style={{ marginTop: 40, marginHorizontal: 10 }}>
                        <Image source={require('../assets/dummy.png')} style={{
                            height: 80, width: 80, borderRadius: 40, borderColor: 'white', borderWidth: 3
                        }}/>
                        <DetailProfile user={user[0]}/>
                        {/* <FormEditProfile/> */}
                        <TouchableOpacity onPress={logout} style={{ ...styles.button }}>
                            <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcccc'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#e66767',
        height: 80,
        paddingTop: 40,
        paddingLeft: 100
    },
    button: {
        backgroundColor: '#eb4d4b',
        height: 50,
        marginTop: 30,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
})
