import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gql, useQuery, useSubscription } from '@apollo/client'
import client, { IS_LOGIN, LOCAL_USER, GET_USERS } from "../config/apolloClient"

const GET_APPOINTMENTS = gql`
  query GetAppointments ($access_token:String) {
    appointments (access_token: $access_token) {
      _id
      userId
      queueNumber
      status
      doctorId
      doctor{
        name
        polyclinic
        _id
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
    const [ userLoginData, setUserLoginData ] = useState("")
    const [ hasQueueNumber, setHasQueueNumber ] = useState(false)
    const [ currentQueue, setCurrentQueue ] = useState(0)
    const [ poli, setPoli ] = useState("")
    const [ show, setShow ] = useState(true)

    const isLogin = useQuery(IS_LOGIN)
    const users = useQuery(GET_USERS, {
        variables: { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDQ1ZGMzMTIxZjkwZjAxYWNjNDdlZSIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTg0NDQwMDF9.Mn8pujByONz4RZwRcshMzeFRhViVMrFnKhuWv5xPr9Y" },
    })

    const { loading, error, data, subscribeToMore } = useQuery(GET_APPOINTMENTS, {
        variables: { access_token: isLogin.data.isLogin.token },
    })

    useEffect(() => {
        if (!loading && data) {
            const findQuery = data.appointments.find(appointment => (
                appointment.user && appointment.user[ 0 ].email === isLogin.data.isLogin.email && appointment.status !== "done"
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
        }
        if (users.data) {
            const user = users.data.users.find(x => (x.email === isLogin.data.isLogin.email))
            client.readQuery({
                query: LOCAL_USER
            })
            client.writeQuery({
                query: LOCAL_USER,
                data: {
                    localUser: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        dob: user.dob,
                        phoneNumber: user.phoneNumber,
                        role: user.role
                    }
                }
            })
        }
    }, [ data, loading ])

    useEffect(() => {
        subscribeToMore({
            document: SUBSCRIBE_NEW_APPOINTMENT,
            updateQuery(prev, { subscriptionData }) {
                if (!subscriptionData.data) {
                    return prev;
                }
                const newAppointment = subscriptionData.data.newAppointment
                return {
                    ...prev,
                    appointments: [ ...prev.appointments, newAppointment ],
                };
            },
        })
    }, [])

    // if (userLoginData.queueNumber === currentQueue && userLoginData.status === "on process") {

    //         setInterval(() => {

    //             setShow(!show)
    //         }, 1000,)

    // }


    function makeAppointment(event) {
        event.preventDefault()
        navigation.navigate('MakeAppointment')
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Text style={ { fontSize: 15, fontWeight: 'bold' } }>QMe Board</Text>
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
                <View>
                    { !hasQueueNumber ?
                        <>
                            {/* <Text style={ { fontSize: 18, color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', marginTop: 30 } }>Hello {isLogin.data.isLogin} !</Text> */ }
                            <Text style={ { fontSize: 18, color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', marginTop: 30 } }>You don't have any appointment today</Text>
                            <Text style={ { color: "#838383", fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', textAlign: "center", width: 300 } }>Please make a new appointment to consult with our doctors !</Text>
                            <TouchableOpacity style={ { ...styles.button, backgroundColor: '#ea8685' } }>
                                <Text onPress={ makeAppointment } style={ { ...styles.buttonText, color: 'white' } }>Make Appointment</Text>
                            </TouchableOpacity>
                        </> :
                        <View style={ { display: "flex", alignItems: "center" } }>
                            <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 30, color: "#838383" } }>Hello, { userLoginData.user[ 0 ].name } !</Text>
                            <Text style={ { fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 10, color: "#838383" } }>Thank you for waiting</Text>


                            {
                                userLoginData.queueNumber === currentQueue && userLoginData.status === "on process" ?
                                    <View style={ styles.body_indo }>
                                        <Text style={ { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, color: "#557571" } }>It's your turn now </Text>
                                        <Text style={ { marginTop: 20, fontSize: 15, width: 350, textAlign: "center", marginBottom: 20 } }>Please enter the room for { userLoginData.doctor[ 0 ].polyclinic == "gigi" ? "Dental" : "General" } polyclinic</Text>

                                        <View style={ { alignItems: "center" } }>
                                            <Text style={ { color: "#e66767", width: 200, height: 30, textAlign: "center", fontSize: 18 } }>Your queue number</Text>

                                            {
                                                show ?

                                                    <View style={ styles.contentCard }>

                                                        {
                                                            userLoginData.doctor[ 0 ].polyclinic === "umum" ?
                                                                <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>A { userLoginData.queueNumber }</Text>
                                                                :
                                                                <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>B { userLoginData.queueNumber }</Text>
                                                        }
                                                    </View> :
                                                    <View style={ styles.contentCard }></View>

                                            }
                                        </View>
                                        <Text style={ { marginTop: 20 } }>Get well soon :)</Text>
                                        <Text style={ { marginTop: 10 } }>Good luck</Text>
                                    </View> :
                                    <>


                                        <Text style={ { fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginTop: 15, color: "#d8d3cd" } }>Current queue information</Text>
                                        <View style={ styles.body_indo }>

                                            <View style={ { display: "flex", marginTop: 20, alignItems: "center" } }>
                                                <View style={ { marginBottom: 20 } }>
                                                    <Text style={ { fontSize: 30, color: "#2d4059", fontWeight: "bold" } }>Polyclinic - { userLoginData.doctor[ 0 ].polyclinic == "gigi" ? "Dental" : "General" }</Text>
                                                </View>
                                                <View style={ { display: "flex", flexDirection: "row" } }>

                                                    <View style={ { alignItems: "center" } }>
                                                        <Text style={ { color: "#e66767", width: 150, height: 30, textAlign: "center", fontSize: 18 } }>Your Queue Number</Text>
                                                        <View style={ styles.contentCard }>

                                                            {
                                                                userLoginData.doctor[ 0 ].polyclinic === "umum" ? <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>A { userLoginData.queueNumber }</Text> : <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>B { userLoginData.queueNumber }</Text>
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={ { alignItems: "center" } }>
                                                        <Text style={ { color: "#e66767", width: 150, height: 30, textAlign: "center", fontSize: 18 } }>Current Queue</Text>
                                                        <View style={ styles.contentCard }>
                                                            {
                                                                userLoginData.doctor[ 0 ].polyclinic === "umum" ? <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>A { currentQueue }</Text> : <Text style={ { fontSize: 50, fontWeight: 'bold', color: "#e66767" } }>B { currentQueue }</Text>
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={ styles.bottom_info }>

                                                <Text style={ { fontSize: 20, fontWeight: 'bold', color: "#838383" } }>{ userLoginData.doctor[ 0 ].polyclinic == "gigi" ? "Dental" : "General" } Polyclinic</Text>

                                                <Text style={ { fontSize: 20, fontWeight: 'bold', color: "#838383" } }>{ userLoginData.doctor[ 0 ].name }</Text>
                                            </View>
                                        </View>
                                    </>
                            }

                        </View>
                    }
                </View>
            }
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
        marginTop: 60,
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
        height: 400,
        width: 400
    },
    bottom_info: {
        marginTop: 30
    }
})
