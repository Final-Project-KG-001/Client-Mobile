import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { useQuery, useMutation, gql } from '@apollo/client'
import { IS_LOGIN } from '../config/apolloClient'
import { Picker } from 'react-native-picker-dropdown'

const ADD_APPOINTMENT = gql`
    mutation AddAppointment($doctorId:ID, $queueNumber:Int, $access_token:String) {
        addAppointment(doctorId: $doctorId, queueNumber:$queueNumber, access_token:$access_token) {
            message
        }
    }
`


const GET_DATA = gql`
  query GetData($access_token: String) {
    appointments(access_token: $access_token) {
      _id
      userId
      doctorId
      queueNumber
      status
      createdAt
      doctor {
        name
        polyclinic
      }
      user {
        name
      }
    }
    doctors(access_token: $access_token) {
        _id
        name
        polyclinic
    }
  }
`

export default function MakeAppointment({ navigation }) {
    state = {
        language: 'javascript',
    };
    const [ itemValue, setItemValue ] = useState('Pilih dokter/poli:')
    const isLogin = useQuery(IS_LOGIN)
    const { loading, error, data } = useQuery(GET_DATA, {
        variables: { access_token: isLogin.data.isLogin.token },
    })
    const [ addAppointment, res ] = useMutation(ADD_APPOINTMENT)

    async function submit() {
        try {
            const sortByPoly = data.appointments.filter(x => (x.doctor[ 0 ].polyclinic === itemValue.polyclinic))
            console.log('ini data login - ', isLogin.data.isLogin.token)
            console.log('ini sort by - ', sortByPoly.length + 1)
            console.log('ini doctor id - ', itemValue._id)
            if (sortByPoly.length > 0) {
                await addAppointment({
                    variables: {
                        doctorId: itemValue._id,
                        queueNumber: Number(sortByPoly.length + 1),
                        access_token: isLogin.data.isLogin.token
                    },
                    refetchQueries: [ "GetAppointments" ]
                })
                navigation.navigate('Homepage')
            } else {
                await addAppointment({
                    variables: {
                        doctorId: itemValue._id,
                        queueNumber: Number(1),
                        access_token: isLogin.data.isLogin.token
                    },
                    refetchQueries: [ "GetAppointments" ]
                })
                navigation.navigate('Homepage')
            }
        } catch (err) {
            console.log("ini errorrr", err)
        }
    }

    return (
        <SafeAreaView>
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ { fontSize: 20, fontWeight: 'bold' } }>Make Appointment</Text>
                </View>
                { loading &&
                    <View>
                        <Text>loading</Text>
                    </View>
                }
                { error &&
                    <View>
                        <Text>error</Text>
                    </View>
                }
                { data &&
                    <View style={ { paddingHorizontal: 20, paddingTop: 30 } }>
                        <Text style={ { fontSize: 20, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' } }>Buat appointment baru :</Text>
                        <Picker
                            selectedValue={ itemValue }
                            style={ { height: 50, backgroundColor: 'white' } }
                            onValueChange={ (value) => setItemValue(value) }
                            mode="dropdown"
                        >
                            {
                                data.doctors.map(doctor => (
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
        </SafeAreaView>
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
