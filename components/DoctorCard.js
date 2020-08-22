import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function DoctorCard({ doctor }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/dummy.png')} style={{
                position: 'absolute', flex: 1, height: 60, width: 60, borderRadius: 40, borderColor: 'white', borderWidth: 3, margin: 6
            }}/>
            <Text style={{ marginLeft: 70, marginTop: 7, fontSize: 20, fontWeight: 'bold' }}>dr. {doctor.name}</Text>
            <Text style={{ marginLeft: 70 }}>{doctor.polyclinic}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 15,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 20
    }
})
