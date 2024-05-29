

import {
    LOVE_CLAIM_TARGET_SUCCESS,
    LOVE_CLAIM_LOADING,
} from '../config/types';
  
const initialState = {
    loading: null,
    targets: null,
}
  
export default function loveClaim (state = initialState, action) {
    switch(action.type) {
        case LOVE_CLAIM_TARGET_SUCCESS:
            return {
                ...state,
                targets: action.data
            }
        case LOVE_CLAIM_LOADING:
            return {
                ...state,
                loading: action.data
            }
        default: 
            return state
    }
}