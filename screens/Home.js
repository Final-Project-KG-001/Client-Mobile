import React, {useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { LOGIN, GET_APPOINTMENT } from '../config/apolloClient'

export default function Home({ route, navigation }) {
    // const login = useQuery(LOGIN)
    // const appointments = useQuery(GET_APPOINTMENT)
    // let userQueue = null
    // let onProcessQueue = null
    // let queueByPoliclinic = null
    
    // if ( login.data && appointments.data ) {
    //     userQueue = appointments.data.localAppointment.filter(x => x.user.email === login.data.isLogin.email)
    //     if (userQueue.length > 0) {
    //         queueByPoliclinic = appointments.data.localAppointment.filter(x => x.doctor.polyclinic === userQueue[0].doctor.polyclinic)
    //         onProcessQueue = queueByPoliclinic.filter(x => x.status === 'onProcess')
    //     }
    // }
    // console.log(userQueue)
    // console.log(onProcessQueue)

    // function makeAppointment(event) {
    //     event.preventDefault()
    //     navigation.navigate('MakeAppointment')
    // }
    
    // useEffect(() => {
    //     if (appointments.data) {
    //         appointments.refetch()
    //     }
    // })

    // if (userQueue.length > 0 && userQueue[0].status !== "done") {
    //     return (
    //         <View style={styles.container}>
    //             <View style={styles.header}>
    //                 <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Queue Info</Text>
    //             </View>
    //             <View>
    //                 <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>thank you for waiting</Text>
    //                 <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Here's your position in the queue</Text>
    //                 <View style={{ ...styles.numberCard, backgroundColor: "black" }}>
    //                     <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{userQueue[0].queueNumber - onProcessQueue[0].queueNumber}</Text>
    //                     <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>Position</Text>
    //                 </View>
    //                 <View style={ styles.contentCard }>
    //                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Now Serving</Text>
    //                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{onProcessQueue[0].queueNumber}</Text>
    //                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{onProcessQueue[0].doctor.polyclinic}</Text>
    //                 </View>
    //                 <View style={ styles.contentCard }>
    //                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Number</Text>
    //                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userQueue[0].queueNumber}</Text>
    //                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userQueue[0].doctor.polyclinic}</Text>
    //                 </View>
    //             </View>
    //         </View>
    //     )
    // } else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Queue Info</Text>
                </View>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <View>
                        <Text style={{ ...styles.buttonText, color: 'white' }}>Make Appointment</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    //  }
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
    },
    numberCard: {
        marginHorizontal: 20,
        marginTop: 10,
        height: 80,
        width: 80,
        backgroundColor: 'white',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    contentCard: {
        marginHorizontal: 20,
        marginTop: 10,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize:20,
        fontWeight: 'bold'
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
    }
})
