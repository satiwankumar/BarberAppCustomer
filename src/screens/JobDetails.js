import React from 'react';
import {View, Text,ScrollView,StyleSheet,StatusBar} from 'react-native';
import { Container, Header, Content, Accordion, Form, Item, Input, Button, Icon, TouchableOpacity, Card, CardItem, Body } from 'native-base';
import {  COLORS, SIZES,TEXTSTYLES  } from '../constants'
import * as Animatable from 'react-native-animatable';

const JobDetails = ({route,navigation}) => {
    // console.log("irtemmmm",item.shop.title)
    const item= route.params.item
    const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const date =  new Date(item.shop.createdAt)
    console.log("dadadda",item._id)
    return(
        <Container style={styles.container}>
           
        <ScrollView style={{marginTop:10}}>
          <Text style={{color:COLORS.lightGray,padding:10,textTransform:'uppercase',fontSize:20,}}>Job description</Text>
        <Animatable.View
         animation='fadeInUp'
         style={{padding:20,borderRadius:8,width:'95%',maxWidth:400,alignSelf:'center',height:'auto',backgroundColor:COLORS.black}}>
        <Text style={{ color: COLORS.secondry, textTransform: 'uppercase', fontSize: 17,fontWeight:'bold' }}>
                  {item.title}
                </Text>
                <Text style={{ color: COLORS.white, marginBottom: 10 }}>{item.shop.title} - {item.shop.address}</Text>
                <Text style={{ color: COLORS.lightGray }}>
                 Job Posted: {mlist[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
                </Text>
                <Text style={{ color: COLORS.lightGray }}>
                 {item.description}
                </Text>
                <Text style={{ color: COLORS.white,marginTop:10}}>
                 Send your Resume at: {item.email}
                </Text>
        </Animatable.View>
        
        </ScrollView>
        </Container>
    )
}

export default JobDetails;
const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
    },
  });