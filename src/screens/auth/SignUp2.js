import React, { useEffect } from 'react';
import { Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
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


const SignUp2 = ({ register, Auth:{isAuthenticated,loading},navigation,route  }) => {
    const [viewLoader, setViewLoader] = useState(false)
    const { firstname, lastname, email, password, image } = route.params;
    const googleBaseUrl =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&input=';
  const googleAllBaseUrl =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
  const geoBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  const googleApiKey = 'AIzaSyBFRqlCOvRtuKLpvDSP5qLkiyCr5dKx7jI';
  const geocodeUrl =
    'http://dev61.onlinetestingserver.com/forward-geo-code?address=';

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
    const onSubmit = async () => {
        setViewLoader(true)
if(image !== null) {
    await ImgToBase64.getBase64String(image)
    .then(base64String => {
        console.log(base64String)
        setformData({ ...formData, image: base64String })

    }

    )
    .catch(err =>
        Toast.show("Image Type Not Supported", Toast.SHORT)
    );
}
      
        console.log("FINALDATA GOINGGG", formData)
        register(formData,navigation)
       

        // console.log(isRegistered,'STATUS')
    }
    return (
        <View style={[GLOBALSTYLE.screenbg, styles.container]} >
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>


                <View style={styles.formContent}>
                    <Animatable.Image
                        animation='zoomIn'
                        style={styles.logo}
                        source={require("../../assets/images/logo.png")}
                    />
                    <Text style={styles.headText}> Your Location </Text>
                    <Text style={styles.headDesc}>Enter Details to View Nearby Shops </Text>

                    <Item style={styles.inputBox}>
                        <Picker
                            itemStyle={{
                                backgroundColor: "#000"
                            }}
                            style={{ flex: 1, color: COLORS.lightGray }}
                            dropdownIconColor={COLORS.lightGray}
                            placeholderTextColor={COLORS.secondry}
                            itemStyle={{ backgroundColor: COLORS.secondry }}
                            selectedValue={country}
                            onValueChange={(itemValue, itemIndex) =>
                                setformData({ ...formData, country: itemValue })

                            }
                        >
                            <Picker.Item label="Select Country" value='' />
                            <Picker.Item style={{ backgroundColor: COLORS.primary }} label="USA" value="usa" />
                            <Picker.Item label="UK" value="uk" />


                        </Picker>

                    </Item>

                    <Item style={styles.inputBox}>
                        <Picker
                            itemStyle={{
                                backgroundColor: "#000"
                            }}
                            style={{ flex: 1, color: COLORS.lightGray }}
                            dropdownIconColor={COLORS.lightGray}
                            placeholderTextColor={COLORS.secondry}
                            itemStyle={{ backgroundColor: COLORS.secondry }}
                            selectedValue={city}
                            onValueChange={(itemValue, itemIndex) =>
                                setformData({ ...formData, city: itemValue })

                            }
                        >
                            <Picker.Item label="Select City" value='' />
                            <Picker.Item style={{ backgroundColor: COLORS.primary }} label="Newyork" value="ny" />
                            <Picker.Item label="Chicago" value="chicago" />
                            <Picker.Item label="Boston" value="bs" />
                            <Picker.Item label="Seatle" value="st" />


                        </Picker>

                    </Item>
                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Address</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            placeholderTextColor={COLORS.white}
                            autoCapitalize="none"
                            onChangeText={(e) => setformData({ ...formData, address: e })}
                          
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
                            onChangeText={(e) => setformData({ ...formData, zip_code: e })}
                        />
                    </Item>
                    <Button
                        style={GLOBALSTYLE.themebtn}
                        mode="contained"
                        onPress={onSubmit}
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
    logo: {
        width: SIZES.width * 0.30,
        height: SIZES.width * 0.30,
        resizeMode: "contain",
        marginTop: 30,
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