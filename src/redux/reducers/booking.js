import {
    GET_BOOKINGS,
    GET_BOOKING_ERROR,
    CREATE_BOOKINGS,
    BOOKING_ERROR,CANCEL_BOOKING
  
  } from '../actions/types';
  
  
  
  const initialState = {
    Bookings:[],
    loading: true,
    error: {}
  };
  
const booking =  function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_BOOKINGS:
          return {
            ...state,
            Bookings: payload,
            loading: false
      };
      
      
      case GET_BOOKING_ERROR:
        return {
          ...state,
          loading:false,
          Bookings:[],
        };
        case CREATE_BOOKINGS:
        return {
          ...state,
                ...payload,
                loading:false,
               
        };
        case BOOKING_ERROR:
        return {
          ...state,
                loading:false
        };
   
    
      default:
        return state;
    }
  }
  export default booking;