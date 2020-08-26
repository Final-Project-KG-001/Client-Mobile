import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function DetailProfile({user, logout}) {

    return (
        <View>
            <View style={ styles.contentCard }>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 26 }}>Profile</Text>
                <View style={{ marginTop: 10, marginHorizontal: 30 }}>
                    <Text style={{ fontSize: 15}}>Email</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{user.email}</Text>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 30 }}>
                    <Text style={{ fontSize: 15}}>No Telp</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{user.phoneNumber}</Text>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 30 }}>
                    <Text style={{ fontSize: 15}}>Date of Birth</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{user.dob}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={logout} style={{ ...styles.button }}>
                <Text style={{ fontSize:20, fontWeight: 'bold', color: 'black' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    contentCard: {
        marginTop: 20,
        height: 250,
        backgroundColor: '#eae7dc',
        borderRadius: 20,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#c8d5b9',
        height: 50,
        marginTop: 30,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
})
