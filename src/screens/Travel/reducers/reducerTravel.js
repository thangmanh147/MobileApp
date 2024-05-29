import {
    SET_INFO_TRAVEL,
    SET_TRAVEL_PACKAGES,
    SAVE_BUYER_TRAVEL,
    RESET_DATA_TRAVEL,
    SAVE_SELL_INFO
} from '../../../config/types';

const initialState = {
    travelInfo: null,
    travelBuyer: null,
    travelPackages: null,
    sellInfo: null,
};

export default function travel(state = initialState, action) {
    switch (action.type) {
        case SET_INFO_TRAVEL:
            return {
                ...state,
                travelInfo: action.data,
            };
        case SET_TRAVEL_PACKAGES:
            return {
                ...state,
                travelPackages: action.data,
            };
        case SAVE_BUYER_TRAVEL:
            return {
                ...state,
                travelBuyer: action.data,
            };
        case SAVE_SELL_INFO:
            return {
                ...state,
                sellInfo: action.data,
            };
        case RESET_DATA_TRAVEL:
            return {
                ...state,
                travelInfo: null,
                travelPackages: null,
                travelBuyer: null
            };
        default:
            return state;
    }
};
