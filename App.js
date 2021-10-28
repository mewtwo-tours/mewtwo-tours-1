import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import MainView from './client/features/main-view/MainView'

const testRoute = () => {
  fetch('http://localhost:3000/testRoute')
    .then(console.log('i ddid it'))
    .catch(console.log('error'))
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}> 
      <MainView>
        
      </MainView>
    </SafeAreaView>
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
