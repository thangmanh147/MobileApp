import {
    TNDS_SET_CAR_INFO,
    TNDS_SET_CUSTOMER_INFO,
    TNDS_SET_PACKAGES
} from '../../../config/types';

export const setCarInfoTnds = (data) => {
    return {
        type: TNDS_SET_CAR_INFO,
        data
    }
}
export const saveCarInfoTnds = (body) => {
    return dispatch => {
        dispatch(setCarInfoTnds(body))
    }
}
export const setCustomerInfoTnds = (data) => {
    return {
        type: TNDS_SET_CUSTOMER_INFO,
        data
    }
}
export const saveCustomerInfoTnds = (body) => {
    return dispatch => {
        dispatch(setCustomerInfoTnds(body))
    }
}
export const setPackagesInfo = (data) => {
    return {
        type: TNDS_SET_PACKAGES,
        data
    }
}
export const savePackagesInfo = (body) => {
    return dispatch => {
        dispatch(setPackagesInfo(body))
    }
}