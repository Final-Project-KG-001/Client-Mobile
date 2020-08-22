import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native'

export default function MakeAppointment({ navigation }) {
    const [itemValue, setItemValue] = useState('')

    function submit(event) {
        console.log(itemValue)
        navigation.navigate('Home', { appointment: true })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Make Appointment</Text>
            </View>
            <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>Select Docter or Poli</Text>
                <Picker
                    selectedValue={itemValue}
                    style={{ height: 50, backgroundColor: 'white' }}
                    onValueChange={(value) => setItemValue(value)}
                >
                    <Picker.Item label="Umum" value="umum" />
                    <Picker.Item label="THT" value="tht" />
                </Picker>
                <TouchableOpacity onPress={submit} style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <Text style={{ ...styles.buttonText, color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffcccc',
    },
    header: {
        backgroundColor: '#e66767',
        height: 80,
        alignItems: 'center',
        paddingTop: 40
    },
    contentCard: {
        marginHorizontal: 20,
        marginTop: 50,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
    buttonText: {
        fontSize:20,
        fontWeight: 'bold'
    }
})
