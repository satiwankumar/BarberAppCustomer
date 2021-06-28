import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { Text,View, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Routes from './src/navigation/Routes'
import store from './src/redux/store'
import { COLORS } from './src/constants';
import { Icon } from 'native-base';
import { loadSession } from './src/redux/actions/auth';
import PushNotification from "react-native-push-notification";
import Firebase from '@react-native-firebase/app'
import AsyncStorage  from '@react-native-community/async-storage'

const App = () => {

  useEffect(async()=>{
    await store.dispatch(loadSession());

    // NOTIFICATION
      // Firebase.initializeApp(this)
      PushNotification.configure({
          onRegister: function (token) {
            // AsyncStorage.setItem('fcmToken',token.token);
            console.log("FCM  TOKEN:", token.token);
          },
        
          onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
          },
          onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);
          },
          onRegistrationError: function(err) {
            console.error(err.message, err);
          },
        
          permissions: {
            alert: true,
            badge: true,
            sound: true,
          },
          popInitialNotification: true,
          requestPermissions: true,
        });
   // NOTIFICATION
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

