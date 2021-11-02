import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

//  // --------------- Amazon s3 snippet --------------- //
//  const [images, setImages] = useState('');

//  const pickImage = async () => {
//    let result = await ImagePicker.launchImageLibraryAsync({
//      mediaTypes: ImagePicker.MediaTypeOptions.All,
//      allowsEditing: true,
//      aspect: [4, 3],
//      quality: 1,
//    });
//    if (!result.cancelled) {
//      let localUri = result.uri;
//      let fileName = localUri.split('/').pop();
//       // Infer the type of the image
//      let match = /\.(\w+)$/.exec(fileName);
//      let type = match ? `image/${match[1]}` : `image`;
//      await postImage(localUri, fileName, type)
//    }
//  };

//  const postImage = async (localUri, fileName, type)=>{
//    try{
//    const formData = new FormData();
//    formData.append("image", { uri: localUri, name: fileName, type });
//    const result = await fetch('http://10.0.0.9:3000/images/upload', {
//      method: "POST",
//      headers: { "Content-Type": "multipart/form-data"},
//      body: formData
//    })
//    .then(res=> res.json())
//    .catch(err=>console.log(err))
//    setImages(result.imageKey)
//    }catch(e){
//      console.log("PostImage Err", e)
//    }
//  }

//    // ------------------------------------------------- //

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const addImage=()=>{};
 
  return (
    <View style={imageUploaderStyles.container}>
        {
            image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        }
            
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                    <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>
      

    </View>
   
  );
}

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200, 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})