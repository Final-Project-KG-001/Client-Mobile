import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { GET_DOCTORS } from '../config/apolloClient'
import DoctorCard from '../components/DoctorCard'

export default function ListDoctor() {
    const doctors = useQuery(GET_DOCTORS)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>List Doctor</Text>
            </View>
            { doctors.loading && <Text>loading</Text> }
            { doctors.error && <Text>error</Text> }
            { doctors.data && <View>
                {
                    doctors.data.localDoctors.map(doctor => (
                        <DoctorCard key={doctor._id} doctor={doctor}/>
                    ))
                }
            </View> }
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
    }
})