import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import NavBar from '../main-view/NavBar';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';


const CreatePost = () => {

  const [title, createTitle] = useState('');
  const [description, createDescription] = useState('');
  const [address, createAddress] = useState('')
  const [city, createCity] = useState('');
  const [state, createState] = useState('')
  //image
  const [images, setImages] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      let localUri = result.uri;
      let fileName = localUri.split('/').pop();
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : `image`;
      await postImage(localUri, fileName, type)
    }
  };
  
   const postImage = async (localUri, fileName, type)=>{
     try{
     const formData = new FormData();
     formData.append("image", { uri: localUri, name: fileName, type });
     const result = await fetch('http://192.168.1.4:3000/images/upload', {
       method: "POST",
       headers: { "Content-Type": "multipart/form-data"},
       body: formData
     })
     .then(res=> res.json())
     .then(console.log(images))
     .catch(err=>console.log(err))
     setImages(result.imageKey)
     }catch(e){
       console.log("PostImage Err", e)
     }
   }
  const sendReq = () => {
    const reqBody = {
      image: images,
      title: title,
      description: description,
      street_address: address,
      city: city,
      state: state
    }

    fetch('http://192.168.1.4:3000/addPost', {
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
          Street Address
        </Text>
        <TextInput
          style={tailwind('h-8 w-60 border-2 ml-2.5')}
          onChangeText={createAddress}
          value={address}   
        />
        <Text>
          City
        </Text>
        <TextInput
          style={tailwind('h-8 w-60 border-2 ml-2.5')}
          onChangeText={createCity}
          value={address}   
        />
        <Text>
          State
        </Text>
        <TextInput
          style={tailwind('h-8 w-60 border-2 ml-2.5')}
          onChangeText={createState}
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
        <TouchableOpacity 
          style={tailwind('ml-2.5')}
          onPress={() => pickImage()}
        >
          <Ionicons name="image-outline" size={30} color="black" />
        </TouchableOpacity>
        
        <View style={tailwind('h-20 w-full self-center')}>
          <Text style={tailwind('text-2xl self-center font-extrabold')}>Create Post</Text>
          <TouchableOpacity 
            style={tailwind('self-center')}
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