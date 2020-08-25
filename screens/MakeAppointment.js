import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery, gql, useMutation } from '@apollo/client'
import { IS_LOGIN, GET_DOCTORS, GET_APPOINTMENTS } from '../config/apolloClient'
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
    const isLogin = useQuery(IS_LOGIN)
    const [ AddAppointment, res ] = useMutation(ADD_APPOINTMENT)

    // console.log(doctors.data)

    async function submit() {
        try {
            await AddAppointment({
                variables: {
                    doctorId: itemValue,
                    queueNumber: Number(3)
                },
                refetchQueries: [ "GetAppointments" ]
            })
            // console.log("ini berhasilll=================", res)
            // navigation.navigate('Home', { appointment: true })
            navigation.navigate('Home', { appointment: true })
        } catch (err) {
            console.log("ini errorrr", err)
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
                                <Picker.Item key={ doctor._id } label={ `${ doctor.name } - ${ doctor.polyclinic }` } value={ doctor._id } />
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
