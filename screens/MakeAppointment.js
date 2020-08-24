import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native'
import { useQuery, gql, useMutation } from '@apollo/client'
import { IS_LOGIN, GET_DOCTORS } from '../config/apolloClient'

const ADD_APPOINTMENT = gql`
    mutation AddAppointment($doctorId:ID, $queueNumber:Int) {
        addAppointment(doctorId: $doctorId, queueNumber:$queueNumber) {
            message
        }
    }
`

export default function MakeAppointment({ navigation }) {
    const [itemValue, setItemValue] = useState('')

    const doctors = useQuery(GET_DOCTORS)
    const isLogin = useQuery(IS_LOGIN)
    const [AddAppointment, res] = useMutation(ADD_APPOINTMENT)

    console.log(doctors.data)

    async function submit() {
        try {
            await AddAppointment({
                variables: {
                    doctorId: itemValue,
                    queueNumber: Number(3)
                }
            })
            console.log(res)
            navigation.navigate('Home', { appointment: true })
        } catch(err) {
            console.log(err)
        }
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
                            doctors.data.doctors.map(doctor => (
                                <Picker.Item key={doctor._id} label={`dr. ${doctor.name} - ${doctor.polyclinic}`} value={doctor._id} />
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
