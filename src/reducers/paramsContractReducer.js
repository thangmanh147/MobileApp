import {
    SAVE_PARAMS_CONTRACT  
} from '../config/types';

const initialState = {
    paramsContract: null,
};

export default function paramsContract(state = initialState, action) {
    switch (action.type) {
        case SAVE_PARAMS_CONTRACT:
            return {
                ...state,
                paramsContract: action.data,
            };
        default:
            return state;
    }
};
