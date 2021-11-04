import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import ImageView from './ImageView'

const ListingView = ({route}) => {
  // console.log(props)
  console.log('route.params ', route.params)
  return (
    <SafeAreaView style={styles.container}>
      <ImageView 
        data={route.params}
      />
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
