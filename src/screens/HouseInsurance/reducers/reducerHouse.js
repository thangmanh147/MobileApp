import {
    SET_HOUSE_PACKAGES,
    SAVE_BUYER_HOUSE,
    RESET_DATA_HOUSE
} from '../../../config/types';

const initialState = {
    infoHouse: null,
    buyer: null,
};

export default function motor(state = initialState, action) {
    switch (action.type) {
        case SET_HOUSE_PACKAGES:
            return {
                ...state,
                infoHouse: action.data,
            };
        case SAVE_BUYER_HOUSE:
            return {
                ...state,
                buyer: action.data,
            };
        case RESET_DATA_HOUSE:
            return {
                ...state,
                infoHouse: null,
                buyer: null,
            };
        default:
            return state;
    }
};
