import React from 'react';
import {View, Text,ScrollView,StyleSheet,StatusBar} from 'react-native';
import { Container, Header, Content, Accordion, Form, Item, Input, Button, Icon, TouchableOpacity, Card, CardItem, Body } from 'native-base';
import {  COLORS, SIZES,TEXTSTYLES  } from '../constants'
import * as Animatable from 'react-native-animatable';
import PushNotification from "react-native-push-notification";
import Firebase from '@react-native-firebase/app'
// import PushNotificationIOS from "@react-native-community/push-notification-ios";

const Notification = () => {

    useEffect(() => {
        // Firebase.initializeApp(this)
        PushNotification.configure({
            onRegister: function (token) {
              console.log("TOKEN:", token);
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
    })
    return(
       <Text></Text>
    )
}

export default Notification;
const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
    },
  });