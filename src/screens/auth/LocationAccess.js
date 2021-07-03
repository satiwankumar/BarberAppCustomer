
import React,{useEffect,useState} from "react";
import { View, Text, StyleSheet,Image,ImageBackground,StatusBar,ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Form, Item, Input, Button,  Label, Icon } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { storeUserData } from '../../storage/storage';
import Toast from 'react-native-simple-toast';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AsyncStorage  from '@react-native-community/async-storage'

const LocationAccess =({navigation}) => {
  const [GrantedPermission,setGrantedPermission] = useState(false)
  const [userLocation,setUserLocation] = useState(null)
  const getloc = async  () =>{
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(() => {
          Geolocation.getCurrentPosition(data => {
            navigateToHome(data)
            },
                error => console.log(error),
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                }
                );
        })
        .catch((err) => {
             Toast.show("Permission Denied.", Toast.SHORT)
        return;
        }); 
  }
const navigateToHome = async (data) =>{
  await setUserLocation(data.coords)
  let coordinates= data.coords
  console.log("**SENDING LOCATION COORDS",coordinates)
  if(coordinates !== null){
     navigation.navigate('Home',{screen: 'Home', params: { userLoc: coordinates}})
    //  AsyncStorage.setItem('latitude',coordinates.latitude.toString());
    //  AsyncStorage.setItem('longitude',coordinates.longitude.toString());
}
  
}
  const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            setGrantedPermission(true)
            getloc();
        } else {
          Toast.show("Permission Denied.", Toast.SHORT)
        }
    } catch (err) {
            console.log(err)
    }
}

  return (
    <View style={GLOBALSTYLE.screenbg} >
    <StatusBar translucent backgroundColor="transparent"/>

    <View style={styles.formPart}
    animation="slideInUp"
    >
       <View  style={{alignItems:'center',justifyContent:'center',flex:1}}>
       <Icon style={{color:COLORS.secondry,fontSize:100}} name="location-outline"></Icon>
       <Text style={{fontSize:26,textAlign:'center',color:COLORS.white,textTransform:'uppercase'}}> Enable Location Services</Text>
       <Text style={{color:COLORS.lightGray,fontSize:16,marginBottom:30,textAlign:'center'}}>Turn on Location Services to see what's nearby </Text>
         <TouchableOpacity onPress={requestLocationPermission} style={{backgroundColor:COLORS.black,padding:12,borderRadius:8,borderColor:COLORS.secondry,borderWidth:1,marginBottom:7,width:320}}>
             <Text style={{color:COLORS.white,fontSize:17,textTransform:'uppercase',textAlign:'center'}}>Allow Location Access</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() =>  navigation.navigate('Home',{screen: 'Home', params: { userLoc: ''}})} style={{backgroundColor:COLORS.black,padding:12,borderRadius:8,borderColor:COLORS.secondry,borderWidth:1,marginBottom:7,width:320}}>
             <Text style={{color:COLORS.white,fontSize:17,textTransform:'uppercase',textAlign:'center'}}>Not Now</Text>
         </TouchableOpacity>
       </View>
    </View>
   </View>
    
  );
};

export default LocationAccess;

const styles = StyleSheet.create({
    formPart:{
        flex:1,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:COLORS.primary,
        paddingVertical:30,
        paddingHorizontal:10
    },
    imageBg:{
        width:'100%',
        resizeMode:'cover',
        flex:1,
        height:350,
        backgroundColor: COLORS.secondry,
        opacity: 0.6,
    }
});
