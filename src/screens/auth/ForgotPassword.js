import React,{useState} from 'react';
import { Text, StyleSheet,StatusBar,ScrollView,ActivityIndicator } from 'react-native';
import { Item, Input, Button, View, Label } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import {forgotPassword} from '../../redux/actions/auth'
import {connect} from 'react-redux'

const ForgotPassword = ({navigation,forgotPassword,Auth:{loading} }) => {
    const [email,setEmail] = useState('')
    const onSubmit= async()=>{
        console.log("**SENDING VERIFICATION EMAIL",email)
         forgotPassword(email,navigation)
        
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
                <Text style={styles.headText}> Forgot your Password? </Text>
                <Text style={styles.headDesc}>No worries! Enter your Email and we will send you a Reset </Text>

                <Item
                    floatingLabel
                    style={styles.inputBox}>
                    <Label
                        style={styles.labelContent}>Email</Label>
                    <Input
                        style={styles.textContent}
                        autoCorrect={false}
                        placeholderTextColor={COLORS.white}
                        autoCapitalize="none"
                        onChangeText={(e)=>setEmail(e)}
                    />
                </Item>
                <Button
                    style={GLOBALSTYLE.themebtn}
                    mode="contained"
                    onPress={onSubmit}
                >
                    <Text style={{ color: 'white', fontSize: 14, textTransform: 'uppercase' }}>Send Request</Text>
                </Button>
            </View>
            
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state =>({
    Auth : state.auth
    })
    
    
    export default connect(mapStateToProps,{forgotPassword})(ForgotPassword)
// export default ForgotPassword;

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