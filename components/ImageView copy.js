import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
 } from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'

const { width } = Dimensions.get('window')

const SPACING = 10
const THUMB_SIZE = 80

const IMAGES = {
  image1: require('../assets/images/1.jpg'),
  image2: require('../assets/images/2.jpg'),
  image3: require('../assets/images/3.jpg'),
  image4: require('../assets/images/4.jpg')
}

const ImageView = () => {
  const [images, setImages] = useState([
    {id: 1, image: IMAGES.image1},
    {id: 2, image: IMAGES.image2},
    {id: 3, image: IMAGES.image3},
    {id: 4, image: IMAGES.image4}
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Custom Gallery
      </Text>
      <View style={{flex: 1 / 2, marginTop: 20}}>
      <Text style={styles.text}>
      Carousel
    </Text>
    
    <Carousel
        layout='default'
        data={images}
        itemWidth={width}
        renderItem={({item, index}) => (
          <Image
            key={index}
            style={{width: '100%', height: '100%'}}
            resizeMode='contain'
            source={item.image}
            sliderWidth={300}
            itemWidth={300}
          />
        )}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 32,
    marginTop: 50,
    marginBottom: 25
  }
})

export default ImageView
