import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import ImageUpload from '../image-upload/ImageUpload';
import NavBar from '../main-view/NavBar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

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
    <View style={{
      backgroundColor: '#F1F2F6',
      ...tailwind('h-full w-full flex-col')}}>
      <ScrollView>
        <Text style={tailwind('text-3xl self-center font-extrabold')}>
          Create a Post
        </Text>
        <View style={{borderColor: '#FFA400', ...tailwind('w-full border-4')}}/>
        <Text>
          Location Name
        </Text>
        <TextInput
          style={tailwind('h-8 w-60 border-2 ml-2.5')}
          onChangeText={createTitle}
          value={title}   
        />
        <Text>
          Location Address
        </Text>
        <TextInput
        style={tailwind('h-8 w-60 border-2 ml-2.5')}
          onChangeText={createAddress}
          value={address}   
        />
        <Text>
          Short Description
        </Text>
        <TextInput
          multiline
          numberOfLines={3}
          style={tailwind('border-2 h-24 w-60 ml-2.5')}
          onChangeText={createDescription}
          value={description}   
        />
        <Text>Add Image</Text>
        <TouchableOpacity style={tailwind('ml-2.5')}>
          <Ionicons name="image-outline" size={30} color="black" />
        </TouchableOpacity>
        
        <View style={tailwind('h-20 w-full self-center')}>
          <Text style={tailwind('text-2xl self-center font-extrabold')}>Create Post</Text>
          <TouchableOpacity style={tailwind('self-center')}
            onPress={() => sendReq()}>
            <MaterialIcons name="add-business" size={50} color="black" />
          </TouchableOpacity>
        </View>        
      </ScrollView>
      <NavBar></NavBar>
    </View>
  )
}

export default CreatePost;