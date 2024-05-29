import {
    TRAVEL_GET_PACKAGES,
    TRAVEL_SAVE_BUYER_INFO,
    TRAVEL_SAVE_PACKAGE_INFO,
    TRAVEL_SAVE_TOUR_INFO,
    TRAVEL_SAVE_INSURED_CUSTOMER_INFO,
    TRAVEL_SAVE_INSURED_TYPE
} from '../../../config/types';
import { URL } from '../../../config/System';

export const getPackagesSuccess = (data) => ({
    type: TRAVEL_GET_PACKAGES,
    data
})
export const setPackage = (body) => {
    return dispatch => {
        dispatch(getPackagesSuccess(body))
    }
}
export const setTourInfomationSuccess = (data) => ({
    type: TRAVEL_SAVE_TOUR_INFO,
    data
})
export const saveTourInfomation = (body) => {
    return dispatch => {
        dispatch(setTourInfomationSuccess(body))
    }
}
export const setInsuredCustomerSuccess = (data) => ({
    type: TRAVEL_SAVE_INSURED_CUSTOMER_INFO,
    data
})
export const saveInsuredCustomerInfo = (body) => {
    return dispatch => {
        dispatch(setInsuredCustomerSuccess(body))
    }
}
export const setTypeTravelInsurance = (data) => ({
    type: TRAVEL_SAVE_INSURED_TYPE,
    data
})
export const saveTypeTravelInsurance = (body) => {
    return dispatch => {
        dispatch(setTypeTravelInsurance(body))
    }
}
