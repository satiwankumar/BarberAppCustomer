import api from '../utils/api'
import {GET_BOOKING_ERROR,GET_BOOKINGS,CREATE_BOOKINGS,BOOKING_ERROR} from './types'
import Toast from 'react-native-simple-toast';

// Get all bookings
export const getBookings = () => async dispatch => {
    
    try {
    const res = await api.get('/bookings/me')
      console.log("GET BOOKINGS",res.data)
      dispatch({
        type: GET_BOOKINGS,
        payload: res.data
      })
    } catch (err) {
      console.log("GET BOOKINGS ERROR",err.response.data)
      dispatch({
        type: GET_BOOKING_ERROR,
        payload:err
        
      });
    }
  };

  export const createBookings = (bookingDetails,navigation) => async dispatch => {
    console.log('BOOKING DETAILS',bookingDetails)
    try {
    const res = await api.post('/bookings/create' ,bookingDetails)
      console.log("CREATE BOOKING",res.data)
      dispatch({
        type: CREATE_BOOKINGS,
        payload: res.data
      });
      navigation.navigate('BookingComplete',{BookDetails:bookingDetails})
    } catch (err) {
      console.log("CREATE BOOKING ERROR",err.response.data)
      Toast.show("Booking Failed!", Toast.SHORT)
      navigation.navigate('BookNow')
      dispatch({
        type: BOOKING_ERROR,
        payload:err
        
      });
    }
  };


  export const bookingStatus = (data) => async dispatch => {
    try{
      console.log("BOOKING STATUS",data)
      const res = await api.post('/bookings/status',data)
      console.log("BOOKING STATUS BEFORE CANCELLING",data)
      dispatch({
        type:CANCEL_BOOKING,
        payload:res.data
      });
      console.log("BOOKING STATUS",res.data)
    } catch(err){
      console.log("BOOKING STATUS ERROR")
      dispatch({
        type: BOOKING_ERROR,
        payload:err
        
      });
    }
  };
