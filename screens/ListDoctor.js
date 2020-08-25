import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { GET_DOCTORS, IS_LOGIN } from '../config/apolloClient'
import DoctorCard from '../components/DoctorCard'

export default function ListDoctor() {
    const isLogin = useQuery(IS_LOGIN)
    const { loading, error, data } = useQuery(GET_DOCTORS, {
        variables: { access_token: isLogin.data.isLogin.token },
    })

    return (
        <View style={ styles.container }>
            <View>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Doctor List</Text>
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