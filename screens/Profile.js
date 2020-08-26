import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useQuery } from '@apollo/client'
import client, { IS_LOGIN, LOCAL_USER } from '../config/apolloClient'

import DetailProfile from '../components/DetailProfile'
import FormEditProfile from '../components/FormEditProfile'
import QRComponent from '../components/QRComponent'

export default function Profile({ navigation }) {
    const { loading, error, data } = useQuery(LOCAL_USER)
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
                    email: data.localUser.email
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

    return (
        <View style={ styles.container }>
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
                <View>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.localUser.name}</Text>
                    </View>
                    <View style={{ marginTop: 40, marginHorizontal: 10 }}>
                        <Image source={require('../assets/dummy.png')} style={{
                            height: 80, width: 80, borderRadius: 40, borderColor: 'white', borderWidth: 3
                        }}/>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={detail} style={{ ...styles.buttonTop }}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', color: '#e66767' }}>Detail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={edit} style={{ ...styles.buttonTop }}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', color: '#e66767' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={QR} style={{ ...styles.buttonTop }}>
                                <Text style={{ fontSize:20, fontWeight: 'bold', color: '#e66767' }}>QR</Text>
                            </TouchableOpacity>
                        </View>
                        { showDetail && <DetailProfile user={data.localUser} logout={logout}/> }
                        { showForm && <FormEditProfile user={data.localUser} updateuser={updateuser}/> }
                        { showQR && <QRComponent user={data.localUser}/> }
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#eae7dc',
        height: 80,
        paddingTop: 40,
        paddingLeft: 100
    },
    buttonTop: {
        flex: 1,
        backgroundColor: '#c8d5b9',
        height: 40,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
})
