import React,{useEffect, useState} from 'react';
import { Text, StyleSheet, Image,StatusBar,TouchableOpacity,ScrollView ,ImageBackground, Alert} from 'react-native';
import { Container, Header, Content,Card,CardItem,Body,FooterTab, Form, Item, Input,Icon, Button, View, Label } from 'native-base';
import {  COLORS,TEXTSTYLES  } from '../constants'
import { connect, useDispatch } from 'react-redux'
import { bookingStatus, getBookings } from '../redux/actions/booking'

const UserBookings = ({getBookings,Bookings: {Bookings,loading}}) => {
  const [cancelAlert, setCancelAlert] = useState(false)
  const [paymentAlert, setPaymentAlert] = useState(false)
  const dispatch = useDispatch()

  const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
  useEffect(() => {
    getBookings()
  }, [getBookings,loading,Bookings])

  console.log('BOOKINH',Bookings)

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
                  item.status != 'Cancelled' ? (
                    <View style={{alignSelf:'flex-end', margin:10}}>
                    <TouchableOpacity onPress={()=>displayCancelAlert(item._id)}>
                      <Icon style={{color:COLORS.lightGray,fontSize:20}} name="close-sharp"></Icon>
                    </TouchableOpacity>
                    </View>
                  ) : null
                }              
              <CardItem style={{backgroundColor:COLORS.transparent}}>
                <Body style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View>
                    <Text style={{color:COLORS.white,textTransform:'uppercase',fontSize:17}}>
                      {item.service.title}
                    </Text>
                    
                  
                  <Text style={{color:COLORS.white,marginBottom:2}}>By {item.shop.title}</Text>
                  <Text style={{color:COLORS.white,marginBottom:10}}>{mlist[new Date(item.createdAt).getMonth()]} {new Date(item.createdAt).getDate()}, {new Date(item.createdAt).getFullYear()} Time: ({item.time.split(',',1)})</Text>
                    </View>
                 
                  <Text style={{color:COLORS.secondry,fontSize:20}}>
                 $ {item.charges}
                  </Text>

                

                </Body>
        
              </CardItem>
                  <View style={{margin:10, alignSelf:'flex-end'}}>
                    {
                      item.status == "Cancelled" ? <Text style={{color:'red'}}>CANCELLED</Text> : <Text style={{color:'green'}}>CONFIRM</Text>
                    }
                  </View>
            </Card>

            )):   <View style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',marginTop:'40%'}}>
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