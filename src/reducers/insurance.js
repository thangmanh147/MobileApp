import {
    INSURANCE_SET_INFO,
    SET_PERMISSION_USER,
    SET_TOKEN_INSUR,
} from '../config/types'

const initialState = {
    insuranceInfo: null,
    permissionUser: null,
    tokenInsur: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case INSURANCE_SET_INFO:
            return {
                ...state,
                insuranceInfo: action.data
            };
        case SET_PERMISSION_USER:
            return {
                ...state,
                permissionUser: action.data
            };
        case SET_TOKEN_INSUR:
            return {
                ...state,
                tokenInsur: {...state.tokenInsur, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
