import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const UpAndDownVote = () => {

  const votes = 777

  return (
    <View style={[styles.container, styles.row]}>
      <View style={[styles.align, styles.locationStats]}>
        <Text>
          Number of {votes} Votes
        </Text>
      </View>
      <View style={[styles.align]}>
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
    justifyContent: 'space-evenly',
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
    justifyContent: 'space-evenly',
    width: 'auto'
  },
  locationStats: {
    flex: 1 / 2,
    width: 'auto'
  },
  row: {
    flexWrap: 'wrap'
  }
})

export default UpAndDownVote
