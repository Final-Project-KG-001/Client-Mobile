import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import DatePicker from 'react-native-datepicker'

const REGISTER = gql`
    mutation Register($name:String, $dob:String, $email:String, $password:String, $phoneNumber:String) {
        registerUser(name: $name, dob: $dob, email: $email, password: $password, phoneNumber: $phoneNumber) {
            message
        }
    }
`

export default function Register({ navigation }) {
    const [ error, setError ] = useState({})
    const [ name, setName ] = useState('')
    const [ dob, setDob ] = useState(new Date())
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')

    const [ registerUser, result ] = useMutation(REGISTER)

    async function register(event) {
        // event.preventDefault()
        try {
            let phone = null
            if (phoneNumber.length > 3) {
                const firstNumber = phoneNumber.slice(0, 2)
                if (phoneNumber[ 0 ] === '0') {
                    phone = '62' + phoneNumber.slice(1, phoneNumber.length)
                } else if(firstNumber === '62') {
                    phone = phoneNumber
                } else {
                    phone = '62' + phoneNumber
                }
            }
            if (name == '' || email == '' || password == '' || phoneNumber == '') {
                setError({ message: 'Any field cannot be empty!' })
            } else {
                setError({})
            }
            if (!error.message) {
                await registerUser({
                    variables: {
                        name: name,
                        dob: dob,
                        email: email,
                        password: password,
                        phoneNumber: phone
                    }
                })
                navigation.navigate('Login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.div_register }>
                <Text style={ { fontWeight: 'bold', fontSize: 30, alignSelf: 'center', marginBottom: 5, color: "#3b6978" } }>Register</Text>
                <TextInput onChangeText={ (text) => setName(text) } placeholder="Your Name" style={ styles.textInput } placeholderTextColor="#838383" />
                {/* <Text style={ { marginLeft: 30, color: "#3b6978" } }>Date Birth</Text> */ }
                <DatePicker
                    style={ { ...styles.textInput, alignSelf: 'center', width: 310, borderRadius: 25, backgroundColor: "white" } }
                    date={ dob }
                    mode="date"
                    placeholder="Date of Birth"
                    format="YYYY-M-D"
                    maxDate={ new Date() }
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={ {
                        dateIcon: {
                            position: 'relative',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                            marginRight: 20,
                            marginBottom: 10
                        },
                        dateInput: {
                            marginLeft: 10,
                            alignItems: "flex-start",
                            outLine: "none",
                            borderColor: "white",
                            height: 35,
                        }
                        // ... You can check the source to find the other keys.
                    } }
                    onDateChange={ (date) => { setDob(date) } }
                />
                {/* <TextInput onChangeText={ (text) => setDob(text) } placeholder="Date of Birth" style={ styles.textInput } placeholderTextColor="#838383">
                </TextInput> */}
                <TextInput onChangeText={ (text) => setEmail(text) } placeholder="Email" style={ styles.textInput } placeholderTextColor="#838383" />
                <TextInput secureTextEntry={ true } onChangeText={ (text) => setPassword(text) } placeholder="Password" style={ styles.textInput } placeholderTextColor="#838383" />
                <TextInput onChangeText={ (text) => setPhoneNumber(text) } keyboardType = 'number-pad' placeholder="Phone Number" style={ styles.textInput } placeholderTextColor="#838383" />
                { error && <Text style={ { alignSelf: "center", color: "red", margin: 10 } }>{ error.message }</Text> }
                <TouchableOpacity onPress={ register } style={ { ...styles.button, backgroundColor: '#ea8685' } }>
                    <Text style={ { ...styles.buttonText, color: 'white' } }>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#eae7dc",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#dee3e2",
    },
    div_register: {
        height: 400,
        width: 350,
        display: "flex",
        justifyContent: "center",
        // shadowColor: "#6e6d6d",
        // shadowOffset: {
        //     width: 15,
        //     height: 15
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // backgroundColor: "#dee3e2",
    },
    button: {
        height: 40,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginBottom: 30,
        marginTop: 10,
        shadowColor: "#6e6d6d",
        shadowOffset: {
            width: 8,
            height: 8
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    textInput: {
        // backgroundColor: '#465881',
        height: 40,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        backgroundColor: "white",
        shadowColor: "#6e6d6d",
        shadowOffset: {
            width: 8,
            height: 8
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }
});