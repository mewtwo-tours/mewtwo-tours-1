import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn';
import PostCard from './PostCard';
import { mockData } from '../../mockData';
import { getListings, selectListings, upvote, downvote, setLoading } from './getListingsSlice';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import NavBar from './NavBar';

const MainView = () => {

  //conditional to only fetch on first render

  const dispatch = useDispatch();
  let currentListings = useSelector((state) => state.listings.currentListings)
  const { loading } = useSelector((state) => state.listings)
  console.log(currentListings)

    // --------------- MapView stuff ----------------- //
    const [currlocation, setCurrLocation] = useState(null);
    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      await setCurrLocation(location);
    })();
  }, []);


  // --------------- GeoCode snippet --------------- //
  const messageObj = {
    location:  '153 Morgan Ave, Brooklyn, NY 11237'
  };
  
  const geoCode = () => {
    fetch('http://localhost:3000/geocode', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj)
    })
    .then((response)=>response.json())
    .then((data)=>
    console.log(data))
    .catch(()=>console.log('testRoute Error'))
  }
  // ------------------------------------------------- //
  


  // --------------- Amazon s3 snippet --------------- //
  const [newImg, setNewImg] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages(result.uri);
    }
  };

  const postImage = async ({ image, description })=>{
    await pickImage
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const result = await fetch('http://localhost:3000/images/upload', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    const tempResult = result.data;
    setNewImg(tempResult.imagePath.slice(8));
    return result.data;
  }

  async function submit(event) {
    const result = await postImage({ image: file, description });
    setImages([result.image, ...images]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

    // ------------------------------------------------- //

  if (loading) {
    console.log('inside loading')
    dispatch(getListings(mockData))
    dispatch(setLoading(false))
    return (
      <Text style={tailwind('text-3xl')}>LOADING ...............</Text>
    )

  } else return (
    <View style={tailwind('h-full w-full flex-col justify-center bg-red-900')}>
      <ScrollView style={tailwind('h-full w-full bg-red-100')}>
        {currentListings.map((ele, i) => 
          <PostCard 
            key={i}
            listingId={ele.id}
            score = {(ele.upvotes - ele.downvotes)}
            image={ele.image}
            address={ele.address}
            description={ele.description}
            title={ele.title}
            upvote={()=>{dispatch(upvote(i))}}
            downvote={()=>{dispatch(downvote(i))}}
          />
        )}
      </ScrollView>
      <NavBar></NavBar>
    </View>

  )
}

export default MainView



    // ------ MapView -------- //

    // <View style={styles.container}>
    //   {mapCompo}
    // </View>



    // ------ Geocode -------- //

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Button
    //     onPress={()=>geoCode()}
    //   />
    //   <StatusBar style="auto" />
    // </View>



    // ------ Amazon s3 -------- //

    // <View style={styles.container}>
    //   <Form  //onSubmit={handleSubmit}
    //   >
    //   <Input
    //     type="file"
    //     accept="image/*"
    //     //onPress={postImage}
    //   ></Input>
      
    //   <Input
    //     //onPress={(e) => setDescription(e.target.value)}
    //     type="text"
    //   ></Input>
    //   <Button></Button>
    // </Form>
    // </View>