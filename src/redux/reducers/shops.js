import {GET_SHOPREVIEWS, GET_SHOPS,REVIEW_ERROR,SHOPS_ERROR,GET_SHOPS_BY_SERVICES,BY_SERVICES_ERROR,GET_PACKAGES,GET_SHOP_BY_ID,PACKAGES_ERROR} from '../actions/types'

const initialState = {
    loading:true,
    Shops :[],
    Reviews :[],
    ShopsService :[],
    Packages : [],
    Shop:null
}

export default function(state = initialState, action){
    const {type,payload }=action

    switch(type){
        case GET_SHOPS:
                    return {
                        ...state,
                        loading:false,
                        Shops:payload,
                    }
        case SHOPS_ERROR:
                    return{
                        ...state,
                        loading:false,
                        Shops:[],
                    }
        case GET_SHOPREVIEWS:
                    return {
                        ...state,
                        loading:false,
                        Reviews:payload,
                    }
         case REVIEW_ERROR:
                    return {
                        ...state,
                        loading:false,
                        Reviews:[],
                    }
        case GET_SHOPS_BY_SERVICES:
                    return {
                        ...state,
                        loading:false,
                        ShopsService:payload,
                    }
         case BY_SERVICES_ERROR:
                    return {
                        ...state,
                        loading:false,
                        ShopsService:[],
                    }
         case GET_PACKAGES:
                    return {
                        ...state,
                        loading:false,
                        Packages:payload,
                    }
         case PACKAGES_ERROR:
                    return {
                        ...state,
                        loading:false,
                        Packages:[],
                    }

            case GET_SHOP_BY_ID:{
          return {
            ...state,
            Shop: payload,
            loading: false
          };
        }
       
        default:
                return state;
         }   
}


