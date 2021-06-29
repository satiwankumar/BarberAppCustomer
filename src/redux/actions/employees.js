import api from '../utils/api'
import {EMPLOYEES_ERROR,GET_EMPLOYEES,GET_TIMESLOTS,TIMESLOT_ERROR} from './types'


// Get all employees
export const getEmployeesByShopService = (shop_id,service_id) => async dispatch => {
    const body = {shop_id,service_id}
    
    console.log('EMPLOYEES BY SHOP AND SERVICE',shop_id,service_id)
    try {
    const res = await api.post('/employees',body)
      console.log(res.data)
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data
      });
      console.log('EMPLOYEES BY SHOP AND SERVICE',res.data)
    } catch (err) {
      console.log("GET EMPLOAYEES ERROR",err.response.data)
      dispatch({
        type: EMPLOYEES_ERROR,
        payload:err
        
      });
    }
  };
// Get all profiles
export const getTimeSlots = (employee_id,service_id,selectedDate) => async dispatch => {
  const body = {employee_id,service_id,selectedDate}
  
  console.log('EMPLOYEES TIME SLOTS',employee_id,service_id,selectedDate)
  try {
  const res = await api.post('/employees/getemployeeslots',body)
    console.log(res.data)
    dispatch({
      type: GET_TIMESLOTS,
      payload: res.data
    });
    console.log('EMPLOYEES TIME SLOTS',res.data)
  } catch (err) {
    console.log("EMPLOYEE SLOTS ERROR",err.response.data)
    dispatch({
      type: TIMESLOT_ERROR,
      payload:err
      
    });
  }
};

  
