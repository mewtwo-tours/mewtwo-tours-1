import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import PostCard from './PostCard';
import { mockData } from '../../mockData';
import { getListings, selectListings, upvote, downvote, setLoading } from './getListingsSlice';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import NavBar from './NavBar';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainView = ({navigation}) => {

  //const [listingsHook, setListingsHook] = useState([])

  const dispatch = useDispatch();
  let currentListings = useSelector((state) => state.listings.currentListings)
  const { loading } = useSelector((state) => state.listings)
  console.log(currentListings)
  //let sorted = currentListings.sort((a, b)=> b.upvote - a.upvote);
  const sorted = [].concat(currentListings).sort((a, b)=> b.upvote - a.upvote)
  console.log('sorted', sorted)


    // --------------- MapView stuff ----------------- //
    const [currlocation, setCurrLocation] = useState(null);
    const [reloading, setReloading] = useState(false);
    //on mount
//0 - check current location
//1 - get current location
//2 - set current location
//3 - fetch listings 
//4 - set listings state
//5 - set loading to false
  const checkLoc = async() => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('status', status)
    if (status !== 'granted') {
      setErrorMsg('Location access denied');
      return;
    }
    console.log('before asyncs')
    let location = await Location.getCurrentPositionAsync({});
    console.log('location,', location)
    const {latitude, longitude} = location.coords;

    await fetch('http://192.168.1.4:3000/listings/get', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude
      })
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log('*******DATA.rows*******', data.rows); 
      dispatch(getListings(data.rows))
      //console.log('****CURRENT LISTINGS*****', currentListings)
    })
    .catch((e)=>console.log('fetchListings error', e))
  }

  const _onPressCard = (argument) => {
    console.log('_onPressCard clicked')
    navigation.navigate('ListingView', {
      params: argument
    })
  }

  useEffect(() => {
    //check location function
    checkLoc();
  }, [dispatch])



  // } else 
  return (
    <View style={{
      backgroundColor: '#FFA400',
      ...tailwind('h-full w-full flex-col justify-center')}}>
      <ScrollView style={tailwind('h-full w-full bg-red-100')}>
        {sorted.map((ele, i) => 
          <PostCard 
            key={i}
            idx={i}
            listingId={ele.id}
            score = {(ele.upvote - ele.downvote)}
            image={ele.key}
            address={ele.street_address}
            city={ele.city}
            state={ele.state}
            description={ele.description}
            title={ele.title}
            // upvote={()=>{dispatch(upvote(i))}}
            // downvote={()=>{dispatch(downvote(i))}}
            navigation={_onPressCard}
          />
        )}
      </ScrollView>
      <NavBar
        setReloading={setReloading}
        reloading={reloading}
      >
        </NavBar>
    </View>

  )
}

export default MainView



    // ------ MapView -------- //

    // <View style={styles.container}>
    //   {mapCompo}
    // </View>



    // ------ Geocode -------- //

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Button
    //     onPress={()=>geoCode()}
    //   />
    //   <StatusBar style="auto" />
    // </View>



    // ------ Amazon s3 -------- //

    // <View style={styles.container}>
    //   <Form  //onSubmit={handleSubmit}
    //   >
    //   <Input
    //     type="file"
    //     accept="image/*"
    //     //onPress={postImage}
    //   ></Input>
      
    //   <Input
    //     //onPress={(e) => setDescription(e.target.value)}
    //     type="text"
    //   ></Input>
    //   <Button></Button>
    // </Form>
    // </View>