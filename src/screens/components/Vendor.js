import React,{useEffect,useState} from 'react';
import { Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from "react-native";
import { Container, Header, Content, Form, Item, Input, Button, View, Icon,Card, CardItem, Body } from 'native-base';
import {  COLORS, SIZES, GLOBALSTYLE ,TEXTSTYLES  } from "../../constants";
import {getNearbyShops} from '../../redux/actions/shops'
import {connect} from 'react-redux'
import {useRoute} from '@react-navigation/native';

const Vendor = ({navigation,getNearbyShops,Shops:{Shops,loading},keyword,latitude,longitude}) => {
  
    
    useEffect (() =>{
        console.log("LONGITUDE,LATITUDE",longitude,latitude,keyword)
        getNearbyShops( latitude,longitude,keyword)
    },[keyword,latitude,longitude])
    const route = useRoute();
    return (
        <>
        
        {Shops && Object.keys(Shops).length>0?
        Shops.data.map((item,index)=>(
        <TouchableOpacity
        key={item._id}
        onPress={() => navigation.navigate('VendorDetail',{shopid: item._id})}
        
        >
        <Card style={styles.shopBox}>
            <CardItem style={{backgroundColor:COLORS.transparent,}}>
              <Body>
              <Image source={{uri: item.image}}
                         resizeMode="cover"
                           style={styles.shopImg}/>
                           
                <View style={styles.shopText}>
                <Text style={styles.shopHead} numberOfLines={1} ellipsizeMode='tail'>{item?.title}</Text>
                <Text style={styles.shopDesc} numberOfLines={2} ellipsizeMode='tail'>{item.address}</Text>
                <View style={{ flexDirection: 'row',marginTop:8 }}>
                <Icon style={{fontSize:15,color:'#ffe31a'}} name='star' />
                    <Text style={{ color: COLORS.lightGray, marginLeft: 5 }}>{item.averageRating} Rating</Text>
                </View>
            </View>
              </Body>
            </CardItem>
          </Card>
          </TouchableOpacity>
 )):  <Text style={{color:COLORS.lightGray,textTransform:'uppercase',marginLeft:10}}>No Shops Found</Text>}
 {Shops && Object.keys(Shops).length>4 && route.name =='Home' ? (
      <Button
      
                onPress={() => navigation.navigate('ViewAll', {type:'Vendors' ,Shops:Shops})}
                style={{ alignSelf: 'center', backgroundColor: '#000', borderRadius: 100, borderWidth: 1, borderColor: '#fff', height: 55, width: 55,marginLeft:10 }}>
                <Icon name='arrow-forward-outline' style={{ fontSize: 24, color: COLORS.white }} />
              </Button>
              

 ) : <Text></Text>} 

 </>
 )
}
    const mapStateToProps = state => ({
        Shops: state.shops
        
    } )
    
    // export default Service;
    export default connect(mapStateToProps,{getNearbyShops})(Vendor);

const styles = StyleSheet.create({
    shopBox: {
        borderWidth: 1,
        borderColor: COLORS.secondry,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        width:300,
        minHeight:300,


    },
    shopHead: {
        color: COLORS.white,
        textTransform: 'uppercase',
        fontSize: 17,
    }
    ,
    shopDesc: {
        color: COLORS.lightGray,
        fontSize: 13,
    },
    shopText: {
        paddingVertical:10
    },
    shopImg: {
        width: '100%',
        height: 160,
        borderRadius: 8,
        flex:1,
        backgroundColor:'#ccc'

    }

});