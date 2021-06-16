import React,{useState} from 'react';
import { Text, StyleSheet,StatusBar,ScrollView } from 'react-native';
import { Item, Input, Button, View, Label } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import {verifyCode} from '../../redux/actions/auth'
import {connect} from 'react-redux'
import Toast from 'react-native-simple-toast';

const ResetCode = ({props, navigation,verifyCode }) => {
    const [code,setCode] = useState(null)
    const re = /^[0-9\b]+$/;
    const onCodeChange = (e) => {
        if(re.test(e) == false){
            setCode('')
        }
        else{
            setCode(e)
        }
        // alert(re.test(e))
    }
    const onSubmit= async()=>{
        console.log("Verification code",code)
        if(code == ''){
            Toast.show("Please Enter Code to Proceed.", Toast.SHORT)
            return;
        }
        else{
            await verifyCode(code)
            navigation.navigate('ResetPassword',{resetcode : code})
        }

        


        // verifyCode(code)
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
                <Text style={styles.headText}> Verification Code </Text>
                <Text style={styles.headDesc}>Enter the 6-Digit code you Received on your Email. </Text>

                <Item
                    floatingLabel
                    style={styles.inputBox}>
                    <Label
                        style={styles.labelContent}>Reset Code</Label>
                    <Input
                        style={styles.textContent}
                        autoCorrect={false}
                        placeholderTextColor={COLORS.white}
                        autoCapitalize="none"
                        maxLength={6}
                        value={code}
                        // onChangeText={(e)=>setCode(e)}
                        onChangeText={(e) =>onCodeChange(e)}
                        
                    />
                </Item>
                <Button
                    style={GLOBALSTYLE.themebtn}
                    mode="contained"
                    onPress={onSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 14, textTransform: 'uppercase' }}>Verify</Text>
                </Button>
            </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
    })
    
    
    export default connect(mapStateToProps,{verifyCode})(ResetCode)

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
        marginTop: 20
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