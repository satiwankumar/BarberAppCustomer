import {
    GET_EMPLOYEES,
    EMPLOYEES_ERROR,
    TIMESLOT_ERROR,
    GET_TIMESLOTS
  
  } from '../actions/types';
  
  
  
  const initialState = {
    employees:[],
    loading: true,
    error: {},
    timelsots:[]
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

        case GET_TIMESLOTS:
          return {
            ...state,
            loading:false,
            timelsots:payload,
          };
          case TIMESLOT_ERROR:
            return {
              ...state,
              loading:false,
              timelsots:[],
            };
    
      default:
        return state;
    }
  }
  export default employees;