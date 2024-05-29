

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_WITH_OTP,
  CONFIRM_REF_CODE
} from '../config/types';

const initialState = {
	auth: null,
	loading: null,
	loginWithOtp: null,
	refCodeSuccess:null,
}

export default function auth (state = initialState, action) {
	switch(action.type) {
		case LOGIN_WITH_OTP:
			return {
				...state,
				loginWithOtp: action.data,
			}
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: null,
			}
		case LOGIN_FAIL:
			return {
				...state,
				loading: null,
			}
        case CONFIRM_REF_CODE:
            return {
                ...state,
                refCodeSuccess: action.data,
            }
		default: 
			return state
	}
}