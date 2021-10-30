import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import PostCard from './PostCard';
import { mockData } from '../../mockData';
import { getListings, selectListings, upvote, downvote, setLoading } from './getListingsSlice';

const dummy = [0, 0, 0, 0, 0, 0, 0] //7 eles


const MainView = () => {

  //conditional to only fetch on first render

  const dispatch = useDispatch();
  let currentListings = useSelector((state) => state.listings.currentListings)
  const { loading } = useSelector((state) => state.listings)
  console.log(currentListings)

  if (loading) {
    console.log('inside loading')
    dispatch(getListings(mockData))
    dispatch(setLoading(false))
    return (
      <Text style={tailwind('text-3xl')}>LOADING ...............</Text>
    )

  } else return (
    <ScrollView style={tailwind('h-full w-full bg-red-100')}>
      {currentListings.map((ele, i) => 
        <PostCard 
          key={i}
          listingId={ele.id}
          score = {(ele.upvotes - ele.downvotes)}
          image={ele.image}
          address={ele.address}
          description={ele.description}
          title={ele.title}
          upvote={()=>{dispatch(upvote(i))}}
          downvote={()=>{dispatch(downvote(i))}}
        />
      )}
    </ScrollView>

  )
}

export default MainView