import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function DoctorCard({ doctor }) {
    return (
        <View>
            <View style={ styles.container }>
                <Image source={{ uri: 'https://asset.kompas.com/crops/nO1skkIdLelqzqC3fEIOFQpxdUo=/338x0:1850x756/750x500/data/photo/2019/05/07/823404649.jpg' }} style={ {
                    position: 'absolute', flex: 1, height: 85, width: 85, borderRadius: 40, borderColor: 'white', borderWidth: 3, margin: 6
                } } />
                <Text style={ { marginLeft: 100, marginTop: 7, fontSize: 20, fontWeight: 'bold' } }>Dr. Fatimah Hidayani</Text>
                <Text style={ { marginLeft: 100 } }>Dental</Text>
            </View>
            <View style={ styles.container }>
                <Image source={{ uri: 'https://v.fastcdn.co/u/2fdba1a6/23428726-0-Assoc.-Prof.-Dr.-Han.jpg' }} style={ {
                    position: 'absolute', flex: 1, height: 85, width: 85, borderRadius: 40, borderColor: 'white', borderWidth: 3, margin: 6
                } } />
                <Text style={ { marginLeft: 100, marginTop: 7, fontSize: 20, fontWeight: 'bold' } }>Dr. Hary Tungadi</Text>
                <Text style={ { marginLeft: 100 } }> Umum</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 15,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 20
    }
})
