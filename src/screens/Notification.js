import React,{useEffect} from 'react';
import {View, Text,ScrollView,StyleSheet,StatusBar} from 'react-native';
import { Container, Header, Content, Accordion, Form, Item, Input, Button, Icon, TouchableOpacity, Card, CardItem, Body } from 'native-base';
import {  COLORS, SIZES,TEXTSTYLES  } from '../constants'
import { useSelector } from 'react-redux';
import moment from 'moment';
import {getUserNotifications} from '../redux/actions/auth'
import {connect} from 'react-redux'
const Notification = ({getUserNotifications,Auth:{Notifications}}) => {
  useEffect(() => {
    getUserNotifications();
  },[]);
    return(
      <Container style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
<View style={{paddingHorizontal:10}}>
<Text style={TEXTSTYLES.sectionHead}>Notifications</Text>
{ Notifications && Object.keys(Notifications).length>0?
            Notifications.data.map((item,index)=>(
              <Card key={index} style={{backgroundColor:COLORS.black,padding:10,borderColor:COLORS.transparent,width:'96%',alignSelf:'center'}} >
<Text style={{color:COLORS.lightGray}}>{moment.utc(item?.date.toLocaleString()).format("LL")}</Text>



<Text style={{color:COLORS.white ,fontSize:16,fontWeight:'bold',textTransform:'uppercase',letterSpacing:1}}>{item?.title}</Text>
<Text style={{color:COLORS.lightGray}}>{item?.body}</Text>

</Card>

            )): null}


</View>
</ScrollView>
</Container>
    )
}

const mapStateToProps = (state) => ({
  Auth : state.auth
});
export default connect(mapStateToProps,{getUserNotifications})(Notification);
const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
    },
  });