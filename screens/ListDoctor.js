import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { GET_DOCTORS } from '../config/apolloClient'
import DoctorCard from '../components/DoctorCard'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ListDoctor() {
    const { loading, error, data } = useQuery(GET_DOCTORS)

    return (
        <SafeAreaView>

            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ { fontSize: 20, fontWeight: 'bold' } }>List Doctors:</Text>
                </View>
                { loading && <Text>loading</Text> }
                { error && <Text>error</Text> }
                { data && <View>
                    {
                        data.doctors.map(doctor => (
                            <DoctorCard key={ doctor._id } doctor={ doctor } />
                        ))
                    }
                </View> }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#eae7dc'
    },
    header: {
        // backgroundColor: '#ea8685',
        height: 70,
        alignItems: 'center',
        paddingTop: 40
    }
})