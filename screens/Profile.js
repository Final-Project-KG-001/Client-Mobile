import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'

export default function Profile() {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 40 }}>Customer Name</Text>
            </View>
            <ScrollView style={{flex:1}}>
                <View style={{ marginTop: 40, marginLeft: 10 }}>
                    <Image source={require('../assets/dummy.png')} style={{
                        flex: 1, height: 80, width: 80, borderRadius: 40, borderColor: 'white', borderWidth: 3
                    }}/>
                </View>
                <View style={ styles.contentCard }>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>sdadwdad</Text>
                </View>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: 'blue' }}>
                    <Text style={{ fontSize:20, fontWeight: 'bold', color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'lightskyblue',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentCard: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
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
})
