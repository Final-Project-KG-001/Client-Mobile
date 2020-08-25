import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery, gql, useMutation } from '@apollo/client'
import { GET_DOCTORS, GET_APPOINTMENTS } from '../config/apolloClient'
import { Picker } from 'react-native-picker-dropdown'

const ADD_APPOINTMENT = gql`
    mutation AddAppointment($doctorId:ID, $queueNumber:Int) {
        addAppointment(doctorId: $doctorId, queueNumber:$queueNumber) {
            message
        }
    }
`

export default function MakeAppointment({ navigation }) {
    state = {
        language: 'javascript',
    };
    const [ itemValue, setItemValue ] = useState('Pilih dokter/poli:')

    const doctors = useQuery(GET_DOCTORS)
    const appointments = useQuery(GET_APPOINTMENTS)
    const [ addAppointment, res ] = useMutation(ADD_APPOINTMENT)

    async function submit() {
        try {
            const sortByPoly = appointments.data.appointments.filter(x => (x.doctor[0].polyclinic === itemValue.polyclinic))
            // console.log(sortByPoly)
            if (sortByPoly.length > 0) {
                // console.log('jalan yang ada', sortByPoly.length)
                // console.log(Number(sortByPoly.length + 1), itemValue._id)
                await addAppointment({
                    variables: {
                        doctorId: itemValue._id,
                        queueNumber: Number(sortByPoly.length + 1)
                    },
                    refetchQueries: [ "GetAppointments" ]
                })
                console.log("ini berhasilll=================", res)
                navigation.navigate('Homepage')
            } else {
                // console.log('jalan yang ga ada')
                await addAppointment({
                    variables: {
                        doctorId: itemValue._id,
                        queueNumber: Number(1)
                    },
                    refetchQueries: [ "GetAppointments" ]
                })
                console.log("ini berhasilll=================", res)
                navigation.navigate('Homepage')
            }
        } catch (err) {
            console.log("ini errorrr", err.message)
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Text style={ { fontSize: 20, fontWeight: 'bold' } }>Make Appointment</Text>
            </View>
            { doctors.data &&
                <View style={ { paddingHorizontal: 20, paddingTop: 30 } }>
                    <Text style={ { fontSize: 20, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' } }>Buat appointment baru :</Text>
                    <Picker
                        selectedValue={ itemValue }
                        style={ { height: 50, backgroundColor: 'white' } }
                        onValueChange={ (value) => setItemValue(value) }
                        mode="dropdown"
                    >
                        {
                            doctors.data.doctors.map(doctor => (
                                <Picker.Item key={ doctor._id } label={ `${ doctor.name } - ${ doctor.polyclinic }` } value={ doctor } />
                            ))
                        }
                    </Picker>
                    <TouchableOpacity onPress={ submit } style={ { ...styles.button, backgroundColor: 'blue' } }>
                        <Text style={ { ...styles.buttonText, color: 'white' } }>Submit</Text>
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
        fontSize: 20,
        fontWeight: 'bold'
    }
})
