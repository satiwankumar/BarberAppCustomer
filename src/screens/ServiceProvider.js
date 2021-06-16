import React,{useEffect} from "react";
import { View, Text, StyleSheet,Image,ImageBackground,StatusBar,ScrollView ,TouchableOpacity} from "react-native";
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from '../constants';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Form, Item, Input, Button, Icon,Card, CardItem, Body } from 'native-base';
import Vendor from './components/Vendor'
import {shopsByService} from '../redux/actions/shops'
import {connect} from 'react-redux'

const ServiceProvider = ({shopsByService,ShopsService:{ShopsService,loading},route,navigation}) => {
  const ServiceId = route.params.ServiceId;
  // const ServiceId ='608075a7a928e83f00c91752';
  const ServiceName = route.params.ServiceName;
 
  useEffect (() =>{
    shopsByService(ServiceId)
},[shopsByService,ServiceId])

  return (
    <View style={GLOBALSTYLE.screenbg} >
    <StatusBar translucent backgroundColor="transparent"/>
  <Animatable.View style={styles.formPart}
    animation="slideInUp"
    >
        <Text style={TEXTSTYLES.sectionHead}>{ServiceName} Services</Text>
        
       <ScrollView contentContainerStyle={{ flexGrow: 1 ,alignItems:'center'}}>
       {ShopsService && Object.keys(ShopsService).length > 0?

ShopsService.data.map((item,index)=>(
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
          <Text style={styles.shopHead}>{item?.title}</Text>
          <Text style={styles.shopDesc}>{item.address}</Text>
          <View style={{ flexDirection: 'row',marginTop:8 }}>
          <Icon style={{fontSize:15,color:'#ffe31a'}} name='star' />
              <Text style={{ color: COLORS.lightGray, marginLeft: 5 }}>{item.averageRating} Rating</Text>
          </View>
      </View>
        </Body>
      </CardItem>
    </Card>
    </TouchableOpacity>
)):<Text>No Shop found</Text>}
       </ScrollView>
    </Animatable.View> 
   </View>
    
  );
};


const mapStateToProps = state => ({
  ShopsService : state.shops
})

// export default ServiceProvider;
export default connect(mapStateToProps,{shopsByService})(ServiceProvider);

const styles = StyleSheet.create({
    formPart:{
        flex:3,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:COLORS.primary,
        paddingHorizontal:10
    },
    imageBg:{
        width:'100%',
        resizeMode:'cover',
        flex:1,
        height:450,
        backgroundColor: COLORS.secondry,
        opacity: 0.6,
    },
    shopBox: {
      borderWidth: 1,
      borderColor: COLORS.secondry,
      borderRadius: 8,
      backgroundColor: COLORS.primary,
      width:SIZES.width*0.87,
      maxWidth:350,
      marginLeft:15,
      minHeight:290,
      maxHeight:300,
      height:SIZES.width*0.82


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
