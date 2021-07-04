import React ,{useState , useEffect} from 'react';
import { Text, StyleSheet,StatusBar,ScrollView ,Image, TouchableOpacity,ImageBackground,FlatList } from 'react-native';
import { Item, Input, Button, View, Label,Icon } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import { updateProfile } from '../../redux/actions/profile'
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { getCurrentProfile } from '../../redux/actions/profile'
import AddressApi, {getAddressPrediction, getGeoCode} from '../../redux/utils/address';


const EditProfile = ({ navigation,updateProfile,route,getCurrentProfile,Profile:{currentProfile,loading}}) => {
    const [formData, setFormData] = useState({

        firstname: '',
        lastname: '',
        address:'',
        image:null
      });
      const [showAddressModal, setShowAddressModal] = useState(false);
      const [addressData, setAddressData] = useState([]);
      const [disableSubmit,setDisableSubmit] = useState(false)
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
        console.log("**SENDING EDIT DATA",formData)
        navigation.goBack()
      }

      const getAddress = async text => {
        setDisableSubmit(true)
        setFormData({ ...formData, address: text })
    
        const addressList = await getAddressPrediction(text);
        console.log('A_L', addressList);
        if (addressList&&addressList.length > 0) {
         
          setShowAddressModal(true);
          console.log("TRYkzdjj",showAddressModal)
          setAddressData(addressList);
        }
    
        if(text==''){
          setShowAddressModal(false);
          
        }
      };
      const getLatLongFromAdd =  async (address) => {
        setShowAddressModal(false);
        console.log("YAHHAH",address  )
        const addressInfo = await getGeoCode(address);
        setFormData({ ...formData, address: address })
        setDisableSubmit(false)
        console.log('Z_C',addressInfo);
        // setLat(addressInfo.lat);
        // setLong(addressInfo.lng);
      }

      const renderItem = ({item, index}) => {
        console.log("jhyahhah")
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
                    style={styles.inputBox}>
                        <Icon style={{color:COLORS.lightGray}} name="location-outline"></Icon>
                    <Input
                        style={{color:COLORS.white,fontSize:16}}
                        placeholderTextColor={COLORS.lightGray}
                        placeholder="Add Your Location"
                        autoCorrect={false}
                       
                        autoCapitalize="none"
                        value={address}
                        
                        onChangeText={text => getAddress(text)}
                    />
                    <Button style={{backgroundColor:COLORS.transparent,elevation:0}} onPress={() => setFormData({ ...formData, address: '' })}>
             <Icon style={{color:COLORS.lightGray}}  name="close-sharp"></Icon>
             </Button>
                </Item>
                </View>

                <Button
                    style={disableSubmit ? styles.disabledBtn : GLOBALSTYLE.themebtn }
                    mode="contained"
                    onPress={onSubmit}
                    disabled={disableSubmit ? true : false}
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