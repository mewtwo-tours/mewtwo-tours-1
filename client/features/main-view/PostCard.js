import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';

const PostCard = () => {



  return (
    <View style={tailwind('bg-blue-200 w-full h-52 border-2 p-2')}>
      <View style={tailwind(' w-full h-full p-2 flex flex-row justify-between')}>
        <Image 
          source={require('../../../assets/icon.png')}
          style={tailwind('w-40 h-40')}
        />
          {/*placeholder for upvote downvote */}
        <View style={tailwind('bg-yellow-200 w-8 mt-3 mb-7')}/>

        <View style={tailwind('bg-green-200 w-48 mb-2')}>
          <Text style={tailwind('text-lg')}>The Anchored Inn</Text>
          <Text style={tailwind('text-xs font-bold')}>323 Stagg Street, Brooklyn</Text>
          <Text style={tailwind('text-xs mt-3')}>A pirate themed dive bar - cheap drinks by NYC standards, decent food, here are a few more words</Text>
        </View>

      </View>
    </View>

  )
}

export default PostCard;