import React,{useState} from 'react';
import { Text, StyleSheet,StatusBar,ScrollView } from 'react-native';
import { Item, Input, Button, View, Label } from 'native-base';
import { COLORS, SIZES, GLOBALSTYLE } from '../../constants';
import * as Animatable from 'react-native-animatable';
import {resetPassword} from '../../redux/actions/auth'
import {connect} from 'react-redux'
import Toast from 'react-native-simple-toast';

const ResetPassword = (props,{ navigation,resetPassword }) => {
    const [password,setPassword] = useState(null)
    const [confirmpassword,setConfirmPassword] = useState(null)
    const ResetCode = props.route.params.resetcode;
    console.log("rerst atyyaya",ResetCode)
    const onSubmit= async()=>{
        console.log("Verification code",password,confirmpassword,ResetCode)
        resetPassword(password,confirmpassword,ResetCode)
      
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
                            secureTextEntry={true}
                            placeholderTextColor={COLORS.white}
                            onChangeText={(e) => setPassword(e)}
                        />
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
                            secureTextEntry={true}
                            placeholderTextColor={COLORS.white}
                            onChangeText={(e) => setConfirmPassword(e)}
                        />
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