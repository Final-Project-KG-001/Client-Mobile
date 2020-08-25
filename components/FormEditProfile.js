import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import client, { IS_LOGIN, LOCAL_USER, GET_USERS } from '../config/apolloClient'

const EDIT_USER = gql`
    mutation EditUser($_id: ID, $name: String, $dob: String, $phoneNumber: String) {
        updateUser(_id: $_id, name: $name, dob: $dob, phoneNumber: $phoneNumber) {
            message
        }
    }
`

export default function FormEditProfile({user, updateuser}) {
    const [name, setName] = useState(user.name)
    const [dob, setDob] = useState(user.dob)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)

    const [updateUser, result] = useMutation(EDIT_USER)

    async function editUser(event) {
        event.preventDefault()
        try {
            console.log(user, name, dob, phoneNumber)
            await updateUser({
                variables: {
                    _id: user._id,
                    name: name,
                    dob: dob,
                    phoneNumber: phoneNumber
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
            console.log(result.data)
            updateuser()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.contentCard}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 30 }}>Edit Profile</Text>
            <TextInput onChangeText={(text) => setName(text)} placeholder="Your Name" style={styles.textInput} placeholderTextColor="black"/>
            <TextInput onChangeText={(text) => setDob(text)} placeholder="Date of Birth" style={styles.textInput} placeholderTextColor="black"/>
            <TextInput onChangeText={(text) => setPhoneNumber(text)} placeholder="Phone Number" style={styles.textInput} placeholderTextColor="black"/>
            <TouchableOpacity onPress={editUser} style={{ ...styles.button, backgroundColor: 'blue' }}>
                <Text style={{ ...styles.buttonText, color: 'white' }}>Submit</Text>
            </TouchableOpacity>
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
        fontSize:20,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: 'white',
        height: 50,
        borderBottomWidth: 1,
        marginHorizontal: 35,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'black'
    },
    contentCard: {
        marginTop: 20,
        height: 400,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center'
    }
})
