import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
  
  } from '../actions/types';
  
  
  
  const initialState = {
    currentProfile:null,
    profile: null,
    Users: [],
    Notifications:{},
    test:[],
    loading: true,
    error: {}
  };
  
const profile =  function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case UPDATE_PROFILE:
      case GET_PROFILE:
          return {
            ...state,
            currentProfile: payload,
            loading: false
      };
      
      
      case PROFILE_ERROR:
        return {
          ...state,
          // error: payload,
          loading: false,
          profile: null,
          currentProfile:null
        };
   
    
      default:
        return state;
    }
  }
  export default profile;