import axios from 'axios';
import store from '../store';

const api = axios.create({
  // baseURL: 'http://192.168.8.104:5000/api',
  baseURL: 'https://barberp.herokuapp.com/api',
  

    headers:{
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    }


});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.response.use(
  res => res,
  err => {
    // if (err.response.status === 401) {
    //   store.dispatch({ type: LOGOUT });
    // }
    return Promise.reject(err);
  }
);


export default api;