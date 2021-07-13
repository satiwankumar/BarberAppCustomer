
import React from "react";
import { View, Text, StyleSheet,Image,ImageBackground,StatusBar,ScrollView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Form, Item, Input, Button,  Label ,Icon} from 'native-base';


const FindServices =({navigation}) => {
  return (
    <View style={GLOBALSTYLE.screenbg} >
    <StatusBar translucent backgroundColor="transparent"/>
    
    <ImageBackground source={require("../../assets/images/b6.jpg")}
        style={styles.imageBg}>
      </ImageBackground>

    <Animatable.View style={styles.formPart}
    animation="slideInUp"
    >
       <ScrollView contentContainerStyle={{ flexGrow: 1,alignItems:'center' }}>
         <Text style={{color:COLORS.white,fontSize:22,textAlign:'center',textTransform:'uppercase',fontFamily:'RobotoSlab-Regular'}}>Book-king lets you find nearby services Effortlessly</Text>
         <Text style={{color:COLORS.lightGray,fontSize:20,marginBottom:30,textAlign:'center'}}>Show me Services For:</Text>
         <TouchableOpacity onPress={() => navigation.navigate('LocationAccess',{typeKey: 'Men'})} style={{backgroundColor:COLORS.black,padding:12,borderRadius:8,borderColor:COLORS.secondry,borderWidth:1,marginBottom:7,width:320}}>
             <Text style={{color:COLORS.white,textTransform:'uppercase',fontSize:20,textAlign:'center'}}>Men</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('LocationAccess',{typeKey: 'Women'})} style={{backgroundColor:COLORS.black,padding:12,borderRadius:8,borderColor:COLORS.secondry,borderWidth:1,marginBottom:7,width:320}}>
             <Text style={{color:COLORS.white,textTransform:'uppercase',fontSize:20,textAlign:'center'}}>WOmen</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('LocationAccess',{typeKey: 'Both'})} style={{backgroundColor:COLORS.black,padding:12,borderRadius:8,borderColor:COLORS.secondry,borderWidth:1,marginBottom:7,width:320}}>
             <Text style={{color:COLORS.white,textTransform:'uppercase',fontSize:20,textAlign:'center'}}>Both</Text>
         </TouchableOpacity>
       </ScrollView>
    </Animatable.View>
   </View>
    
  );
};

export default FindServices;

const styles = StyleSheet.create({
    formPart:{
        flex:1.5,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:COLORS.primary,
        paddingVertical:30,
        paddingHorizontal:10,
        top:-20
    },
    imageBg:{
        width:'100%',
        resizeMode:'cover',
        flex:1,
        height:350,
        backgroundColor: COLORS.secondry,
        opacity: 0.6,
    }
});
