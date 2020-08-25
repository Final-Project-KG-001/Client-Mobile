import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import client, { IS_LOGIN } from '../config/apolloClient'

export default function Admin({ navigation }) {
    function toQRScan(event) {
        event.preventDefault();
        navigation.navigate("QRCodeScan");
    }
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Admin</Text>
            </View>
            <View>
                <TouchableOpacity
                onPress={toQRScan}
                style={{ ...styles.button, backgroundColor: "blue" }}
                >
                <Text style={{ ...styles.buttonText, color: "white" }}>Scan QR Code</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={{ ...styles.button }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
    button: {
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    }
})

