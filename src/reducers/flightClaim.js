

import {
    FLIGHT_GET_GROUP_DOCUMENT, FLIGHT_LOADING
} from '../config/types';

const initialState = {
    groupFlightClaimDocument:null,
    loading: null,

}

export default function flightClaim (state = initialState, action) {
    switch(action.type) {
        case FLIGHT_GET_GROUP_DOCUMENT:
            return {
                ...state,
                groupFlightClaimDocument: action.data
            }
        case FLIGHT_LOADING:
            return {
                ...state,
                loading: action.data
            }
        default:
            return state
    }
}