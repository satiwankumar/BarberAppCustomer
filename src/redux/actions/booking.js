import api from '../utils/api'
import {GET_BOOKING_ERROR,GET_BOOKINGS,CREATE_BOOKINGS,BOOKING_ERROR} from './types'


// Get all profiles
export const getBookings = () => async dispatch => {
    
    console.log('Get All Bookings')
    try {
    const res = await api.get('/bookings/me')
      console.log("my bookings",res.data)
      dispatch({
        type: GET_BOOKINGS,
        payload: res.data
      });
      console.log('Bookings',res.data)
    } catch (err) {
      console.log("error",err.response.data)
      dispatch({
        type: GET_BOOKING_ERROR,
        payload:err
        
      });
    }
  };

  export const createBookings = (bookingDetails) => async dispatch => {
    console.log('Create Bookings',bookingDetails)
    try {
    const res = await api.post('/bookings/create' ,bookingDetails)
      console.log("booking date",res.data)
      dispatch({
        type: CREATE_BOOKINGS,
        payload: res.data
      });
      console.log('Bookings',res.data)
    } catch (err) {
      console.log("error",err.response.data)
      dispatch({
        type: BOOKING_ERROR,
        payload:err
        
      });
    }
  };


  export const bookingStatus = (data) => async dispatch => {
    try{
      const res = await api.post('/bookings/status',data)
      dispatch({
        type:CANCEL_BOOKING,
        payload:res.data
      })
    }catch(err){
      console.log("error",err.response.data)
      dispatch({
        type: BOOKING_ERROR,
        payload:err
        
      });
    }
  }
