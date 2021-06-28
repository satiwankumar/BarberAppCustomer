import React ,{useState , useEffect} from 'react';
import { Text, StyleSheet,StatusBar,ScrollView ,Image, TouchableOpacity,ImageBackground} from 'react-native';
import { Item, Input, Button, View, Label,Icon } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import { updateProfile } from '../../redux/actions/profile'
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import ImgToBase64 from 'react-native-image-base64';
import { getCurrentProfile } from '../../redux/actions/profile'



const EditProfile = ({ navigation,updateProfile,route,getCurrentProfile,Profile:{currentProfile,loading}}) => {
    const [formData, setFormData] = useState({

        firstname: '',
        lastname: '',
        address:'',
        image:null
      });
    
      const { firstname, lastname, email,address ,image} = formData
      useEffect (() =>{
        getCurrentProfile();
        if (currentProfile && currentProfile.user) {
          setFormData({
            firstname: loading || !currentProfile.user.firstname ? '' : currentProfile.user.firstname,
            lastname: loading || !currentProfile.user.lastname ? '' : currentProfile.user.lastname,
            address: loading || !currentProfile.user.address ? '' : currentProfile.user.address,
            image: loading || !currentProfile.user.image ? '' : currentProfile.user.image
      
          });
        
        }
      },[loading,getCurrentProfile])
    const onSubmit= async ()=>{
        await updateProfile(formData)
        console.log(formData)
        navigation.goBack()
           
        
       
      }

      const chooseFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(avatar => {
            console.log("Image", avatar);
            setFormData({ ...formData, image: avatar.path })
            
            

        });
    }

    return (
        <View style={[GLOBALSTYLE.screenbg,styles.container]} >
            <StatusBar translucent backgroundColor="transparent"/>
            
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.formContent}>
                <Text style={styles.headText}> Edit Profile </Text>
               
                <Item
                    style={styles.inputBox}>
                        <Icon style={{color:COLORS.lightGray}} name="person-outline"></Icon>
                    <Input
                         style={{color:COLORS.white,fontSize:16}}
                         placeholderTextColor={COLORS.lightGray}
                         placeholder="Add First Name"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={firstname}
                        onChangeText={(e)=>setFormData({...formData,firstname:e})}
                    />
                </Item>

                <Item
                    style={styles.inputBox}>
                        <Icon style={{color:COLORS.lightGray}} name="person-outline"></Icon>
                    <Input
                         style={{color:COLORS.white,fontSize:16}}
                         placeholderTextColor={COLORS.lightGray}
                         placeholder="Add Last Name"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={lastname}
                        onChangeText={(e)=>setFormData({...formData,lastname:e})}
                    />
                </Item>
                <Item
                    style={styles.inputBox}>
                        <Icon style={{color:COLORS.lightGray}} name="location-outline"></Icon>
                    <Input
                        style={{color:COLORS.white,fontSize:16}}
                        placeholderTextColor={COLORS.lightGray}
                        placeholder="Add Your Location"
                        autoCorrect={false}
                       
                        autoCapitalize="none"
                        value={address}
                        
                        onChangeText={(e)=>setFormData({...formData,address:e})}
                    />
                </Item>

                <Button
                    style={GLOBALSTYLE.themebtn}
                    mode="contained"
                    onPress={onSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 14, textTransform: 'uppercase' }}>save details</Text>
                </Button>
            </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => ({
    Profile: state.profile
  });

export default connect(mapStateToProps,{getCurrentProfile, updateProfile})(EditProfile);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: SIZES.width * 0.30,
        height: SIZES.width * 0.30,
        resizeMode: "contain",
        marginVertical: 30,
        alignSelf: 'center'
    },
    headText: {
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 32,
        color: COLORS.white,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    headDesc:{ 
        color: COLORS.lightGray, 
        fontSize: 14, 
        textAlign: 'center',
         marginBottom: 20,
         },
    textContent: {
        color: COLORS.white,
        
    },
    inputBox: {
        marginTop: 10,
        backgroundColor: COLORS.black,
        color: '#707070',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: COLORS.transparent,
        marginTop: 20,
        paddingHorizontal:15
    },
    labelContent: {
        color: COLORS.lightGray,
        marginLeft: 20,
        marginTop: -13,
    },
    formContent: {
        width: SIZES.width * 0.80,
        alignItems: 'center',
        maxWidth:400
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        
      },
      avatarimg: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 50,
        alignItems:'center',
        display:'flex',
        justifyContent: 'center'
    
      }

});