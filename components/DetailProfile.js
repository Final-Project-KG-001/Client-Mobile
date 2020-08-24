import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function DetailProfile({}) {
    return (
        <View style={ styles.contentCard }>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>DATA USER</Text>
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 15}}>Email</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>user email</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 15}}>No Telp</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>user telpon</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentCard: {
        marginTop: 20,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        paddingLeft: 20
    }
})
