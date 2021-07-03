import React, { useState } from 'react';
import {View, Text,ScrollView,StyleSheet,StatusBar,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Accordion, Form, Item,Radio,ListItem, Right, Left , Input,Label, Button, Icon,Card, CardItem, Body } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from '../constants';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

const ReviewAppointment = ({route,navigation}) => {
    const {Shop , Service ,AppointmentDate ,EmployeeId ,TimeSlot} = route.params
  
    const [CardDetails,setCardDetails] = useState({
        cardNo :'',
        expDate:new Date(),
        cvcCode:''
    })
    const [isDayPickerVisible, setDayPickerVisibility] = useState(false);
    const showDayPicker = () => {
        setDayPickerVisibility(true);
      };
      const hideDayPicker = () => {
        setDayPickerVisibility(false);
      };
      const handleConfirmDay = (date) => {
        console.warn("A date has been picked: ", setCardDetails({expDate:date}));
        hideDayPicker();
      };
    return(
        <View style={GLOBALSTYLE.screenbg} >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{alignItems:'center',paddingHorizontal:20,marginBottom:25}}>
        <Text style={[TEXTSTYLES.sectionHead,styles.alignText]}>Review Appointment Details</Text>
       
        </View>
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{backgroundColor:COLORS.black,width:'90%',alignSelf:'center',padding:10,borderRadius:4,paddingVertical:20,marginBottom:20}}>
        <Animatable.View animation="slideInUp" style={{alignSelf:'center',paddingHorizontal:20,alignItems:'center'}}>
        <Icon  style={{color:COLORS.lightGray,fontSize:80,marginBottom:20}} name="calendar-outline"></Icon>
        <View style={{flexDirection:'row'}}>
        <Text style={{color:COLORS.white,fontSize:20,textTransform:'uppercase',fontWeight:'bold',paddingHorizontal:12,borderRightColor:COLORS.lightGray,borderRightWidth:2}}>{TimeSlot.startTime}</Text>
            <Text style={{color:COLORS.white,fontSize:20,textTransform:'uppercase',fontWeight:'bold',paddingHorizontal:12,}}>{Service?.title}</Text>
            
        </View>
        <Text style={{color:COLORS.white,fontSize:16,textAlign:'center',marginTop:6,textTransform:'uppercase'}}> {AppointmentDate}</Text>
        <Text style={{color:COLORS.white,fontSize:16,textAlign:'center',marginTop:6}}>{Shop.address}</Text>
        <Text style={{color:COLORS.secondry,fontSize:17,fontWeight:'bold',marginTop:'15%'}}>Total Amount: ${Service?.charges}</Text>
        <TouchableOpacity
                style={[GLOBALSTYLE.themebtn,styles.alignBtn]}
                mode="contained"
               onPress={() => navigation.navigate('Payment',{Shop: Shop, Service: Service , AppointmentDate: AppointmentDate.toString(),EmployeeId : EmployeeId , TimeSlot: TimeSlot})}
                >
                <Text style={{ color: 'white', fontSize: 16,textTransform: 'uppercase',textAlign:'center'}}>COMPLETE BOOKING
                </Text>
                
            </TouchableOpacity> 
        </Animatable.View>
        
       
             
        </ScrollView>
        </View>
    )
}

export default ReviewAppointment;
const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
    },
    textContent: {
        color: COLORS.lightGray,
        
    },
    alignText:{
        textAlign:'center'
    },
    alignBtn:{
marginBottom:50
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