import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Form, Input, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import MainView from './client/features/main-view/MainView'
import { Provider } from 'react-redux';
import store from './client/store/store';


export default function App() {

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

  //console.log(currlocation)
  // let mapCompo = currlocation === null ? 
  // <Text>Open up App.js to start working on your app!</Text>
  // : <MapView style={styles.map} showsUserLocation={true}> 
  // <MapView.Marker
  //         coordinate={{ latitude: currlocation.coords.latitude, longitude: currlocation.coords.longitude}}
  //         title={'Pin'}
  //         description={`${currlocation}`}/>
  // </MapView> 




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

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

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

  return (
    <Provider store = {store}>
      <SafeAreaView style={styles.container}> 
        <MainView> 
        </MainView>
      </SafeAreaView>
    </Provider>


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

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
