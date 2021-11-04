import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import ImageView from './ImageView'

const ListingView = ({props}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageView />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20
  },
  text: {
    fontSize: 42
  }
})

export default ListingView
