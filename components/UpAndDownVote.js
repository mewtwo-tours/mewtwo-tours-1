import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const UpAndDownVote = () => {
  return (
    <View style={[styles.container, styles.row]}>
      <View style={[styles.debug1, styles.align, styles.locationStats]}>
        <Text>
          Number of Votes
        </Text>
      </View>
      <View style={[styles.debug1]}>
        <Icon
          style={[styles.align]}
          name='arrow-up'
          color='green'
          size={30}
          onPress={() => console.log('up vote')} />
        <Icon
          style={[styles.align]}
          name='arrow-down'
          color='red'
          size={30}
          onPress={() => console.log('down vote')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  align: {
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  debug1: {
    borderStyle: 'dotted',
    borderRadius: 1,
    borderWidth: 5,
    borderColor: 'aqua'
  },
  container: {
    flex: 1,
    width: '50%'
  },
  locationStats: {
    flex: 1 / 2,
    width: '50%'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default UpAndDownVote
