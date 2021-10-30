import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import ImageUpload from '../image-upload/ImageUpload';

const CreatePost = () => {

  const [title, createTitle] = useState('');
  const [description, createDescription] = useState('');
  const [address, createAddress] = useState('')
  //image
  const sendReq = () => {
    const reqBody = {
      image: 'default',
      title: title,
      description: description,
      address: address
    }

    fetch('http://localhost:3000/addPost', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    })
    .then((response)=>response.json())
    .then((data)=>
    console.log(data))
    .catch(()=>console.log('CreatePost Error, req body is ', reqBody))
  }
  

  return (
    <ScrollView>
      <Text style={tailwind('text-xl self-center')}>
        Create a Post
      </Text>
      <View style={tailwind('w-full border-2')}/>
      <Text>
        Location Name
      </Text>
      <TextInput
        style={tailwind('h-8 w-60 border-2')}
        onChangeText={createTitle}
        value={title}   
      />
      <Text>
        Location Address
      </Text>
      <TextInput
      style={tailwind('h-8 w-60 border-2')}
        onChangeText={createAddress}
        value={address}   
      />
      <Text>
        Short Description
      </Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={tailwind('border-2 h-24 w-60')}
        onChangeText={createDescription}
        value={description}   
      />
      <View style={tailwind('bg-red-200 h-8 w-10 self-center')}>
        <TouchableOpacity
          onPress={() => sendReq()}>
          <Text style={tailwind('text-xs')}>Post it!</Text>
        </TouchableOpacity>
      </View>
      <ImageUpload/>
    </ScrollView>
  )
}

export default CreatePost;