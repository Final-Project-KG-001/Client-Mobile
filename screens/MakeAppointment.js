import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useQuery, useMutation, gql } from '@apollo/client'
import { IS_LOGIN } from '../config/apolloClient'
// import { Picker } from 'react-native-picker-dropdown'
import { Picker } from 'native-base';

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
        _id
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
    const [ itemValue, setItemValue ] = useState(null)
    const isLogin = useQuery(IS_LOGIN)
    const { loading, error, data } = useQuery(GET_DATA, {
        variables: { access_token: isLogin.data.isLogin.token },
    })

    const [ addAppointment, res ] = useMutation(ADD_APPOINTMENT)
    
    async function submit() {
        try {
            if(itemValue) {
                const sortByPoly = data.appointments.filter(x => (x.doctorId === itemValue))
                if (sortByPoly.length > 0) {
                    await addAppointment({
                        variables: {
                            doctorId: itemValue,
                            queueNumber: Number(sortByPoly.length + 1),
                            access_token: isLogin.data.isLogin.token
                        },
                        refetchQueries: [ "GetAppointments" ]
                    })
                    navigation.navigate('Homepage')
                } else {
                    await addAppointment({
                        variables: {
                            doctorId: itemValue,
                            queueNumber: Number(1),
                            access_token: isLogin.data.isLogin.token,
                        },
                        refetchQueries: [ "GetAppointments" ]
                    })
                    navigation.navigate('Homepage')
                }
            } else {
                const sortByPoly = data.appointments.filter(x => (x.doctorId === data.doctors[0]._id))
                if (sortByPoly.length > 0) {
                    await addAppointment({
                        variables: {
                            doctorId: data.doctors[0]._id,
                            queueNumber: Number(sortByPoly.length + 1),
                            access_token: isLogin.data.isLogin.token
                        },
                        refetchQueries: [ "GetAppointments" ]
                    })
                    navigation.navigate('Homepage')
                } else {
                    await addAppointment({
                        variables: {
                            doctorId: data.doctors[0]._id,
                            queueNumber: Number(1),
                            access_token: isLogin.data.isLogin.token,
                        },
                        refetchQueries: [ "GetAppointments" ]
                    })
                    navigation.navigate('Homepage')
                }
            }
        } catch (err) {
            console.log("ini errorrr", err)
        }
    }

    return (

        <View style={ styles.container }>
            <View style={ styles.header }>
                {/* <Text style={ { fontSize: 20, fontWeight: 'bold' } }>Make Appointment</Text> */ }
            </View>
            { loading &&
                <View>
                    <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Loading..</Text>
                </View>
            }
            { error &&
                <View>
                    <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Oooops... Please Reload Your App</Text>
                </View>
            }
            { data &&
                <View style={ { paddingHorizontal: 20, paddingTop: 30 } }>
                    <Text style={ { fontSize: 18, color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' } }>You don't have any appointment today</Text>
                    <Text style={ { color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', textAlign: "center" } }>Please make a new appointment to consult with our doctors</Text>
                    <Picker
                        placeholder="Klik untuk pilih dokter ..."
                        selectedValue={ itemValue }
                        style={ { height: 50, backgroundColor: 'white', opacity: 0.7, borderWidth: 1, borderColor: 'black', fontSize: 20, width: 325 } }
                        onValueChange={ (value) => setItemValue(value) }
                        mode="dropdown"
                    >
                        {
                            data.doctors.map(doctor => (
                                <Picker.Item key={ doctor._id } label={ `${ doctor.name } - poli ${ doctor.polyclinic }` } value={ doctor._id } />
                            ))
                        }
                    </Picker>
                    <TouchableOpacity onPress={ submit } style={ { ...styles.button, backgroundColor: '#ea8685' } }>
                        <Text style={ { ...styles.buttonText, color: 'white' } }>Add</Text>
                    </TouchableOpacity>
                    <View style={ { alignItems: 'center', padding: 0, marginTop: 40 } }>
                        <Image source={ require('../assets/appointment.png') } style={ styles.picture } />
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: "#eae7dc",
        height: 80,
        alignItems: 'center',
        paddingTop: 40,
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
        height: 45,
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
    },
    picture: {
        width: 300, height: 250, padding: 0, margin: 0
    }
})
