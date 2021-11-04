import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const NavBar = (props) => {
  
  const navigation = useNavigation()

  return (
      <View style={{backgroundColor: '#FFA400', ...tailwind('h-12 w-full self-center border-black border-2 flex-row justify-around')}}>
        <TouchableOpacity
          style={tailwind('self-center')}
          onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind('self-center')}
          onPress={() => props.setReloading(!props.reloading)}>
          <Ionicons name="reload-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind('self-center')}
          onPress={() => navigation.navigate('CreatePost')}>
          <Ionicons name="md-add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind('self-center')}
          onPress={() => navigation.navigate('CreatePost')}>
          <Ionicons name="person-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
  
  )
}

export default NavBar