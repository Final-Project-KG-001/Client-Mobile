import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function FormEditProfile() {
    return (
        <View style={ styles.contentCard }>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>tab1</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>tab2</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>tab3</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contentCard: {
        marginTop: 20,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        paddingLeft: 20
    }
})
