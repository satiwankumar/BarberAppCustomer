import React ,{useEffect,useState} from 'react';
import { Text, StyleSheet, Image,StatusBar,TouchableOpacity,ScrollView ,ImageBackground} from 'react-native';
import { Container, Header, Content,Card,CardItem,Body,FooterTab, Form, Item, Input,Icon, Button, View, Label } from 'native-base';
import {  COLORS, GLOBALSTYLE, SIZES,TEXTSTYLES  } from '../constants'
import {logout} from '../redux/actions/auth'
import {connect, useSelector} from 'react-redux'


const UserProfile = ({navigation,logout}) => {

  const [formData, setFormData] = useState({

    firstname: '',
    lastname: '',
    email:'',
    address:'',
    image:null
  });

  const { firstname, lastname, email,address ,image} = formData
  const currentProfile=useSelector(state=>state.profile.currentProfile);
  const loading=useSelector(state=>state.profile.loading);
useEffect (() =>{
  if (currentProfile && currentProfile.user) {
    setFormData({
      firstname: loading || !currentProfile.user?.firstname ? '' : currentProfile.user?.firstname,
      lastname: loading || !currentProfile.user?.lastname ? '' : currentProfile.user?.lastname,
      email: loading || !currentProfile.user?.email ? '' : currentProfile.user?.email,
      address: loading || !currentProfile.user?.address ? '' : currentProfile.user?.address,
      image: loading || !currentProfile.user?.image ? '' : currentProfile.user?.image

    });
  
  }
},[currentProfile])

const handleLogout = async() =>{
  await logout()
  navigation.navigate('LoginScreen')

}

    return(
        <Container style={styles.container}>
              <StatusBar translucent backgroundColor="transparent" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
          <View>
          <Image style={{height:100,width:100,resizeMode:'cover',margin:10,borderRadius:100,borderWidth:2,borderColor:COLORS.secondry}} source={{uri: image}}/>
          </View>

         
        
        
        <View style={{alignItems:'center'}}>
          <Text style={{color:COLORS.white,fontSize:30,fontFamily:'RobotoSlab-Regular',textTransform:'capitalize'}}>{firstname} {lastname}</Text>
         <View style={{borderWidth:1,borderColor:COLORS.lightGray,padding:10,width:SIZES.width * 0.95,marginTop:20,borderRadius:8}}>
         
         {
           address ? (
<View style={{flexDirection:'row',alignItems:'center',marginBottom:12}}>
          <Icon style={{color:COLORS.white,marginRight:7}} name="location-outline"></Icon>
          <Text style={{color:COLORS.lightGray,fontSize:16,width:'95%'}}>{address}</Text>
          </View>
           ) : null
         }
         


          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Icon style={{color:COLORS.white,marginRight:7}} name="mail-outline"></Icon>
          <Text style={{color:COLORS.lightGray,fontSize:16}}>           
           {email}</Text>
          </View>

         </View>
         

          <TouchableOpacity
                        hasText
                        transparent
                        style={{flexDirection:'row',alignItems:'center',marginTop:15}}
                        onPress={() => navigation.navigate('EditProfile',formData)}
                    >
                      <Icon style={{color:COLORS.secondry}} name="create-outline"></Icon>
                        <Text style={{ color: COLORS.secondry, fontWeight: "bold", fontSize: 16}}>Edit Profile</Text>
                    </TouchableOpacity>
        
          <TouchableOpacity
                style={[GLOBALSTYLE.themebtn,styles.alignBtn]}
                mode="contained"
                onPress={handleLogout}
                >
                <Text style={{ color: 'white', fontSize: 16,textTransform: 'uppercase',}}>LogOut
                </Text>
            </TouchableOpacity> 
              
          
          </View>
          
            

        
        </View>
            </ScrollView>
            </Container>
    )
}



// export default Service;
export default connect(null,{logout})(UserProfile);

// export default UserProfile;
const styles = StyleSheet.create({
    container: {                
      backgroundColor: COLORS.primary,
    },
    alignBtn:{
      marginTop:30,
      alignItems:'center' 
    }
})