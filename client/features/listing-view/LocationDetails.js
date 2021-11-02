import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import UpAndDownVote from './UpAndDownVote'

const LocationDetails = () => {
  return (
    <View style={[styles.container, styles.box, styles.debug, styles.row]}>
      <View style={[styles.locationDetailContainer, styles.debug1]}>
        <Text>
          Location details view
        </Text>
      </View>

      <View style={[styles.locationStats, styles.debug1]}>
        <UpAndDownVote />
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
    width: '50%'
  },
  locationStats: {
    flex: 1 / 2,
    width: '50%'
  },
  box: {
    // width: 'auto',
    // width: 100,
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
