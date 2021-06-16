import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { Text,View, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Routes from './src/navigation/Routes'
import store from './src/redux/store'
import { COLORS } from './src/constants';
import { Icon } from 'native-base';
import { loadSession } from './src/redux/actions/auth';

const App = () => {

  useEffect(async()=>{
    await store.dispatch(loadSession());
  })
  
  return (
    <Provider store={store}>
      
      <Routes />
    </Provider>


  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

