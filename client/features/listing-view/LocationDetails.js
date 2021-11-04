import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import UpAndDownVote from './UpAndDownVote'
import { Text } from 'react-native-elements';

const locationDetails = {
  id: 2,
  title: "The Anchored Inn",
  description: "A pirate themed dive bar - cheap drinks by NYC standards, decent food, here are a few more words",
  address: "57 Waterbury Street, Brooklyn, NY 11206",
  upvotes: 12830,
  downvotes: 2000
}

const LocationDetails = (props) => {
  console.log('loc details props', props)
  return (
    <View style={[styles.container, styles.box, styles.row]}>
      <View style={[styles.locationDetailContainer]}>
        <Text h4>
          {props.data.params.title}
        </Text>
        <Text>
          {props.data.params.address + ' ' + props.data.params.city}
        </Text>
      </View>

      <View style={[styles.locationStats]}>
        <UpAndDownVote 
          score={props.data.params.score}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 4,
    backgroundColor: 'aliceblue'
  },
  locationDetailContainer: {
    flex: 1 / 2,
    width: 'auto'
  },
  locationStats: {
    flex: 1 / 2,
    width: 'auto'
  },
  box: {
    width: '100%',
    height: 10
  },
  debug: {
    borderStyle: 'dotted',
    borderRadius: 1,
    borderWidth: 10,
    borderColor: 'red'
  },
  debug1: {
    borderStyle: 'dotted',
    borderRadius: 1,
    borderWidth: 10,
    borderColor: 'blue'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default LocationDetails
