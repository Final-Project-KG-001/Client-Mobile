import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'

export default function Home() {
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Antrean</Text>
            </View>
            <ScrollView style={{flex:1}}>
                <View style={ styles.contentCard }>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>sdadwdad</Text>
                </View>
                <View style={ styles.contentCard }>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>sdadwdad</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
      flex: 1,
      backgroundColor: '#CEECF5'
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'lightskyblue',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentCard: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 50,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
