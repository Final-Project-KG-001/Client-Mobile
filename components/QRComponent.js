import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import QRCode from "react-native-qrcode-svg";

export default function QRComponent({user}) {
    return (
        <View style={ styles.contentCard }>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 10 }}>QR Code</Text>
            <QRCode value={user._id} size={250}/>
        </View>
    )
}

const styles = StyleSheet.create({
    contentCard: {
        marginTop: 20,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
