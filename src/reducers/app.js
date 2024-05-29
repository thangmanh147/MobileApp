

import {
    APP_GET_DISTRICT,
    SET_CAR_INSURANCE_TYPE
} from '../config/types';

const initialState = {
    loading: null,
    districts: null,
    carInsuranceType: null
}

export default function app(state = initialState, action) {
    switch (action.type) {
        case APP_GET_DISTRICT:
            return {
                ...state,
                districts: action.data
            }
        case SET_CAR_INSURANCE_TYPE:
            return {
                ...state,
                carInsuranceType: action.data
            }
        default:
            return state
    }
}