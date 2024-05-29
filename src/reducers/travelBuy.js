import {
    TRAVEL_GET_PACKAGES,
    TRAVEL_SAVE_BUYER_INFO,
    TRAVEL_SAVE_TOUR_INFO,
    TRAVEL_SAVE_PACKAGE_INFO,
    TRAVEL_SAVE_INSURED_CUSTOMER_INFO,
    TRAVEL_SAVE_INSURED_TYPE
} from '../config/types';

const initialState = {
    listPackages: null,
    tourInfo: null,
    insuredCustomerInfo: null,
    insuredType: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case TRAVEL_GET_PACKAGES:
            return {
                ...state,
                listPackages: action.data
            };
        case TRAVEL_SAVE_TOUR_INFO:
            return {
                ...state,
                tourInfo: action.data
            };
        case TRAVEL_SAVE_INSURED_CUSTOMER_INFO:
            return {
                ...state,
                insuredCustomerInfo: action.data
            };
        case TRAVEL_SAVE_INSURED_TYPE:
            return {
                ...state,
                insuredType: action.data
            };
        default:
            return state
    }
};
