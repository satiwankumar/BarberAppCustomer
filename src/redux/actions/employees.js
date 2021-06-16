import api from '../utils/api'
import {EMPLOYEES_ERROR,GET_EMPLOYEES} from './types'


// Get all profiles
export const getEmployeesByShopService = (shop_id,service_id) => async dispatch => {
    const body = {shop_id,service_id}
    
    console.log('TO get employees',shop_id,service_id)
    try {
    const res = await api.post('/employees',body)
      console.log(res.data)
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data
      });
      console.log('EMPLOYEES BY SHOP AND SERVICE',res.data)
    } catch (err) {
      console.log(err.response.data)
      dispatch({
        type: EMPLOYEES_ERROR,
        payload:err
        
      });
    }
  };

