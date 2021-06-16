import api from '../utils/api'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, INFO_UPDATED, INFO_ERROR,SUCCESS_FORGOTPASSWORD ,SUCCESS_VERIFY_CODE, SESSION_LOADED, PROFILE_ERROR} from './types'
import AsyncStorage from '@react-native-community/async-storage'
import setAuthToken from '../utils/setAuthToken'
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { getUserData } from '../storage/storage';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

// BEGIN: LOAD USER
export const loadUser = () => async dispatch => {
    try {
        console.log("LOADINGGG USER APPIIIII")
        const res = await api.get('/auth');
        
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        

    } catch (err) {
        console.log(err)
    }
}
// END: LOAD USER

// BEGIN: SESSION
export const loadSession = () => async dispatch => {
    try {
        console.log("LOADINGGG SESSION")
        const token = await AsyncStorage.getItem('token');
        
        if(token){
            dispatch({
                type: SESSION_LOADED,
                payload: token
            })
        }
        

    } catch (err) {
        console.log(err)
    }
}
// END: SESSION

// BEGIN: REGISTER USER
export const register = (formData,navigation) => async dispatch => {
    try {
        
        const res = await api.post('/users/signup', formData)
        console.log("register called",res.data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        console.log("register called")
        Toast.show("Registered Successfully", Toast.SHORT)
        navigation.navigate('LoginScreen')
    } catch (err) {
        console.log(err.response.data)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => Toast.show(JSON.stringify(error.msg), Toast.SHORT))
        }
        dispatch({
            type: REGISTER_FAIL
        })
        
    }
}
// END: REGISTER USER

// BEGIN: LOGIN
export const login = (formData) => async dispatch => {
    try {
        console.log("FOEM DATATT", formData)
        const res = await api.post('/auth/login', formData)
        console.log("login success", res.data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        Toast.show("Login Successful!", Toast.SHORT)
        dispatch(loadUser())
        var userData =  await AsyncStorage.getItem('@userData')
        console.log('USER ADRSSTTSTSTSTTTTTTTTt',userData)
        

    } catch (err) {
        console.log("MASLLALALLAL", err);
        Toast.show("Login Failed.", Toast.SHORT)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(error.msg, 'danger'))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}
// END: LOGIN

// BEGIN: LOGOUT
export const logout = () => dispatch => {
    Toast.show("Logged Out Successfully", Toast.SHORT)
    LoginManager.logOut();
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: PROFILE_ERROR
    })
}
// END: LOGOUT

// BEGIN: FORGOT PASSWORD
export const forgotPassword = (email,navigation) => async dispatch => {
    console.log('AGAGEE')
    const body = JSON.stringify({ email })
    try {
        const res = await api.post('/auth/forgot', body)
        console.log("FORGOT PASSSS",res.data)
        dispatch({
            type: SUCCESS_FORGOTPASSWORD,
            payload: email
        });
       Toast.show("Password Recovery Code Sent. ", Toast.SHORT)
       navigation.navigate('ResetCode')
       
      
    }
    catch (err) {
        console.log(err.response.data.message)
        Toast.show("Email not Found!", Toast.SHORT)
      
        dispatch(
            {
                type: LOGIN_FAIL
            }
        )
    }

}
// END: FORGOT PASSWORD

// BEGIN: VERIFY CODE
export const verifyCode = (resetCode) => async dispatch => {

    const body = JSON.stringify({ resetCode })

    try {
        const res = await api.post('/auth/verifycode', body)
        console.log(res)
        dispatch({
            type: SUCCESS_VERIFY_CODE,
            payload: resetCode
        });

        Toast.show("Code Verified, Please Set your New Password.", Toast.SHORT)
        

    }

    catch (err) {

        const errors = err.response.data.errors;


        if (errors) {
            errors.forEach(error =>   Toast.show(error.msg, Toast.SHORT)
            )

        }
        dispatch(
            {
                type: LOGIN_FAIL
            }
        )
    }

}

export const resetPassword = (newpassword, confirmpassword, resetCode) => async dispatch => {
    const body = JSON.stringify({ newpassword, confirmpassword })
    try {
        const res = await api.post(`/auth/reset/${resetCode}`, body)
        console.log("res.data", res.data.message)
        dispatch({
            type: SUCCESS_VERIFY_CODE,
            payload: res.data
        });

        Toast.show("Password Updated", Toast.SHORT)

    }
    catch (err) {

        const errors = err.response.data.errors;
        console.log(err.response)
        // toast.error(err.res.data.message)


        if (errors) {
            errors.forEach(error => 
                Toast.show(error.msg, Toast.SHORT)
            )

        }
        dispatch(
            {
                type: LOGIN_FAIL
            }
        )
    }

}
