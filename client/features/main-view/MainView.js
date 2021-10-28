import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import PostCard from './PostCard';

const dummy = [0, 0, 0, 0, 0, 0, 0] //7 eles

const MainView = () => {

  return (
    <ScrollView style={tailwind('h-full w-full bg-red-100')}>
      {dummy.map((ele, i) => <PostCard key={i}/>)}
    </ScrollView>

  )
}

export default MainView