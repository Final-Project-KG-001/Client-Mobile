import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gql, useQuery, useSubscription  } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import { GET_APPOINTMENTS, IS_LOGIN, LOCAL_USER } from "../config/apolloClient"

const GET_DATA = gql`
  query GetData ($access_token:String) {
    appointments (access_token: $access_token) {
      _id
      queueNumber
      status
      doctorId
      doctor{
        name
        polyclinic
      }
      user{
        email
        name
      }
    }
}
`

const SUBSCRIBE_NEW_APPOINTMENT = gql`
  subscription newAppointment {
    newAppointment {
      _id
      userId
      doctorId
      queueNumber
      status
      doctor{
        name
      }
      user{
        email
        name
      }
    }
  }
`;

export default function Home({ navigation }) {
    const isLogin = useQuery(IS_LOGIN)
    const appointments = useQuery(GET_APPOINTMENTS, {
        variables: {
            access_token: isLogin.data.isLogin.token
        }
    })

    const [ userLoginData, setUserLoginData ] = useState("")
    const [ hasQueueNumber, setHasQueueNumber ] = useState(false)
    const [ currentQueue, setCurrentQueue ] = useState(0)
    const [ poli, setPoli ] = useState("")

    const localUser = useQuery(LOCAL_USER, {
        variables: {
            access_token: isLogin.data.isLogin.token
        }
    })
    const { data, subscribeToMore } = useQuery(GET_DATA, {
        variables: { access_token: isLogin.data.isLogin.token },
    })
    const { data: subscription } = useSubscription(SUBSCRIBE_NEW_APPOINTMENT)

    let findOnProcess = null

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIBE_NEW_APPOINTMENT,
            updateQuery(prev, { subscriptionData }) {
                if (!subscriptionData.data) {
                    return prev;
                }

                const newAppointment = subscriptionData.data.newAppointment;

                return {
                    ...prev,
                    dentals: [ ...prev.appointments, newAppointment ],
                };
            },
        })
        if (data) {
            const findQuery = data.appointments.find(appointment => (
                appointment.user[ 0 ].email === localUser.data.localUser.email
            ))
            if (findQuery) {
                const findOnProcess = data.appointments.find(appointment => (

                    appointment.status === "on process" && findQuery.doctor[ 0 ]._id === appointment.doctorId
                ))
                if (findOnProcess) {
                    setCurrentQueue(findOnProcess.queueNumber)
                    setPoli(findOnProcess.doctor[ 0 ].polyclinic)
                }

                setUserLoginData(findQuery)
                setHasQueueNumber(true)
            } else {
                setHasQueueNumber(false)
            }
            console.log(findQuery)

        }
    }, [ subscribeToMore ]);


    // function makeAppointment(event) {
    //     event.preventDefault()
    //     navigation.navigate('MakeAppointment')
    // }

    return (
        <View>
            <Text>dsdadw</Text>
        </View>
        // <View style={ styles.container }>
        //     <View style={styles.header}>
        //         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Queue Info</Text>
        //     </View>
        //     {
        //         !hasQueueNumber ?
        //             <TouchableOpacity style={ { ...styles.button, backgroundColor: 'blue' } }>
        //                 <Text onPress={ makeAppointment } style={ { ...styles.buttonText, color: 'white' } }>Make Appointment</Text>
        //             </TouchableOpacity> :
        //             <View style={ { display: "flex", alignItems: "center" } }>
        //                 <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Hy { userLoginData.user[ 0 ].name }</Text>
        //                 <Text style={ { fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: "#838383" } }>Terima kasih telah menunggu.</Text>
        //                 <Text style={ { fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#d8d3cd" } }>Berikut informasi posisi antrian kamu:</Text>

        //                 <View style={ styles.body_indo }>
        //                     <View style={ { display: "flex", flexDirection: "row", marginTop: 60 } }>
        //                         <View style={ { alignItems: "center" } }>
        //                             <Text style={ { color: "#e66767", width: 150, height: 30, textAlign: "center", fontSize: 18 } }>Antrian kamu</Text>
        //                             <View style={ styles.contentCard }>

        //                                 {
        //                                     poli === "umum" ? <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>A { userLoginData.queueNumber }</Text> : <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>B { userLoginData.queueNumber }</Text>
        //                                 }
        //                             </View>
        //                         </View>
        //                         <View style={ { alignItems: "center" } }>
        //                             <Text style={ { color: "#e66767", width: 150, height: 30, textAlign: "center", fontSize: 18 } }>Antrian sekarang</Text>
        //                             <View style={ styles.contentCard }>
        //                                 {
        //                                     poli === "umum" ? <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>A { currentQueue }</Text> : <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>B { currentQueue }</Text>
        //                                 }
        //                             </View>
        //                         </View>

        //                     </View>

        //                     <View style={ styles.bottom_info }>

        //                         <Text style={ { fontSize: 20, fontWeight: 'bold', color: "#838383" } }>Poliklinik pemeriksaan { poli && poli }</Text>

        //                         <Text style={ { fontSize: 20, fontWeight: 'bold', color: "#838383" } }>oleh  { userLoginData.doctor[ 0 ].name }</Text>
        //                     </View>
        //                 </View>

        //             </View>
        //     }
        // </View>
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
        height: 160,
        width: 160,
        backgroundColor: 'white',
        borderRadius: 7000,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
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
    },
    body_indo: {
        borderRadius: 40,
        marginTop: 40,
        alignItems: "center",
        backgroundColor: "#c8d5b9",
        height: 400
    },
    bottom_info: {
        marginTop: 30
    }
})
