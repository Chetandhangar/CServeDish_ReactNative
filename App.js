import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
import Main from './components/MainComponent';
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react'
import {Loading} from './components/LoadingComponent';

const {persistor,store} = ConfigureStore();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default function App() {
  
  return (
    <Provider store={store}>
      <PersistGate 
      loading = {<Loading/>}
      persistor = {persistor}
      >
      <Main />
      </PersistGate>
  </Provider>
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
