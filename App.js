import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import ListingView from './components/ListingView'

export default function App () {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
      <ListingView />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
