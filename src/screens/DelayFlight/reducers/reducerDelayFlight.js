import {
    SET_INFO_DELAY_FLIGHT,
    SET_DELAY_FLIGHT_PACKAGES,
    SAVE_BUYER_DELAY_FLIGHT,
    SET_CODE_NUMBER,
    RESET_DATA_DELAY_FLIGHT,
} from '../../../config/types';

const initialState = {
    delayFlightInfo: null,
    delayFlightPackages: null,
    travelPackages: null,
    codeNumber: null,
};

export default function travel(state = initialState, action) {
    switch (action.type) {
        case SET_INFO_DELAY_FLIGHT:
            return {
                ...state,
                delayFlightInfo: action.data,
            };
        case SET_CODE_NUMBER:
            return {
                ...state,
                codeNumber: action.data,
            };
        case SET_DELAY_FLIGHT_PACKAGES:
            return {
                ...state,
                delayFlightPackages: action.data,
            };
        case SAVE_BUYER_DELAY_FLIGHT:
            return {
                ...state,
                delayFlightBuyer: action.data,
            };
        case RESET_DATA_DELAY_FLIGHT:
            return {
                ...state,
                delayFlightInfo: null,
                codeNumber: null,
                delayFlightPackages: null,
                delayFlightBuyer: null
            };
        default:
            return state;
    }
};
