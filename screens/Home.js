import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery, gql } from '@apollo/client'

export default function Home({ route, navigation }) {
    function makeAppointment(event) {
        event.preventDefault()
        navigation.navigate('MakeAppointment')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Queue Info</Text>
            </View>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: 'blue' }}>
                <Text onPress={makeAppointment} style={{ ...styles.buttonText, color: 'white' }}>Make Appointment</Text>
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>thank you for waiting</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Here's your position in the queue</Text>
                <View style={{ ...styles.numberCard, backgroundColor: "black" }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>5</Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>Position</Text>
                </View>
                <View style={ styles.contentCard }>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Now Serving</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>3</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>umum</Text>
                </View>
                <View style={ styles.contentCard }>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Number</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>7</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>umum</Text>
                </View>
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
        backgroundColor: '#e66767',
        height: 80,
        alignItems: 'center',
        paddingTop: 40
    },
    numberCard: {
        marginHorizontal: 20,
        marginTop: 10,
        height: 80,
        width: 80,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    contentCard: {
        marginHorizontal: 20,
        marginTop: 10,
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
