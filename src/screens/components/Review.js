import React,{useEffect} from 'react';
import { Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from "react-native";
import { Container, Header, Content, Form, Item, Input, Button, View, Icon,Card, CardItem, Body } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE ,TEXTSTYLES  } from "../../constants";
import {connect} from 'react-redux'
import {getShopReviews} from '../../redux/actions/shops'

const Review = ({navigation,getShopReviews,Reviews:{Reviews,loading},shopid}) => {
    console.log("HHELLOOOOOOOOOO WO",shopid)
    const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    // const date =  new Date(item.createdAt)
    useEffect (() =>{
        getShopReviews(shopid)
    },[getShopReviews,shopid])
    console.log("SHOPP REVIEWS",Reviews)
    return (
        <View>
        {Reviews && Object.keys(Reviews).length > 0?

        Reviews.reviews.map((item,index)=>(
         <Card key={item._id} style={{backgroundColor:COLORS.primary}}>
        <CardItem style={{backgroundColor:COLORS.transparent}}>
          <Body>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{height:60,width:60,borderRadius:100,overflow:'hidden'}}>
                <Image source={{uri : item.user.image}} resizeMode="cover"
                       style={{width:'100%',height:'100%'}}/>
                </View>
              
                    
                       <View style={{marginLeft:20}}>
                       
                           <Text style={{color:COLORS.white,textTransform:'capitalize'}}>{item.user.firstname} {item.user.lastname}</Text>
                           <Text style={{color:COLORS.lightGray}}>{mlist[new Date(item.createdAt).getMonth()]} {new Date(item.createdAt).getDate()}, {new Date(item.createdAt).getFullYear()}</Text>
                       </View>
              </View>
            

            <View style={styles.shopText}>
            <Text style={{color:COLORS.white}}>{item.message}</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
              
                {
                    [...Array(item.rating)].map((e, i) => <Icon key={i} style={{color:COLORS.yellow,fontSize:15,marginRight:3}} name="star"></Icon>)
                }
                {
                    [...Array(5-item.rating)].map((e, i) => <Icon key={i} style={{color:"#ccc",fontSize:15,marginRight:3}} name="star"></Icon>)
                }
                
            
            
            </View>
        </View>
          </Body>
        </CardItem>
      </Card>
            )):<Text style={{color:COLORS.lightGray,textAlign:'center'}}>No Reviews to show</Text>}
        
        </View>
  
    
    )}

    const mapStateToProps = state => ({
        Reviews: state.shops
        
    } )
    
    // export default Review;
    export default connect(mapStateToProps,{getShopReviews})(Review);

const styles = StyleSheet.create({
    shopBox: {
        borderWidth: 1,
        borderColor: COLORS.secondry,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        width:300,
        marginLeft:15

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
        flex:1

    }

});