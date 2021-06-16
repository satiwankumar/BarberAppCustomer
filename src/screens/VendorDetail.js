
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from '../constants';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Form, Item, Input, Button, Label, Icon, Card, CardItem, Body, Col } from 'native-base';
import Service from './components/Service'
import PopularService from './components/PopularService'
import Package from "./components/Package";
import Review from './components/Review'
import { useState } from "react";
import { connect } from 'react-redux'

import { getShopById } from '../redux/actions/shops'

const VendorDetail = ({ route, navigation, getShopById, Shop: { Shop, loading } }) => {
  // alert(props.route.params.shopid)
  const shopId = route.params.shopid;
  useEffect(() => {
    getShopById(shopId)
  }, [getShopById, shopId])

  console.log("COLOOO", shopId)
  console.log("DUKAAANn", Shop)
  const [showAcc1, setshowAcc1] = useState(true)
  const [showAcc2, setshowAcc2] = useState(false)
  const [showAcc3, setshowAcc3] = useState(false)
  const [showAcc4, setshowAcc4] = useState(false)
  return (
    Shop !== null || Shop != undefined ? (
      <View style={GLOBALSTYLE.screenbg} >
        <StatusBar translucent backgroundColor="transparent" />

        <ImageBackground source={require("../assets/images/b4.jpg")}
          style={styles.imageBg}>
          <View style={styles.overlay}></View>
          <View style={{ flexDirection: 'row', padding: 20, alignItems: 'flex-end', justifyContent: 'space-around', zIndex: 2, flex: 1 }}>
            <Text style={styles.bannerTitle}>{Shop.title}</Text>

            <View style={{ width: '30%', flexDirection: 'row', textAlign: 'right', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 20, color: COLORS.primary, fontWeight: 'bold' }}>{Shop.averageRating}
              </Text>
              <Icon name='star' style={{ fontSize: 24, color: '#f3c030' }} />
            </View>
          </View>
        </ImageBackground>

        <Animatable.View style={styles.formPart}
          animation="slideInUp"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>

              <Text style={TEXTSTYLES.sectionHead}>Gallery</Text>
              <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false} >
              
              {Shop.images.map((image,index) => (
               <Image key={index} style={{height:300,borderRadius:8,width:200,resizeMode:'cover',margin:10}} source={{uri: image}}/>
              ))
            }
              
                
              </ScrollView>
               
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={TEXTSTYLES.sectionHead}>Availible Services</Text>
                
                <TouchableOpacity onPress={() => setshowAcc1(!showAcc1)}>
                  <Icon style={{ color: COLORS.white }} name="chevron-down-outline"></Icon>
                </TouchableOpacity>

              </View>
             
                
              {showAcc1 ?
                <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false} >
                   { Shop.services.map((item,index)=>(
<TouchableOpacity key={item._id} style={styles.serviceBox}
onPress={ () => navigation.navigate('BookNow',{Shop: Shop, Service: item}) }
>
              
              <View style={{ flex: 2 }}>
              <Image
                    source={{uri: item.images[0]}}
                    resizeMode="contain"
                    style={styles.serviceImg}
                />
            </View>
            <View style={{ flex: 1 }}>
                 <Text style={styles.serviceText}>{item.title}</Text>
                
            </View>
            
            </TouchableOpacity>
            ))}
                 
                </ScrollView> : null}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={TEXTSTYLES.sectionHead}>Packages & Offers</Text>
              <TouchableOpacity onPress={() => setshowAcc2(!showAcc2)}>
                <Icon style={{ color: COLORS.white }} name="chevron-down-outline"></Icon>
              </TouchableOpacity>

            </View>
            <Animatable.View animation="slideInDown">
              {showAcc2 ?
                <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false} >
                  <Package
                    shopid={shopId}
                  />


                </ScrollView> : null}
            </Animatable.View>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={TEXTSTYLES.sectionHead}>
                Popular Services
           </Text>
              <TouchableOpacity onPress={() => setshowAcc3(!showAcc3)}>
                <Icon style={{ color: COLORS.white }} name="chevron-down-outline"></Icon>
              </TouchableOpacity>

            </View>
            {showAcc3 ?
              <View>
                <PopularService
                  serviceImg={require("../assets/images/pop1.jpg")}
                  serviceName='Hair Styling'
                  time='45'
                  price='30'
                />
                <PopularService
                  serviceImg={require("../assets/images/fac.jpg")}
                  serviceName='Facial Treatment'
                  time='60'
                  price='30'
                />
              </View> : null}





            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={TEXTSTYLES.sectionHead}>Reviews</Text>
              <TouchableOpacity onPress={() => setshowAcc4(!showAcc4)}>
                <Icon style={{ color: COLORS.white }} name="chevron-down-outline"></Icon>
              </TouchableOpacity>

            </View>
            <View>
              <Review
                shopid={shopId} />
            </View>


          </ScrollView>
        </Animatable.View>
      </View>
    ) : <Text></Text>

  );
};

const mapStateToProps = state => ({
  Shop: state.shops

})
export default connect(mapStateToProps, { getShopById })(VendorDetail);


const styles = StyleSheet.create({
  formPart: {
    flex: 3,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  imageBg: {
    width: '100%',
    resizeMode: 'cover',
    flex: 1,
    height: 350,
    // backgroundColor: COLORS.secondry,
    // opacity: 0.6,
  }
  ,
  overlay: {
    backgroundColor: COLORS.secondry,
    position: 'absolute',
    width: '100%',
    height: '130%',
    opacity: 0.5,
    zIndex: 1
  },
  bannerTitle: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: 'bold',
    width: '70%',

  },
  serviceImg: {
    width: 60,
    height: 60,
  },
  serviceBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.secondry,
    height: SIZES.width * 0.35,
    width: SIZES.width * 0.35,
    maxWidth:130,
    maxHeight:130,
    borderRadius: 8,
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
},
serviceText: {
    color: COLORS.white,
    fontSize: SIZES.h4,

},
serviceImg: {
    width: 60,
    height: 60,
}
});
