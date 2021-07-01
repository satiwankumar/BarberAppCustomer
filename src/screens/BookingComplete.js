import React, { useEffect, useState } from 'react';
import {View, Text,ScrollView,StyleSheet,StatusBar,TouchableOpacity,BackHandler} from 'react-native';
import { Container, Header, Content, Accordion, Form, Item,Radio,ListItem, Right, Left , Input,Label, Button, Icon,Card, CardItem, Body } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from '../constants';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

const BookingComplete = ({route,navigation}) => {
    BackHandler.addEventListener(
        "hardwareBackPress",
        onPress= () => navigation.navigate('BookNow')
      );
    useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onPress= () => navigation.navigate('BookNow')
          );
          return () => backHandler.remove();
          
      
    },[])


    const Booking= route.params.BookingDetails
    return(
        <View style={GLOBALSTYLE.screenbg} >
        <StatusBar translucent backgroundColor="transparent" />
        
        
       
        <Animatable.View animation="slideInUp" style={{alignSelf:'center',paddingHorizontal:20,alignItems:'center',marginTop:'40%'}}>
        <Icon  style={{color:COLORS.lightGray,fontSize:80,marginBottom:20}} name="checkmark-done-outline"></Icon>
        <View style={{alignItems:'center',paddingHorizontal:20,marginBottom:25}}>
        <Text style={[styles.alignText]}>Your Appointment is Confirmed</Text>
       
        </View>
        <TouchableOpacity
                style={[GLOBALSTYLE.themebtn,styles.alignBtn]}
                mode="contained"
               onPress={() => navigation.navigate('UserBookings')}
                >
                <Text style={{ color: 'white', fontSize: 16,textTransform: 'uppercase',textAlign:'center'}}>View Current Bookings
                </Text>
                
            </TouchableOpacity> 
            <TouchableOpacity
                style={[GLOBALSTYLE.themebtn,styles.alignBtn]}
                mode="contained"
               onPress={() => navigation.navigate('VendorDetail')}
                >
                <Text style={{ color: 'white', fontSize: 16,textTransform: 'uppercase',textAlign:'center'}}>Back to shop
                </Text>
                
            </TouchableOpacity> 
        </Animatable.View>
        
       
        </View>
    )
}

export default BookingComplete;
const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
    },
    textContent: {
        color: COLORS.lightGray,
        
    },
    alignText:{
        textAlign:'center',
        color:COLORS.lightGray,
        textTransform:'uppercase',
        fontSize:22,
        letterSpacing:2
    },
    alignBtn:{
marginTop:0,marginBottom:10,width:270
    },
    inputBox: {
        marginBottom: 10,
        backgroundColor: COLORS.primary,
        color: '#707070',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: COLORS.transparent,
        marginTop: 10,
        paddingHorizontal:20
    },
    labelContent: {
        color: COLORS.lightGray,
        marginLeft: 20,
        marginTop: -13,
    },
    formContent: {
        width: SIZES.width * 0.80,
        alignItems: 'center',
        maxWidth:400
    }
  });