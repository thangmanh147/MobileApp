

import {
    PROFILE_GET_INFO_SUCCESS,
    LIST_PACKGES_GET_INFO_SUCCESS,
    PROFILE_LOADING,
    PROFILE_LIST_CONTRACT_SUCCESS,
    PROFILE_GET_AFFILIATECODE_SUCCESS,
    USER_LIST_GIFT_PRODUCT,
    USER_GET_DETAIL_VOUCHER,
    USER_GET_VOUCHER_SUCCESS,
    CUSTOMER_LIST_VOUCHER,
    CUSTOMER_DETAIL_VOUCHER,
    CUSTOMER_VOUCHER_CODE,
    HOME_LIST_GIFT,
    HOME_LIST_PROMOTION,
    DETAILS_PROMOTION,
    ADD_CONTACT_SUCCESS,
    DETAIL_CONTRACT_ACTIVE_SUCCESS
  } from '../config/types';
  
const initialState = {
    loading: null,
    user: null,
    listContractActive:null,
    affilate:null,
    listGiftProduct:null,
    detailVoucher:null,
    voucherSuccess:null,
    customerListVoucher:null,
    customerDetailVoucher:null,
    voucherCode:null,
    listGiftProducts:null,
    listPromotion:null,
    detailPromotion:null,
    addContact:null,
    DetailContract:null
}
  
export default function search (state = initialState, action) {
    switch(action.type) {
        case PROFILE_GET_INFO_SUCCESS:
            return {
                ...state,
                user: action.data
            }
        case LIST_PACKGES_GET_INFO_SUCCESS:
            return {
                ...state,
                listPackages: action.data
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: action.data
            }
        case PROFILE_LIST_CONTRACT_SUCCESS:
            return {
                ...state,
                listContractActive: action.data
            }
        case PROFILE_GET_AFFILIATECODE_SUCCESS:
            return {
                ...state,
                affilate: action.data
            }
        case USER_LIST_GIFT_PRODUCT:
            return {
                ...state,
                listGiftProduct: action.data
            }
        case USER_GET_DETAIL_VOUCHER:
            return {
                ...state,
                detailVoucher: action.data
            }
        case USER_GET_VOUCHER_SUCCESS:
            return {
                ...state,
                voucherSuccess: action.data
            }
        case CUSTOMER_LIST_VOUCHER:
            return {
                ...state,
                customerListVoucher: action.data
            }
        case CUSTOMER_DETAIL_VOUCHER:
            return {
                ...state,
                customerDetailVoucher: action.data
            }
        case CUSTOMER_VOUCHER_CODE:
            return {
                ...state,
                voucherCode: action.data
            }
        case HOME_LIST_GIFT:
            return {
                ...state,
                listGiftProducts: action.data
            }
        case HOME_LIST_PROMOTION:
            return {
                ...state,
                listPromotion: action.data
            }
        case DETAILS_PROMOTION:
            return {
                ...state,
                detailPromotion: action.data
            }
        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                addContact: action.data
            }
        case DETAIL_CONTRACT_ACTIVE_SUCCESS:
            return {
                ...state,
                DetailContract: action.data
            }
        default: 
            return state
        }
}