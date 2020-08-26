import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { gql, useMutation, useQuery } from '@apollo/client'
import client, { IS_LOGIN, LOCAL_USER } from '../config/apolloClient'
import DatePicker from 'react-native-datepicker'

const EDIT_USER = gql`
    mutation EditUser($_id: ID, $name: String, $dob: String, $phoneNumber: String, $access_token:String) {
        updateUser(_id: $_id, name: $name, dob: $dob, phoneNumber: $phoneNumber, access_token:$access_token) {
            message
        }
    }
`

export default function FormEditProfile({ user, updateuser }) {
    const [ name, setName ] = useState(user.name)
    const [ dob, setDob ] = useState(user.dob)
    const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber)
    const [ error, setError ] = useState({ message: '' })

    const isLogin = useQuery(IS_LOGIN)
    const [ updateUser, result ] = useMutation(EDIT_USER)

    async function editUser(event) {
        event.preventDefault()
        try {
            let phone = null
            if (phoneNumber.length > 10) {
                setError({})
                const firstNumber = phoneNumber.slice(0, 3)
                if (phoneNumber[ 0 ] === '0' || firstNumber === '+62') {
                    phone = phoneNumber.slice(1, phoneNumber.length)
                } else {
                    phone = '62' + phoneNumber
                }
            } else {
                setError({ message: 'phone number minimal 10 characters' })
            }
            if (!error.message) {
                console.log('jalan engga error')
                await updateUser({
                    variables: {
                        _id: user._id,
                        name: name,
                        dob: dob,
                        phoneNumber: phoneNumber,
                        access_token: isLogin.data.isLogin.token
                    }
                })
                client.readQuery({
                    query: LOCAL_USER
                })
                client.writeQuery({
                    query: LOCAL_USER,
                    data: {
                        localUser: {
                            _id: user._id,
                            name: name,
                            email: user.email,
                            dob: dob,
                            phoneNumber: phoneNumber,
                            role: user.role
                        }
                    },
                    refetchQueries: [ "LocalUser" ]
                })
                updateuser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={ styles.contentCard }>
            <Text style={ { alignSelf: 'center', fontWeight: 'bold', fontSize: 25 } }>Edit Profile</Text>
            <TextInput onChangeText={ (text) => setName(text) } placeholder="Your Name" style={ styles.textInput } placeholderTextColor="black" />
            <Text style={ { marginLeft: 45, marginBottom: 10, marginTop: 20 } }>Date Of Birth</Text>
            <DatePicker
                style={ { alignSelf: 'center', marginBottom: 10, width: 270, borderBottomWidth: 1 } }
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
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36,
                        borderColor: "#eae7dc",
                        marginLeft: 10,
                        alignItems: "flex-start"
                    }
                    // ... You can check the source to find the other keys.
                } }
                onDateChange={ (date) => { setDob(date) } }
            />
            {/* <TextInput onChangeText={(text) => setDob(text)} placeholder="Date of Birth" style={styles.textInput} placeholderTextColor="black"/> */ }
            <TextInput onChangeText={ (text) => setPhoneNumber(text) } placeholder="Phone Number" style={ styles.textInput } placeholderTextColor="black" />
            <TouchableOpacity onPress={ editUser } style={ { ...styles.button, backgroundColor: '#c8d5b9' } }>
                <Text style={ { ...styles.buttonText, color: 'black' } }>Submit</Text>
            </TouchableOpacity>
            { error && <Text style={ { alignSelf: "center", color: "#3b6978" } }>{ error.message }</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        marginBottom: 30
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: '#eae7dc',
        height: 50,
        borderBottomWidth: 1,
        marginHorizontal: 35,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'black'
    },
    contentCard: {
        marginTop: 5,
        height: 400,
        backgroundColor: '#eae7dc',
        borderRadius: 20,
        paddingTop: 20
    }
})
