import api from '../utils/api'
import {GET_SERVICES,SERVICES_ERROR,GET_JOBS,JOBS_ERROR} from './types'


// Get all profiles
export const getServices = () => async dispatch => {
    try {
    const res = await api.get('/services')
      dispatch({
        type: GET_SERVICES,
        payload: res.data
      });
      console.log("GET SERVICES",res.data);
    } catch (err) {
      console.log(err)
      console.log(err)
      dispatch({
        type: SERVICES_ERROR,
        payload:err
        
      });
    }
  };

  // Get all profiles
export const getJobs = (keyword) => async dispatch => {
  try {
  const res = await api.get(`/jobs?keyword=${keyword}`)
    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
    console.log("POSTEDD JOBSS",res.data);
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: JOBS_ERROR,
      payload:err
      
    });
  }
};

