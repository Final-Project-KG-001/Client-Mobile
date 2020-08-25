import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import client, { IS_LOGIN, LOCAL_USER, GET_USERS } from '../config/apolloClient'

import DetailProfile from '../components/DetailProfile'
import FormEditProfile from '../components/FormEditProfile'
import QRComponent from '../components/QRComponent'

export default function Profile({ navigation }) {
    const [ userLoginData, setUserLoginData ] = useState("")
    const isLogin = useQuery(IS_LOGIN)
    const users = useQuery(GET_USERS, {
        variables: { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDQ1ZGMzMTIxZjkwZjAxYWNjNDdlZSIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTgzNjk3ODZ9.rrF50fYJwJyXE9GeZSIAaDyvqprw0GG3YymtM4mv3XE" },
    })
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(true);
    const [showQR, setShowQR] = useState(false);

    function logout(event) {
        event.preventDefault()
        client.readQuery({
            query: IS_LOGIN
        })
        client.writeQuery({
            query: IS_LOGIN,
            data: {
                isLogin: {
                    token: "",
                    email: ""
                }
            }
        })
        navigation.navigate('LandingPage')
    }

    function updateuser() {
        setShowDetail(true);
        setShowQR(false);
        setShowForm(false);
    }

    function edit() {
        setShowForm(true);
        setShowDetail(false);
        setShowQR(false);
    }
    function QR() {
        setShowQR(true);
        setShowForm(false);
        setShowDetail(false);
    }
    function detail() {
        setShowDetail(true);
        setShowQR(false);
        setShowForm(false);
    }
    useEffect(() => {
        if(users.data) {
            const findUser = users.data.users.find(user => (
                user.email === isLogin.data.isLogin.email
            ))
            if (findUser) {
                console.log(findUser)
                setUserLoginData(findUser)
            }
        }
    }, [])

    console.log(userLoginData)

    return (
        <View style={ styles.container }>
            { isLogin.loading && users.loading && 
                <View>
                    <Text>loading</Text>
                </View>
            }
            { isLogin.error && users.error && 
                <View>
                    <Text>error</Text>
                </View>
            }
            { userLoginData && 
                <View>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userLoginData.name}</Text>
                    </View>
                    <View style={{ marginTop: 40, marginHorizontal: 10 }}>
                        <Image source={require('../assets/dummy.png')} style={{
                            height: 80, width: 80, borderRadius: 40, borderColor: 'white', borderWidth: 3
                        }}/>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={detail} style={{ ...styles.buttonTop }}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Detail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={edit} style={{ ...styles.buttonTop }}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={QR} style={{ ...styles.buttonTop }}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>QR</Text>
                            </TouchableOpacity>
                        </View>
                        { showDetail && <DetailProfile user={userLoginData} logout={logout}/> }
                        { showForm && <FormEditProfile user={userLoginData} updateuser={updateuser}/> }
                        { showQR && <QRComponent user={userLoginData}/> }
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcccc'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#e66767',
        height: 80,
        paddingTop: 40,
        paddingLeft: 100
    },
    buttonTop: {
        flex: 1,
        backgroundColor: '#eb4d4b',
        height: 40,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
})
