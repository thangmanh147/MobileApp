

import {
    LOVE_GET_INTRO_SUCCESS,
    LOVE_LOADING,
    LOVE_GET_PACKAGE_SUCCESS,
    LOVE_GET_INFO_CONTRACT_SUCCESS,
    LOVE_BUY_CANCEL_OLD_CONTRACT,
    LOVE_BUY_SET_PRICE,
    LOVE_BUY_ADD_PRICE
} from '../config/types';
  
const initialState = {
    loading: null,
    intro: null,
    packages: null,
    infoContract: null,
    showCancelOldContract: null,
    totalPrice: 0,
}
  
export default function loveBuy (state = initialState, action) {
    switch(action.type) {
        case LOVE_BUY_SET_PRICE:
            return {
                ...state,
                totalPrice: action.price
            }

        case LOVE_BUY_ADD_PRICE:
            var totalPrice = state.totalPrice;
            totalPrice = totalPrice + action.price
            return {
                ...state,
                totalPrice
            }
        case LOVE_BUY_CANCEL_OLD_CONTRACT:
            return {
                ...state,
                showCancelOldContract: action.data
            }
        case LOVE_GET_INFO_CONTRACT_SUCCESS:
            return {
                ...state,
                infoContract: action.data
            }
        case LOVE_GET_PACKAGE_SUCCESS:
            return {
                ...state,
                packages: action.data
            }
        case LOVE_GET_INTRO_SUCCESS:
            return {
                ...state,
                intro: action.data
            }
        case LOVE_LOADING:
            return {
                ...state,
                loading: action.data
            }
        default: 
            return state
    }
}