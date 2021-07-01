import React, { useState } from 'react';
import {View, Text,ScrollView,StyleSheet,StatusBar,TouchableOpacity, Alert} from 'react-native';
import { Container, Header, Content, Accordion, Form, Item,Radio,ListItem, Right, Left , Input,Label, Button, Icon,Card, CardItem, Body } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from '../constants';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux'
import { createBookings } from '../redux/actions/booking'
import moment from 'moment';

const Payment = ({route,navigation,createBookings}) => {
    const {Shop , Service ,AppointmentDate ,EmployeeId ,TimeSlot} = route.params
    const [itemSelected,setItemSelected] = useState("pay_in_person")
    const [isDayPickerVisible, setDayPickerVisibility] = useState(false);
    const [BookDetails,setBookDetails] = useState({
        service: Service._id,
        charges :Service.charges,
        stylist: EmployeeId,
        shop: Shop._id,
        date: AppointmentDate,
        time: TimeSlot.startTime.toString(),
        endtime:TimeSlot.endTime.toString(),
        payment_method: itemSelected,
        cardNo :'',
        expDate:new Date(),
        cvvCode:'',

    })

    const { cardNo,expDate,cvvCode} = BookDetails

    
    const onBooking= async()=>{ 

        if( itemSelected == 'pay_with_card' && (cardNo == ''|| cvvCode =='' || expDate == '')){
            Toast.show("Incomplete Credentials", Toast.SHORT)
        }
        else if(itemSelected == 'pay_with_card' && cardNo.length !== 16){
            Toast.show("Card number must be 16 Digit", Toast.SHORT)
        }
        // else if(cvvCode !== 3){
        //     Toast.show("CVV Code must be 3 Digit" , Toast.SHORT)
        // }
        else{
            console.log("**CONFIRM BOOKING DATA SENDING" ,BookDetails)
            await createBookings(BookDetails,navigation)
           
        }
      

    }

    const onCardNumberUpdate = (text) => {
        const numericRegex = /^([0-9]{1,100})*$/
        if(numericRegex.test(text)) {
            setBookDetails({...BookDetails,cardNo:text})
        }
        else{
            Toast.show("Only Numeric Digits", Toast.SHORT)
        }
    }
    const onCvvUpdate = (text) => {
        const numericRegex = /^([0-9]{1,100})*$/
        if(numericRegex.test(text)) {
            setBookDetails({...BookDetails,cvvCode:text})
        }
        else{
            Toast.show("Only Numeric Digits", Toast.SHORT)
        }
    }
    
    const showDayPicker = () => {
        setDayPickerVisibility(true);
      };
      const hideDayPicker = () => {
        setDayPickerVisibility(false);
      };
      const handleConfirmDay = (date) => {
        setBookDetails({...BookDetails,expDate:moment(date).utc('MM-DD-YYYY')})
        hideDayPicker();
      };
    return(
        <View style={GLOBALSTYLE.screenbg} >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{alignItems:'center',paddingHorizontal:20,marginBottom:25}}>
        <Text style={TEXTSTYLES.sectionHead}>Payment Details</Text>
        <Text style={{color:COLORS.white,fontSize:16,textAlign:'center'}}>Enter your Payment Method to Proceed</Text>
        </View>
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{backgroundColor:COLORS.black,width:'90%',alignSelf:'center',padding:10,borderRadius:4,paddingVertical:20,marginBottom:20}}>
        <ListItem  onPress={() => setItemSelected("pay_in_person")} style={{borderColor:COLORS.transparent}} >
            <Radio
            
               onPress={() => setItemSelected("pay_in_person")}
                color={COLORS.secondry}
                selectedColor={COLORS.secondry}
                selected={itemSelected == "pay_in_person" ? true : false}
              />
              <Text style={{color:COLORS.lightGray,fontSize:18,marginLeft:10,textTransform:'uppercase',fontWeight:'bold'}}>Pay In Person</Text>
          
          </ListItem>
          <ListItem  onPress={() => setItemSelected("pay_with_card")} style={{borderColor:COLORS.transparent}} >
            <Radio
             onPress={() => setItemSelected("pay_with_card")}
                color={COLORS.secondry}
                selectedColor={COLORS.secondry}
                selected={itemSelected == "pay_with_card" ? true : false}
              />
              <Text style={{color:COLORS.lightGray,fontSize:18,marginLeft:10,textTransform:'uppercase',fontWeight:'bold'}}>Pay with card</Text>
          
          </ListItem>
        {
            itemSelected == "pay_with_card" ?  
            <Animatable.View style={{paddingHorizontal:10,marginTop:20}}  animation="slideInUp">
            <Label style={{color:COLORS.lightGray}}>Add Card Number</Label>
          <Item
                   style={styles.inputBox}>
                       <Icon style={{color:COLORS.lightGray}} name="card-outline"></Icon>
                      
                   <Input
                       style={styles.textContent}
                       autoCorrect={false}
                       placeholderTextColor={COLORS.darkgray}
                       placeholder="4561 2445 2424 5254"
                       autoCapitalize="none"
                       value={cardNo}
                       onChangeText={(e) => onCardNumberUpdate(e)}
                   />
               </Item>
               <Label style={{color:COLORS.lightGray,marginTop:10}}>CVV Code</Label>
          <Item
                   style={styles.inputBox}>
                       <Icon style={{color:COLORS.lightGray}} name="keypad-outline"></Icon>
                      
                   <Input
                       style={styles.textContent}
                       autoCorrect={false}
                       placeholderTextColor={COLORS.darkgray}
                       placeholder="326"
                       autoCapitalize="none"
                       value={cvvCode}
                       onChangeText={(e) => onCvvUpdate(e)}
                       
                   />
               </Item>
               <Label style={{color:COLORS.lightGray,marginTop:10}}>Expiry Date</Label>
          <Item
                   style={styles.inputBox}>
                     
                      
                   <Input
                       style={styles.textContent}
                       autoCorrect={false}
                       placeholderTextColor={COLORS.darkgray}
                       placeholder="Expiry Date"
                       autoCapitalize="none"
                       value={moment(expDate).format('LL')}
                       
                       onChangeText={(e)=>setBookDetails({...BookDetails,expDate:e})}
                       disabled={true}
                   />
                     <Icon onPress={showDayPicker} style={{color:COLORS.lightGray}} name="calendar-outline"></Icon>
               </Item>
               
          <DateTimePickerModal
          isVisible={isDayPickerVisible}
          mode="date"
          onConfirm={handleConfirmDay}
          onCancel={hideDayPicker}
          minimumDate={moment().toDate()}
        />
            </Animatable.View> : null
            
        }

<TouchableOpacity
                style={[GLOBALSTYLE.themebtn,styles.alignBtn]}
                mode="contained"
               onPress={onBooking}
                >
                <Text style={{ color: 'white', fontSize: 16,textTransform: 'uppercase',textAlign:'center'}}>Book Now
                </Text>
                
            </TouchableOpacity> 


         
        
          
             
        </ScrollView>
        </View>
    )
}

export default connect(null, { createBookings })(Payment)

const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
    },
    textContent: {
        color: COLORS.lightGray,
        
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