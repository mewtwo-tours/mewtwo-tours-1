import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Form, Input, Dimensions, Image } from 'react-native';
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
  const [images, setImages] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      //setImages(result.uri);
      let localUri = result.uri;
      let fileName = localUri.split('/').pop();
       // Infer the type of the image
      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : `image`;
      //console.log(fileName, type)
      await postImage(localUri, fileName, type)
    }
  };

  const postImage = async (localUri, fileName, type)=>{
    try{
    const formData = new FormData();
    formData.append("image", { uri: localUri, name: fileName, type });
    const result = await fetch('http://10.0.0.9:3000/images/upload', {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data"},
      body: formData
    })
    .then(res=> res.json())
    .catch(err=>console.log(err))
    setImages(result.imageKey)
    }catch(e){
      console.log("PostImage Err", e)
    }
  }

    // ------------------------------------------------- //
  
  return (
    // <Provider store = {store}>
    //   <SafeAreaView style={styles.container}> 
    //     <MainView> 
    //     </MainView>
    //   </SafeAreaView>
    // </Provider>


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

    <View style={styles.container}>
      <Button onPress={()=>pickImage()} title="Press Me"></Button>
      <Image source={{
        uri: `http://10.0.0.9:3000/images/show/${images}`,
        method: 'GET'
      }}
      style={{ width: 400, height: 400 }}
      />
    </View>

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
