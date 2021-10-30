import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import PostCard from './PostCard';
import { mockData } from '../../mockData';
import { getListings, selectListings, upvote, downvote, setLoading } from './getListingsSlice';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  
  const navigation = useNavigation()

  return (
      <View style={tailwind('bg-red-200 h-8 w-10 self-center')}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePost')}>
          <Text style={tailwind('text-xs')}>Post</Text>
        </TouchableOpacity>
      </View>
  
  )
}

export default NavBar