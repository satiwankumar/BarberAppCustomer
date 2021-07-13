import React,{useState} from "react";
import { Text, StyleSheet, ImageBackground, Image,ScrollView,StatusBar,TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { COLORS, SIZES, TEXTSTYLES } from "../constants";
import { Container, Header, Content, Form, Item, Input, Button, View, Icon,Card, CardItem, Body } from 'native-base';
import Service from './components/Service'

import Vendor from './components/Vendor'
const ViewAll = ({navigation,route }) => {
  const  passedRoute = route.params.type;
  const Shops =route.params.Shops
  console.log("hgyh",passedRoute,Shops)
    const [keyword,setKeyword] = useState('')
  return (
    

   
    <Container style={styles.container}>
       <StatusBar translucent backgroundColor="transparent"/>
      <ScrollView>
      {/* <Header searchBar rounded style={{ backgroundColor: COLORS.primary }}>
          <Item style={{ backgroundColor: COLORS.black, height: 50, borderRadius: 8 }}>
            <Icon name="ios-search" />
            <Input placeholder="Search Shop" style={{ color: COLORS.white }}
            value={keyword}
            onChangeText={(e)=>setKeyword(e)}
             />
             <Button style={{backgroundColor:COLORS.transparent,elevation:0}} onPress={() => setKeyword('')}>
             <Icon style={{color:COLORS.lightGray}}  name="close-sharp"></Icon>
             </Button>
            
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header> */}

        <Text style={TEXTSTYLES.sectionHead}>View All {passedRoute}</Text>

        <View style={styles.servicePage} >
        {  passedRoute === 'Services'  ? 
        <Service />
         : passedRoute === 'Vendors'  && Shops && Object.keys(Shops).length>0 ? 
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
        
         ))
         : null
         }
          </View>
    </ScrollView>
    </Container>
    
  );
};

export default ViewAll;

const styles = StyleSheet.create({
  container: {                
    backgroundColor: COLORS.primary,
  },
 

servicePage:{
},
shopBox: {
  borderWidth: 1,
  borderColor: COLORS.secondry,
  borderRadius: 8,
  backgroundColor: COLORS.primary,
  width:'90%',
  maxWidth:400,
  minHeight:300,
  display:'flex',
  alignSelf:'center'


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
