import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { GET_DOCTORS, IS_LOGIN } from '../config/apolloClient'
import DoctorCard from '../components/DoctorCard'

export default function ListDoctor() {

    return (
        <View style={ styles.container }>
            <View>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Doctor List</Text>
                </View>
                <View>
                    <DoctorCard/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex"
    },
    header: {
        backgroundColor: '#eae7dc',
        height: 70,
        alignItems: 'center',
        paddingTop: 40,
        borderRadius: 15,
    }
})