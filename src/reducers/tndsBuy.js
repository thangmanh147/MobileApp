import {
    TNDS_SET_CAR_INFO,
    TNDS_SET_CUSTOMER_INFO,
    TNDS_SET_PACKAGES
} from '../config/types';

const initialState = {
    carInfoTnds: null,
    customerInfoTnds: null,
    packagesTnds: null
}

export default function tndsBuy(state = initialState, action) {
    switch (action.type) {
        case TNDS_SET_CAR_INFO:
            return {
                ...state,
                carInfoTnds: action.data
            }
        case TNDS_SET_CUSTOMER_INFO:
            return {
                ...state,
                customerInfoTnds: action.data
            }
        case TNDS_SET_PACKAGES:
            return {
                ...state,
                packagesTnds: action.data
            }
        default:
            return state
    }
}