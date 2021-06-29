import api from '../utils/api'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED,GET_NOTIFICATIONS,GET_NOTIFICATIONS_ERROR, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, INFO_UPDATED, INFO_ERROR,SUCCESS_FORGOTPASSWORD ,SUCCESS_VERIFY_CODE, SESSION_LOADED, PROFILE_ERROR} from './types'
import AsyncStorage from '@react-native-community/async-storage'
import setAuthToken from '../utils/setAuthToken'
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { getUserData } from '../storage/storage';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

// BEGIN: LOAD USER
export const loadUser = () => async dispatch => {
    try {
        
        const res = await api.get('/auth');
        console.log("LOAD USER API:",res.data)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        

    } catch (err) {
        console.log("LOAD USER API ERROR",err.response.data)
    }
}
// END: LOAD USER

// BEGIN: SESSION
export const loadSession = () => async dispatch => {
    try {
      
        const token = await AsyncStorage.getItem('token');
        
        if(token){
            dispatch({
                type: SESSION_LOADED,
                payload: token
            })
            console.log("LOADING SESSION",token)
        }
        

    } catch (err) {
        console.log("LOAD SESSION ERROR",err.response.data)
    }
}
// END: SESSION

// BEGIN: REGISTER USER
export const register = (formData,navigation) => async dispatch => {
    try {
        
        const res = await api.post('/users/signup', formData)
        console.log("USER REGISTRATION",formData)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        
        Toast.show("Registered Successfully", Toast.SHORT)
        navigation.navigate('LoginScreen')
    } catch (err) {
        console.log("USER REGISTRATION ERROR",err.response.data)
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
        console.log("LOGIN API", formData)
        const res = await api.post('/auth/login', formData)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        Toast.show("Login Successful!", Toast.SHORT)
        dispatch(loadUser())
        

    } catch (err) {
        console.log("LOGIN ERROR", err);
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
   
    const body = JSON.stringify({ email })
    console.log('FORGOT PASSWORD',body)
    try {
        const res = await api.post('/auth/forgot', body)
        dispatch({
            type: SUCCESS_FORGOTPASSWORD,
            payload: email
        });
       Toast.show("Password Recovery Code Sent. ", Toast.SHORT)
       navigation.navigate('ResetCode')
       
      
    }
    catch (err) {
        console.log("FORGOT PASSWORD ERROR",err.response.data.message)
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
    console.log("VERIFY CODE API")
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
        console.log("RESET PASSWORD",res.data.message)
        dispatch({
            type: SUCCESS_VERIFY_CODE,
            payload: res.data
        });

        Toast.show("Password Updated", Toast.SHORT)

    }
    catch (err) {

        const errors = err.response.data.errors;
        console.log(err.response)
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


// Get all profiles
export const getUserNotifications = () => async dispatch => {
    
    try {
    const res = await api.get('/notifications')
      console.log("NOTIFICATION API",res.data)
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      });
    } catch (err) {
      console.log("NOTIFICATION ERROR",err.response.data)
      dispatch({
        type: GET_NOTIFICATIONS_ERROR,
        payload:err
        
      });
    }
  };