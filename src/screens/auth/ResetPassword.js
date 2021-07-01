import React,{useState} from 'react';
import { Text, StyleSheet,StatusBar,ScrollView } from 'react-native';
import { Item, Input, Button, View, Label,Icon } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import {resetPassword} from '../../redux/actions/auth'
import {connect} from 'react-redux'
import Toast from 'react-native-simple-toast';

const ResetPassword = ({ navigation,resetPassword,route }) => {
    const [password,setPassword] = useState(null)
    const [confirmpassword,setConfirmPassword] = useState(null)
    const [iconName, setIconName] = useState(false)
    const [iconName2, setIconName2] = useState(false)
    const code = route.params.resetcode;
    const onSubmit= async()=>{
        console.log("**SENDING TO RESET PASSWORD",password,confirmpassword,code)
        if (password == '' || confirmpassword == '') {
            Toast.show("Empty Password Field!", Toast.SHORT)
            return;
        }
        else if (password !== confirmpassword) {
            Toast.show("Password MisMatch!", Toast.SHORT)
            return;
        }
        else{
            resetPassword(code ,password, confirmpassword,navigation )
        }
        
      
    }
    return (
        <View style={[GLOBALSTYLE.screenbg,styles.container]} >
            <StatusBar translucent backgroundColor="transparent"/>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.formContent}>
                <Animatable.Image
                    animation='zoomIn'
                    style={styles.logo}
                    source={require("../../assets/images/logo.png")}
                />
                <Text style={styles.headText}> Reset Your Password </Text>

                <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Password</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            autoCapitalize="none"
                             secureTextEntry={iconName?false:true}
                            placeholderTextColor={COLORS.white}
                            onChangeText={(e) => setPassword(e)}
                        />
                          <Icon onPress={()=>setIconName(!iconName)} style={{color:COLORS.lightGray,position:'absolute',right:0,fontSize:20}} name={iconName?"eye-outline":"eye-off-outline"} ></Icon>
                    </Item>
                    <Item
                        floatingLabel
                        style={styles.inputBox}>
                        <Label
                            style={styles.labelContent}>Confirm Password</Label>
                        <Input
                            style={styles.textContent}
                            autoCorrect={false}
                            autoCapitalize="none"
                             secureTextEntry={iconName2?false:true}
                            placeholderTextColor={COLORS.white}
                            onChangeText={(e) => setConfirmPassword(e)}
                        />
                          <Icon onPress={()=>setIconName2(!iconName2)} style={{color:COLORS.lightGray,position:'absolute',right:0,fontSize:20}} name={iconName2?"eye-outline":"eye-off-outline"} ></Icon>
                    </Item>
                <Button
                    style={GLOBALSTYLE.themebtn}
                    mode="contained"
                    onPress={onSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 14, textTransform: 'uppercase' }}>Update Password</Text>
                </Button>
            </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
    })
    
    
    export default connect(mapStateToProps,{resetPassword})(ResetPassword)

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
        fontSize: 22,
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
    }

});