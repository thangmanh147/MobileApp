

import {
  NOTIFY_REQUEST,
  NOTIFY_SUCCESS,
  NOTIFY_FAIL,
} from '../config/types';

const initialState = {
  notify: null,
  loading: null,
}

export default function search (state = initialState, action) {
  switch(action.type) {
    case NOTIFY_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case NOTIFY_SUCCESS:
      return {
        ...state,
        loading: null,
        notify: action.data
      }
    case NOTIFY_FAIL:
      return {
        ...state,
        loading: null,
      }
    default: 
      return state
  }
}