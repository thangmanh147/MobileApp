

import {
  CLAIM_REQUEST,
  CLAIM_SUCCESS,
  CLAIM_FAIL,
} from '../config/types';

const initialState = {
  claim: null,
  loading: null,
}

export default function claim (state = initialState, action) {
  switch(action.type) {
    case CLAIM_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case CLAIM_SUCCESS:
      return {
        ...state,
        loading: null,
        claim: action.data
      }
    case CLAIM_FAIL:
      return {
        ...state,
        loading: null,
      }
    default: 
      return state
  }
}