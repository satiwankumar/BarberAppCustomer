import {GET_SERVICES,SERVICES_ERROR,GET_JOBS,JOBS_ERROR,GET_SHOPS,SHOPS_ERROR} from '../actions/types'

const initialState = {
    Services :[],
    loading:true,
    Jobs :[],
}

export default function(state = initialState, action){
    const {type,payload }=action

    switch(type){
        case GET_SERVICES:
            console.log('REDUCER OF SERIVES',payload)
            return {
                ...state,
                loading:false,
                Services:payload,
            }
        case SERVICES_ERROR:
            return{
                ...state,
                loading:false,
                Services:[],
            }
        case GET_JOBS:
                return {
                    ...state,
                    loading:false,
                    Jobs:payload,
                }
        case JOBS_ERROR:
                return{
                    ...state,
                    loading:false,
                    Jobs:[],
                }
       
        default:
                return state;
         }   
}


