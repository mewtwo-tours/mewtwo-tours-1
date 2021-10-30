import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import MainView from './client/features/main-view/MainView'
import { Provider } from 'react-redux';
import store from './client/store/store';

export default function App() {
  const messageObj = {
    location:  '153 Morgan Ave, Brooklyn, NY 11237'
  };

  const testRoute = () => {
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

  return (
    // <Provider store = {store}>
    //   <SafeAreaView style={styles.container}> 
    //     <MainView> 
    //     </MainView>
    //   </SafeAreaView>
    // </Provider>

    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        onPress={()=>testRoute()}
      />
      <StatusBar style="auto" />
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
});
