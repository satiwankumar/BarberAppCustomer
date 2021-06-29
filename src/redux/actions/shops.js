import api from '../utils/api'
import {GET_SHOPS,SHOPS_ERROR,GET_SHOPREVIEWS,REVIEW_ERROR,GET_SHOPS_BY_SERVICES,BY_SERVICES_ERROR,GET_PACKAGES,PACKAGES_ERROR,GET_SHOP_BY_ID} from './types'



export const getNearbyShops = (longitude,latitude,keyword) => async dispatch => {
  try {
  const res = await api.get(`/shops?log=${longitude}&lat=${latitude}&keyword=${keyword}`)
    dispatch({
      type: GET_SHOPS,
      payload: res.data
    });
    console.log("GET NEARBY SHOPS",res.data);
  } catch (err) {
    console.log(err)
    console.log(err)
    dispatch({
      type: SHOPS_ERROR,
      payload:err
      
    });
  }
};

export const shopsByService = (service_id) => async dispatch => {
  try {
    const body = JSON.stringify({ service_id })
  const res = await api.post('/shops/service', body)
    dispatch({
      type: GET_SHOPS_BY_SERVICES,
      payload: res.data
    });
    console.log("GET SHOPS BY SERVICE",res.data);
  } catch (err) {
    console.log(err)
    console.log(err)
    dispatch({
      type: BY_SERVICES_ERROR,
      payload:err
      
    });
  }
};


export const getShopReviews = (shop) => async dispatch => {
    try {
      
      const body = JSON.stringify({ shop })
    const res = await api.post('/review/shop', body)
      console.log('GET SHOP REVIEWS',res.data)
      dispatch({
        type: GET_SHOPREVIEWS,
        payload: res.data
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: REVIEW_ERROR,
        payload:err
        
      });
    }
  };


  export const getShopPackages = (shop) => async dispatch => {
    try {
      
      const body = JSON.stringify({ shop })
    const res = await api.post('/packages', body)
      console.log('SHOP PACKAGES',res.data)
      dispatch({
        type: GET_PACKAGES,
        payload: res.data
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: PACKAGES_ERROR,
        payload:err
        
      });
    }
  };

  export const getShopById = shop_id => async dispatch => {

    try {
        const res = await api.get(`/shops/${shop_id}`);
        console.log("GET SHOP BY ID",res.data)
        dispatch({
            type: GET_SHOP_BY_ID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type:SHOPS_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};