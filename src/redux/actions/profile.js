import api from '../utils/api'
import {GET_PROFILE,UPDATE_PROFILE,PROFILE_ERROR} from './types'
import { loadUser } from '../actions/auth'
import Toast from 'react-native-simple-toast';

// Get Current profiles
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/users/me');
        console.log("USER PROFILE",res.data)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        console.log("ERROR USER PROFILE", err.response.data.message)
        dispatch({
            type: PROFILE_ERROR,
            
        });
    }
};

export const updateProfile = (formData) => async dispatch => {
    try {

        const res = await api.put('/users/edit', formData)
        console.log("UPDATE PROFILE",res.data)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        Toast.show("Information Updated Successfully!", Toast.SHORT)


        dispatch(loadUser());
       
    } catch (err) {

        const errors = err.response.data.errors;
        
        if (errors) {
            errors.forEach(error => Toast.show(JSON.stringify(error.msg), Toast.SHORT))
            console.log("UPDATE PROFILE ERROR",error.msg)
        }

    }
}

  