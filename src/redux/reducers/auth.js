
import {REGISTER_SUCCESS,REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT, INFO_UPDATED,SUCCESS_FORGOTPASSWORD,SUCCESS_VERIFY_CODE, SESSION_LOADED} from '../actions/types'
import AsyncStorage  from '@react-native-community/async-storage'
import { storeUserData } from '../storage/storage'
import setAuthToken from '../utils/setAuthToken';

const initalState={
    token:AsyncStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    isReg:false,
    code:null
}

export default function(state = initalState, action){
    const {type, payload} = action
    switch(type){
      
        case USER_LOADED:
            console.log('LOADED USER DATA',payload)
            storeUserData('@userData',payload)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                loading:false,
                isReg:true
            }
        case LOGIN_SUCCESS:
            console.log("login payloadd",payload)
            storeUserData('@userData',payload.user)
            setAuthToken(payload.token)
            AsyncStorage.setItem('token',payload.token);
            console.log(payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false,
            }

        case SESSION_LOADED:
            
            setAuthToken(payload)
            
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                token:payload,
                loading:false,
            }
        
        case INFO_UPDATED:
            storeUserData('@userData',payload)
            return {
                ...state,
                loading:false,
                user: payload
            }
        case SUCCESS_FORGOTPASSWORD:
            return {  
                ...state,
                passwordRecovery:true,
                loading:false
            }
        case SUCCESS_VERIFY_CODE:
            return {  
                ...state,
                code:payload
             }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        // case DELETE_ACCOUNT:
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('@userData')
            return {
                ...state,
                token:null,
                user : null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return state

        }
        


}