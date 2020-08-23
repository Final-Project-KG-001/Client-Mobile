import React,{useEffect} from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { LOGIN } from '../config/apolloClient'

export default function LandingPage({ navigation }) {
    const login = useQuery(LOGIN)

    function toDashboard(event) {
        event.preventDefault()
        navigation.navigate('Dashboard')
    }

    function toLoginPage(event) {
        event.preventDefault()
        navigation.navigate('Login')
    }

    if (login) {
        login.refetch()
    }
    console.log(login.data)

    return (
        <View style={ styles.container }>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground source={require('../assets/Rainbow-Pattern.jpg')} style={styles.imgBackground}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Landing Page</Text>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>lorem ipsum quia dolor sit amet, consectetur, adipisci velit...dsdwaddsdwd</Text>
                </ImageBackground>
            </View>
            { login.data && <View>
                {login.data.login.isLogin &&
                    <TouchableOpacity onPress={toDashboard} style={{ ...styles.button, backgroundColor: 'blue' }}>
                        <Text style={{ ...styles.buttonText, color: 'white' }}>Click to Start</Text>
                    </TouchableOpacity>
                }
                {!login.data.login.isLogin &&
                    <TouchableOpacity onPress={toLoginPage} style={{ ...styles.button, backgroundColor: 'blue' }}>
                        <Text style={{ ...styles.buttonText, color: 'white' }}>Click to Start</Text>
                    </TouchableOpacity>
                }
            </View> }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    imgBackground: {
        flex: 1,
        paddingTop: 300,
        alignItems: 'center'
    },
    button: {
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 30
    },
    buttonText: {
        fontSize:20,
        fontWeight: 'bold'
    }
});
