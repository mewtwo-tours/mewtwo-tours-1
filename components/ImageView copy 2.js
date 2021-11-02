import * as React from 'react';
import {
  Text, 
  View,
  Image,
  SafeAreaView } from 'react-native';

import Carousel from 'react-native-snap-carousel';

const IMAGES = {
  image1: require('../assets/images/1.jpg'),
  image2: require('../assets/images/2.jpg'),
  image3: require('../assets/images/3.jpg')
};

export default class App extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
            { id: '0', image: IMAGES.image1 },
            { id: '1', image: IMAGES.image2 },
            { id: '2', image: IMAGES.image3 }
        ]
      }
    }

    _renderItem({item, index}) {
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>
            <Image
              source={item.image}
              key={index}
              sliderWidth={300}
              itemWidth={300}
              resizeMode='contain'
              style={{width: '100%', height: '100%'}}
            />
          </View>
        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>

          </SafeAreaView>
        );
    }
}

