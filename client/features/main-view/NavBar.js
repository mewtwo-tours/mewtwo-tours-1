import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  
  const navigation = useNavigation()

  return (
      <View style={tailwind('h-12 w-full self-center border-black border-2')}>
        <TouchableOpacity
          style={tailwind('self-center')}
          onPress={() => navigation.navigate('CreatePost')}>
          <Ionicons name="md-add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
        
      </View>
  
  )
}

export default NavBar