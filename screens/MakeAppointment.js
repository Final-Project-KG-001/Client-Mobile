import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native'
import { useQuery } from '@apollo/client'
import client, { LOGIN, GET_APPOINTMENT, GET_DOCTORS } from '../config/apolloClient'

export default function MakeAppointment({ navigation }) {
    const [itemValue, setItemValue] = useState('')

    const login = useQuery(LOGIN)
    const doctors = useQuery(GET_DOCTORS)

    function submit() {
        const { localAppointment } = client.readQuery({
            query: GET_APPOINTMENT
        })
        client.writeQuery({
            query: GET_APPOINTMENT,
            data: {
                localAppointment: [
                    ...localAppointment,
                    {
                        _id: localAppointment.length + 1,
                        queueNumber: localAppointment.length + 1,
                        status: "waiting",
                        user: {
                          _id: 3,
                          name: "dummy",
                          email: login.data.isLogin.email
                        },
                        doctor: itemValue
                      }
                ]
            }
        })
        navigation.navigate('Home', { appointment: true })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Make Appointment</Text>
            </View>
            { doctors.data &&
                <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>Select Docter or Poli</Text>
                    <Picker
                        selectedValue={itemValue}
                        style={{ height: 50, backgroundColor: 'white' }}
                        onValueChange={(value) => setItemValue(value)}
                    >
                        {
                            doctors.data.localDoctors.map(doctor => (
                                <Picker.Item key={doctor._id} label={`dr. ${doctor.name} - ${doctor.polyclinic}`} value={doctor} />
                            ))
                        }
                    </Picker>
                    <TouchableOpacity onPress={submit} style={{ ...styles.button, backgroundColor: 'blue' }}>
                        <Text style={{ ...styles.buttonText, color: 'white' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffcccc',
    },
    header: {
        backgroundColor: '#e66767',
        height: 80,
        alignItems: 'center',
        paddingTop: 40
    },
    contentCard: {
        marginHorizontal: 20,
        marginTop: 50,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        marginTop: 30,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    buttonText: {
        fontSize:20,
        fontWeight: 'bold'
    }
})
