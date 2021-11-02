import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import PostCard from './PostCard';
import { mockData } from '../../mockData';
import { getListings, selectListings, upvote, downvote, setLoading } from './getListingsSlice';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import NavBar from './NavBar';

const MainView = () => {

  const dispatch = useDispatch();
  let currentListings = useSelector((state) => state.listings.currentListings)
  const { loading } = useSelector((state) => state.listings)
  console.log(currentListings)

  const fetchListings = () => {
    const {latitude, longitude} = currlocation.coords;
    fetch('http://localhost:3000/listings', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude
      })
    })
    .then((response)=>response.json())
    .then((data)=>
    console.log(data))
    .catch(()=>console.log('fetchListings error'))
  }


  // --------------- MapView stuff ----------------- //
  const [currlocation, setCurrLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      await setCurrLocation(location);
      //.then fetch listings listings
      console.log('location: ', location)
      console.log('currlocation: ', currlocation)
    })();
  }, []);


  // --------------- GeoCode snippet --------------- //
  // const messageObj = {
  //   location:  '153 Morgan Ave, Brooklyn, NY 11237'
  // };
  
  // const geoCode = () => {
  //   fetch('http://localhost:3000/geocode', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(messageObj)
  //   })
  //   .then((response)=>response.json())
  //   .then((data)=>
  //   console.log(data))
  //   .catch(()=>console.log('testRoute Error'))
  // }
   

  if (loading) {
    console.log('inside loading')
    dispatch(getListings(mockData))
    dispatch(setLoading(false))
    return (
      <Text style={tailwind('text-3xl')}>LOADING ...............</Text>
    )

  } else return (
    <View style={{
      backgroundColor: '#FFA400',
      ...tailwind('h-full w-full flex-col justify-center')}}>
      <ScrollView style={tailwind('h-full w-full bg-red-100')}>
        {currentListings.map((ele, i) => 
          <PostCard 
            key={i}
            idx={i}
            listingId={ele.id}
            score = {(ele.upvotes - ele.downvotes)}
            image={ele.image}
            address={ele.address}
            description={ele.description}
            title={ele.title}
            // upvote={()=>{dispatch(upvote(i))}}
            // downvote={()=>{dispatch(downvote(i))}}
          />
        )}
      </ScrollView>
      <NavBar></NavBar>
    </View>

  )
}

export default MainView



   