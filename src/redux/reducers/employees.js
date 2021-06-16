import {
    GET_EMPLOYEES,
    EMPLOYEES_ERROR,
  
  } from '../actions/types';
  
  
  
  const initialState = {
    employees:[],
    loading: true,
    error: {}
  };
  
const employees =  function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_EMPLOYEES:
          return {
            ...state,
            employees: payload,
            loading: false
      };
      
      
      case EMPLOYEES_ERROR:
        return {
          ...state,
          loading:false,
          employees:[],
        };
   
    
      default:
        return state;
    }
  }
  export default employees;