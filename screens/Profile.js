import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import client, { LOGIN, GET_Users } from '../config/apolloClient'

import DetailProfile from '../components/DetailProfile'
import FormEditProfile from '../components/FormEditProfile'

export default function Profile({ navigation }) {
    const users = useQuery(GET_Users)
    console.log(users.data.localUsers)

    function logout(event) {
        event.preventDefault()
        const {login} = client.readQuery({
            query: LOGIN
        })
        client.writeQuery({
            query: LOGIN,
            data: {
                login: {
                    token: "",
                    isLogin: false,
                    email: ''
                }
            }
        })
        navigation.navigate('LandingPage')
    }

    return (
        <View style={ styles.container }>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Customer Name</Text>
            </View>
            <View style={{ marginTop: 40, marginHorizontal: 10 }}>
                <Image source={require('../assets/dummy.png')} style={{
                    height: 80, width: 80, borderRadius: 40, borderColor: 'white', borderWidth: 3
                }}/>
                <DetailProfile/>
                {/* <FormEditProfile/> */}
                <TouchableOpacity onPress={logout} style={{ ...styles.button }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
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
