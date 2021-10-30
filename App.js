import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Form, Input, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import MainView from './client/features/main-view/MainView'
import { Provider } from 'react-redux';
import store from './client/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePost from './client/features/create-post-view/CreatePost';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Provider store = {store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainView}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
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
