import React, { useEffect } from 'react';
import { Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity,ActivityIndicator,Modal,FlatList } from 'react-native';
import { Item, Input, Button, View, Label } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { connect, useSelector } from 'react-redux'
import { register } from '../../redux/actions/auth'
import Toast from 'react-native-simple-toast';
import ImgToBase64 from 'react-native-image-base64';
import AddressApi, {getAddressPrediction, getGeoCode} from '../../redux/utils/address';

const SignUp2 = ({ register, Auth:{isAuthenticated,loading},navigation,route  }) => {
    const [viewLoader, setViewLoader] = useState(false)
    const { firstname, lastname, email, password, image } = route.params;
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addressData, setAddressData] = useState([]);
    const [disableSubmit,setDisableSubmit] = useState(false)
    const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
    const [formData, setformData] = useState({
        firstname: firstname,
        lastname: lastname,
        image: image,
        email: email,
        password: password,
        city: '',
        country: '',
        address: '',
        zip_code: '',
        confirmpassword: '',
        role: 'CUSTOMER'

    })
    const { city, country, address, zip_code } = formData

    const getAddress = async text => {
        setDisableSubmit(true)
      setformData({ ...formData, address: text })
  
      const addressList = await getAddressPrediction(text);
      console.log('A_L', addressList);
      if (addressList&&addressList.length > 0) {
        setShowAddressModal(true);
        setAddressData(addressList);
      }
  
      if(text==''){
        setShowAddressModal(false);
      }
    };
    const getLatLongFromAdd =  async (address) => {
       
      setShowAddressModal(false);
      const addressInfo = await getGeoCode(address);
      setformData({ ...formData, address: address ,zip_code: addressInfo.zipCode,country: addressInfo.country,city: addressInfo.city })
      setDisableSubmit(false)
      console.log('Z_C',addressInfo);
      setLat(addressInfo.lat);
      setLong(addressInfo.lng);
    }



    const onSubmit = async () => {
        setViewLoader(true)
if(image !== null) {
    await ImgToBase64.getBase64String(image)
    .then(base64String => {
        console.log("**IMAGE IN BASE 64 FORMAT",base64String)
        setformData({ ...formData, image: base64String })

    }

    )
    .catch(err =>
        Toast.show("Image Type Not Supported", Toast.SHORT)
    );
}
      
        console.log("**SENDING FINAL SIGNUP DATA", formData)
        register(formData,navigation)
       

        // console.log(isRegistered,'STATUS')
    }

    const renderItem = ({item, index}) => {
      return (
        <View
          key={index}
          style={{paddingVertical:5,borderBottomWidth:1,borderBottomColor:COLORS.lightGray,
          }}>
           <TouchableOpacity onPress={()=>getLatLongFromAdd(item.description)}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 14.5,
            }}>
            {item.description}
          </Text></TouchableOpacity>
        </View>
      );
    };


    return (
        <View style={[GLOBALSTYLE.screenbg, styles.container]} >
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>


                <View style={styles.formContent}>
                    <Animatable.Image
                        animation='zoomIn'
                        style={styles.logo}
                        source={require("../../assets/images/logo.png")}
                    />
                    <Text style={styles.headText}> Your Location </Text>
                    <Text style={styles.headDesc}>Enter Address to View Nearby Shops </Text>
                    <View>
                    {showAddressModal && (
            <View
              style={{
                width:'100%',
              }}>
              <View
                style={{ 
                  backgroundColor: COLORS.black,
                  padding:10,
                  borderColor: COLORS.lightGray,
                  borderRadius:5,
                  width:'100%',
                  position:'absolute',
                  bottom:0,
                  paddingBottom:20,
                  paddingHorizontal:15
                }}>
                <FlatList
                  data={addressData.slice(0,3)}
                  renderItem={renderItem}
                />
              </View>
            </View>
          )}
          
           <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Address</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.lightGray}
                            autoCapitalize="none"
                            onChangeText={text => getAddress(text)}
                            value={address}
                        />
                    </Item>
                    </View>
                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Country</Label>
                        <Input
                        
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.white}
                            autoCapitalize="none"
                            value={country}
                            onChangeText={(e) => setformData({ ...formData, country: e })}
                        />
                    </Item>
                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>City</Label>
                        <Input
                        
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.white}
                            autoCapitalize="none"
                            value={city}
                            onChangeText={(e) => setformData({ ...formData, city: e })}
                        />
                    </Item>
               
                   

                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Zip Code</Label>
                        <Input
                        
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.white}
                            autoCapitalize="none"
                            value={zip_code}
                            onChangeText={(e) => setformData({ ...formData, zip_code: e })}
                        />
                    </Item>
                    <Button
                       style={disableSubmit ? styles.disabledBtn : GLOBALSTYLE.themebtn }
                        mode="contained"
                        onPress={onSubmit}
                        disabled={disableSubmit ? true : false}
                    // onPress= {() => props.navigation.navigate('FindServices')}
                    >
                        <Text style={{ color: 'white', fontSize: 16, textTransform: 'uppercase' }}>{
                        viewLoader ?  loading ? <ActivityIndicator size="large" color={COLORS.secondry} style={{marginTop:120}}/> :'register'  : 'register'
                    }
                        </Text>
                    </Button>


                </View>
            </ScrollView>

           

        </View>
    )
}

const mapStateToProps = state => ({
    Auth: state.auth
})


export default connect(mapStateToProps, { register })(SignUp2)



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledBtn:{
        marginTop: 20,
        width: 200,
        height: 50,
        backgroundColor: COLORS.black,
        borderColor:COLORS.secondry,
        borderWidth:1,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius: 8,
        textAlign:'center',
        opacity:0.5
      },
    logo: {
        width: SIZES.width * 0.30,
        height: SIZES.width * 0.30,
        resizeMode: "contain",
        marginTop: 0,
        marginBottom:10,
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
    headDesc: {
        color: COLORS.lightGray,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 8,
    },
    textContent: {
        color: COLORS.white
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
        paddingHorizontal:10
    },
    labelContent: {
        color: COLORS.lightGray,
        marginLeft: 20,
        marginTop: -13,
    },
    formContent: {
        width: SIZES.width * 0.80,
        alignItems: 'center',
    }

});