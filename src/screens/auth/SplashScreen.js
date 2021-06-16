import React ,{useEffect} from 'react';
import { View, Text, StyleSheet,Image,ImageBackground,StatusBar,ScrollView ,ActivityIndicator} from "react-native";
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Form, Item, Input, Button,  Label } from 'native-base';


const SplashScreen = (props,navigation) => {
    useEffect(() => {
        setTimeout(()=>{
            props.navigation.navigate('LoginScreen')
        },2000)
      });
  return (
    <View style={[GLOBALSTYLE.screenbg,styles.container]} >
    <StatusBar translucent backgroundColor="transparent"/>

    <Animatable.Image
     animation='bounceIn'
                    style={styles.logo}
                    source={require("../../assets/images/logo.png")}
                />
                <Animatable.View animation='fadeInUp' delay={3} style={{alignItems:'center'}}>
                <Text style={{color:COLORS.lightGray,marginTop:30,fontFamily: 'RobotoSlab-Regular',textTransform:'uppercase',fontSize:30,fontWeight:'bold'}}>Book - king</Text>
                <Text style={{color:COLORS.lightGray,fontSize:16}}>
                    Appointment Booking Made Easy
                </Text>
                </Animatable.View>
                
                <ActivityIndicator size="large" color={COLORS.secondry} style={{marginTop:120}}/>
  
   </View>
    
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        width :SIZES.width * 0.40,
        height:150,
        resizeMode:'contain'

    }
});
