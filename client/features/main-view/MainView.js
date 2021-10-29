import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import PostCard from './PostCard';
import { mockData } from '../../mockData';
import { getListings, selectListings } from './getListingsSlice';

const dummy = [0, 0, 0, 0, 0, 0, 0] //7 eles


const MainView = () => {
  const dispatch = useDispatch();
  dispatch(getListings(mockData))
  const currentListings = useSelector(selectListings)
  console.log(currentListings)
  

  return (
    <ScrollView style={tailwind('h-full w-full bg-red-100')}>
      {currentListings.map((ele, i) => 
        <PostCard 
          key={i}
          address={ele.address}
          description={ele.description}
          title={ele.title}
        />
      )}
    </ScrollView>

  )
}

export default MainView