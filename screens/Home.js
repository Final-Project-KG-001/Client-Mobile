import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import {  LOGIN, GET_APPOINTMENT } from '../config/apolloClient'

export default function Home({ route, navigation }) {
    const isAppointment = false
    const login = useQuery(LOGIN)
    const appointments = useQuery(GET_APPOINTMENT)
    let coba = null
    
    if ( login.data && appointments.data ) {
        coba = appointments.data.localAppointment.filter(x => x.user.email === appointments.data.localAppointment.email)
    }
    console.log(login.data)

    function makeAppointment(event) {
        event.preventDefault()
        navigation.navigate('MakeAppointment')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Antrean</Text>
            </View>
            {coba.length > 0 && 
                <View>
                    <View style={ styles.contentCard }>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>antrian sekarang</Text>
                    </View>
                    <View style={ styles.contentCard }>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>antrian saya</Text>
                    </View>
                </View>
            }
            {coba.length == 0 && 
                <TouchableOpacity onPress={makeAppointment} style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <View>
                        <Text style={{ ...styles.buttonText, color: 'white' }}>Make Appointment</Text>
                    </View>
                </TouchableOpacity>
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
        backgroundColor: '#e66767',
        height: 80,
        alignItems: 'center',
        paddingTop: 40
    },
    contentCard: {
        marginHorizontal: 20,
        marginTop: 50,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize:20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        marginTop: 30,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
})
