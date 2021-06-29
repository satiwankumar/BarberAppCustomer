import React,{ useState, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Text, StyleSheet,StatusBar,ScrollView ,BackHandler,Keyboard, TouchableOpacity,ActivityIndicator, Modal,FlatList, Platform} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item, Input, Button, View, Label,Icon } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import {login} from '../../redux/actions/auth'
import Toast from 'react-native-simple-toast';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import PushNotification from "react-native-push-notification";

const LoginScreen = ({login,navigation,Auth:{isAuthenticated,loading}}) => {
    const [iconName, setIconName] = useState(false)
    const [viewLoader, setViewLoader] = useState(false)
    const [formData,setFormData] = useState({
      
        email:'',
        password:'',
        deviceId:'',
        deviceType: Platform.OS
    });

    useEffect(()=>{
        PushNotification.configure({
            onRegister: function (token) {
              console.log("**SENDING FCM TOKEN:", token.token);
              setFormData({...formData,deviceId : token.token})
            },
        })
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onPress= () => BackHandler.exitApp()
          );
          return () => backHandler.remove();
    },[])


    const onSubmit= async()=>{
        setViewLoader(true)
        Keyboard.dismiss()
        if (email == '' || password == '') {
            Toast.show("Incomplete Credentials!", Toast.SHORT)
            setViewLoader(false)
            return;
        }
        console.log("email,password")
        console.log(email,password)
        try{
            console.log(formData)
            await login(formData)
            navigation.navigate('FindServices')
        }
        catch {
            setViewLoader(false)
            return;
        }
        
        
       setFormData({
            email:'',
            password:''
        })
    }
 
    GoogleSignin.configure({
        webClientId:
          '866425838449-8fcvpcksosuk77083kg0u51auanbuagk.apps.googleusercontent.com',
        // iosClientId:"925551315399-9iht6r5pgs15r00tmfuuor961rh3ktb7.apps.googleusercontent.com",
        androidClientId:
          '866425838449-jgu31ga0oicbl6lmmd9pk0pe186rdpak.apps.googleusercontent.com',
        offlineAccess: false,
      });
    

    const socialAuth = async (type) => {
        let data = {};
        if(type == 'google'){
            try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                // this.setState({ userInfo });
                // console.log("signIn: ", userInfo);
                console.log(userInfo)
        
                const tokens = await GoogleSignin.getTokens();
        
                console.log('GoogleSignin tokens: ', tokens);
                data = {
                  method: 'google',
                  access_token: tokens.accessToken,
                };
                 login(data)
                 console.log("asjf",data)
                navigation.navigate('FindServices')

               
              } catch (error) {
                alert(error);
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                  // user cancelled the login flow
                  console.log('user cancelled the login flow');
                } else if (error.code === statusCodes.IN_PROGRESS) {
                  console.log('operation (e.g. sign in) is in progress already');
                  // operation (e.g. sign in) is in progress already
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                  console.log('play services not available or outdated');
                  // play services not available or outdated
                } else {
                  console.log('some other error happened:', error.message);
                  // some other error happened
                }
              }
        }
       else{
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            (result) => {
              if (result.isCancelled) {
                console.log('Login cancelled');
                // alert(result);
              } else {
                  console.log("res",result)
                // console.log(
                //   "Login success with permissions: " +
                //     result.grantedPermissions.toString()
                // );
                AccessToken.getCurrentAccessToken().then((data) => {
                  // alert(data.accessToken.toString());
                  console.log(data.accessToken.toString(), 'fbtoken');
                  data = {
                    method: 'facebook',
                    access_token: data.accessToken,
                  };
                  login(data)
                  console.log("asjf",data)
                 navigation.navigate('FindServices')
                });
              }
            },
            (error) => {
              console.log('Login fail with error: ' + error);
            },
        );
       
       }
         
        
      };
    const {email,password} = formData
    return (
       
        <View style={[GLOBALSTYLE.screenbg,styles.container]} >
            
            <StatusBar translucent backgroundColor="transparent"/>
            <ScrollView   contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.formContent}>
                <Animatable.Image
                    animation='zoomIn'
                    style={styles.logo}
                    source={require("../../assets/images/logo.png")}
                />
                <Text style={styles.headText}> Sign In </Text>
                <Text style={styles.headDesc}>Please SignIn to Continue </Text>

                <Item
                    floatingLabel
                    style={styles.inputBox}>
                    <Label
                        style={styles.labelContent}>Email</Label>
                    <Input
                        style={styles.textContent}
                        autoCorrect={false}
                        autoComplete="off"
                        autoCompleteType="email"
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.white}
                        value={email}
                        onChangeText={(e)=>setFormData({...formData,email:e})}
                    />
                </Item>

                <Item
                    floatingLabel
                    style={styles.inputBox}>
                    <Label
                        style={styles.labelContent}>Password</Label>
                    <Input
                        style={styles.textContent}
                        autoCorrect={false}
                        autoComplete="off"
                        autoCapitalize="none"
                        secureTextEntry={iconName?false:true}
                        placeholderTextColor={COLORS.white}
                        value={password}
                        onChangeText={(e)=>setFormData({...formData,password:e})}
                        
                    />
                    <Icon onPress={()=>setIconName(!iconName)} style={{color:COLORS.lightGray,position:'absolute',right:0,fontSize:20}} name={iconName?"eye-outline":"eye-off-outline"} ></Icon>
                 
                    
                </Item>

                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    <Text style={{ color: COLORS.lightGray, marginTop: 12.5, fontSize: 14 }}>Forgot Password?</Text>
                    <Button
                        hasText
                        transparent
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={{ color: COLORS.secondry, fontWeight: "bold", fontSize: 14, marginLeft: 4 }}>Recover Here</Text>
                    </Button>
                </View>

                <Button
                    style={GLOBALSTYLE.themebtn}
                    mode="contained"
                    onPress={()=>onSubmit(formData)}
                    // onPress={() => navigation.navigate('FindServices')}
                >
                    
                    <Text style={{ color: 'white', fontSize: 14, textTransform: 'uppercase' }}>{
                        viewLoader ?  loading ? <ActivityIndicator size="large" color={COLORS.secondry} style={{marginTop:120}}/> :'sign in'  : 'sign in'
                    } </Text>
                </Button>

                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={{ color: COLORS.lightGray, marginTop: 12.5, fontSize: 14 }}>New Here? </Text>
                    <Button
                        hasText
                        transparent
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={{ color: COLORS.secondry, fontWeight: "bold", fontSize: 14, textTransform: 'uppercase' }}> Sign Up</Text>
                    </Button>
                  
                </View>
                <TouchableOpacity style={{display:'flex',flexDirection:'row',backgroundColor:'#d54c3f',padding:7,paddingHorizontal:14,borderRadius:4,marginBottom:10,width:250,alignItems:'center',justifyContent:'center'}}  onPress={() => socialAuth('google')}>
                <Icon style={{color:'#fff',fontSize:17,marginRight:8}} name="logo-google"></Icon>
                    <Text style={{fontSize:15,color:'#fff'}}>
                    
                    
                        Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{display:'flex',flexDirection:'row',backgroundColor:'#3b5998',padding:7,paddingHorizontal:14,borderRadius:4,marginBottom:10,width:250,alignItems:'center',justifyContent:'center'}}  onPress={() => socialAuth('facebook')}>
                <Icon style={{color:'#fff',fontSize:17,marginRight:8}}  name="logo-facebook"></Icon>
                    <Text style={{fontSize:15,color:'#fff'}}>
                    
                        Continue with Facebook</Text>
                </TouchableOpacity>
               
                
            </View>
          </ScrollView>
        </View>
    )
}


const mapStateToProps = state => (
    {
        Auth : state.auth
    }
)
   
   
    


export default connect(mapStateToProps,{login})(LoginScreen);
// export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: SIZES.width * 0.30,
        height: SIZES.width * 0.30,
        resizeMode: "contain",
        marginBottom:20,
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
        paddingHorizontal:20
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
    }

});