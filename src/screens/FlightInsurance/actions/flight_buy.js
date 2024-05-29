import {
    FLIGHT_SET_BILL_INFO,
    FLIGHT_SET_CUSTOMERS_INFO,
    FLIGHT_SET_FLIGHT_INFO,
    FLIGHT_SET_INSURANCE_PACKAGE_INFO,
    SET_CUSTOM_FLIGHT_INFO,
    SET_CUSTOM_DEPART_FLIGHT,
    SET_CUSTOM_RETURN_FLIGHT
} from '../../../config/types';

export const setCustomerInfo = (data) => {
    return {
        type: FLIGHT_SET_CUSTOMERS_INFO,
        data
    }
}
export const saveCustomerInfo = (body) => {
    return dispatch => {
        dispatch(setCustomerInfo(body))
    }
}
export const setFlightInfo = (data) => {
    return {
        type: FLIGHT_SET_FLIGHT_INFO,
        data
    }
}
export const saveFlightInfo = (body) => {
    return dispatch => {
        dispatch(setFlightInfo(body))
    }
}
export const setBillInfo = (data) => {
    return {
        type: FLIGHT_SET_BILL_INFO,
        data
    }
}
export const saveBillInfo = (body) => {
    return dispatch => {
        dispatch(setBillInfo(body))
    }
}
export const setInsurancePackageInfo = (data) => {
    return {
        type: FLIGHT_SET_INSURANCE_PACKAGE_INFO,
        data
    }
}
export const saveInsurancePackageInfo = (body) => {
    return dispatch => {
        dispatch(setInsurancePackageInfo(body))
    }
}
export const setCustomFlightInfo = (data) => {
    return {
        type: SET_CUSTOM_FLIGHT_INFO,
        data
    }
}
export const saveCustomFlightInfo = (body) => {
    return dispatch => {
        dispatch(setCustomFlightInfo(body))
    }
}
export const setCustomDepartFlightInfo = (data) => {
    return {
        type: SET_CUSTOM_DEPART_FLIGHT,
        data
    }
}
export const saveCustomDepartFlightInfo = (body) => {
    return dispatch => {
        dispatch(setCustomDepartFlightInfo(body))
    }
}
export const setCustomArrivalFlightInfo = (data) => {
    return {
        type: SET_CUSTOM_RETURN_FLIGHT,
        data
    }
}
export const saveCustomArrivalFlightInfo = (body) => {
    return dispatch => {
        dispatch(setCustomArrivalFlightInfo(body))
    }
}