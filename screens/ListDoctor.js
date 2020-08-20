import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

import DoctorCard from '../components/DoctorCard'

export default function ListDoctor() {
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>List Doctor</Text>
            </View>
            <ScrollView style={{flex:1}}>
                <DoctorCard/>
                <DoctorCard/>
                <DoctorCard/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
      flex: 1,
      backgroundColor: '#CEECF5'
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'lightskyblue',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center'
    }
})