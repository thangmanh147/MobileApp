import {
    SET_INFO_DELAY_FLIGHT,
    SET_DELAY_FLIGHT_PACKAGES,
    SAVE_BUYER_DELAY_FLIGHT,
    SET_CODE_NUMBER,
} from '../../../config/types';

export const setDelayFlight = (data) => {
    return {
        type: SET_INFO_DELAY_FLIGHT,
        data
    }
}
export const saveInfoDelayFlight = (body) => {
    return dispatch => {
        dispatch(setDelayFlight(body))
    }
}

export const setCodeNumber = (data) => {
    return {
        type: SET_CODE_NUMBER,
        data
    }
}
export const saveCodeNumber = (body) => {
    return dispatch => {
        dispatch(setCodeNumber(body))
    }
}

export const setDelayFlightPackages = (data) => {
    return {
        type: SET_DELAY_FLIGHT_PACKAGES,
        data
    }
}
export const saveDelayFlightPackages = (body) => {
    return dispatch => {
        dispatch(setDelayFlightPackages(body))
    }
}

export const setBuyerDelayFlight = (data) => {
    return {
        type: SAVE_BUYER_DELAY_FLIGHT,
        data
    }
}

export const saveBuyerDelayFlight = (body) => {
    return dispatch => {
        dispatch(setBuyerDelayFlight(body))
    }
}
