import React from 'react';
import { Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from "react-native";
import { Container, Header, Content, Form, Item, Input, Button, View, Icon,Card, CardItem, Body } from 'native-base';
import {  COLORS, SIZES, GLOBALSTYLE ,TEXTSTYLES  } from "../../constants";

const Popular = (props) => {
    return (
        <View style={{flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:COLORS.secondry,borderRadius:10,margin:15}}>
                     <View style={{width:'40%'}}>
                     <Image
                             source={props.serviceImg}
                             resizeMode="cover"
                             style={styles.shopImg}
                         />
                     </View>
                     <View style={{width:'60%',padding:20}}>
                       <Text style={{color:COLORS.white,fontSize:20,marginBottom:5}}>{props.serviceName}</Text>
                       
                       <Text style={{color:COLORS.lightGray,fontSize:16}}>
                         {props.time} Mins
                       </Text>
                       <Text style={{color:COLORS.secondry,fontSize:20}}>
                         ${props.price}
                       </Text>
                      
                     </View>
                   </View>
    
)
    }

export default Popular;

const styles = StyleSheet.create({
    shopImg: {
        width: '100%',
        height: 140,
        borderRadius: 8,
        flex:1

    }
});