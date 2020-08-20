import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function DoctorCard() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/dummy.png')} style={{
                position: 'absolute', flex: 1, height: 60, width: 60, borderRadius: 40, borderColor: 'white', borderWidth: 3, margin: 6
            }}/>
            <Text style={{ marginLeft: 70, marginTop: 7, fontSize: 20, fontWeight: 'bold' }}>sdadwdad</Text>
            <Text style={{ marginLeft: 70 }}>spesialist</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 15,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 20
    }
})
