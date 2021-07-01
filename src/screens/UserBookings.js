import React,{useEffect, useState} from 'react';
import { Text, StyleSheet, Image,StatusBar,TouchableOpacity,ScrollView ,ImageBackground, Alert} from 'react-native';
import { Container, Header, Content,Card,CardItem,Body,FooterTab, Form, Item, Input,Icon, Button, View, Label } from 'native-base';
import {  COLORS,TEXTSTYLES  } from '../constants'
import { connect, useDispatch } from 'react-redux'
import { bookingStatus, getBookings } from '../redux/actions/booking'
import moment from 'moment';
import { color } from 'react-native-reanimated';
const UserBookings = ({getBookings,Bookings: {Bookings,loading}}) => {
  const [cancelAlert, setCancelAlert] = useState(false)
  const [paymentAlert, setPaymentAlert] = useState(false)
  const dispatch = useDispatch()

  
  useEffect(() => {
    getBookings()
  },[getBookings,loading])


  const displayCancelAlert = (id) => {
    const data = {
      booking_id:id,
      status:"Cancelled"
    }
    
    Alert.alert(
      "Cancel Booking Appointment",
      "Payment by card will be returned within 5 business days.",
      [
        {
          text: "Exit",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Cancel", onPress: () => dispatch(bookingStatus(data))}
      ]
    )
  }

  
    return(
        <Container style={styles.container}>
              <StatusBar translucent backgroundColor="transparent" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
    <Text style={TEXTSTYLES.sectionHead}>my Bookings</Text>
    </View>

    { Bookings && Object.keys(Bookings).length>0?
            Bookings.data.map((item,index)=>(
              <Card key={item._id} style={{backgroundColor:'#000',borderRadius:5}}>
                {
                  item?.status == 'Accepted' || item?.status == 'Pending'   ? (
                    <View style={{alignSelf:'flex-end', marginTop:10,marginRight:10}}>
                    <TouchableOpacity onPress={()=>displayCancelAlert(item?._id)}>
                      <Icon style={{color:COLORS.lightGray,fontSize:20}} name="close-sharp"></Icon>
                    </TouchableOpacity>
                    </View>
                  ) : null
                }              
              <CardItem style={{backgroundColor:COLORS.transparent}}>
                <Body style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View>
                    <Text style={{color:COLORS.white,textTransform:'uppercase',fontSize:17,fontWeight:'bold'}}>
                      {item?.service.title}
                    </Text>
                    
                  
                  <Text style={{color:COLORS.white,marginBottom:2}}>By {item?.shop.title}</Text>
                  <Text style={{color:COLORS.white,marginBottom:10,textTransform:'uppercase',fontSize:12}}>{moment.utc(item?.date.toLocaleString()).format("LL")} ({item?.time})</Text>
                 
                    
                    </View>
                 
                  <Text style={{color:COLORS.secondry,fontSize:20}}>
                 $ {item?.charges}
                  </Text>

                

                </Body>
        
              </CardItem>
                  <View style={{marginBottom:10, alignSelf:'flex-end',marginRight:20}}>
                  
                    <Text style={item.status == "Cancelled" ? {color:'#923f3f',textTransform:'uppercase'} : (item?.status == "Accepted" ? {color:'#50923f',textTransform:'uppercase'} : {color:'#5858c3',textTransform:'uppercase'})}>{item?.status}</Text>
                  
                  </View>
            </Card>

            )):   <View style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',marginTop:'1%'}}>
            <Icon style={{color:COLORS.lightGray,fontSize:90}} name="calendar-outline"></Icon>
              <Text style={{ color:COLORS.lightGray,fontSize:20,textTransform:'uppercase',fontWeight:'bold',letterSpacing:1}}>No Appointments</Text>
            </View>
}



        
        
          
            </ScrollView>
            </Container>
    )
}

const mapStateToProps = state => ({
  Bookings: state.booking

})
export default connect(mapStateToProps, { getBookings })(UserBookings);
const styles = StyleSheet.create({
    container: {                
      backgroundColor: COLORS.primary,
    },
})