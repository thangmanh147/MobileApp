

import {
	BUY_REQUEST,
	BUY_SUCCESS,
	BUY_FAIL,
	CONTRACT_INFO_SUCCESS,
	GET_PAY_SUCCESS,
	WEB_PAY_SUCCESS,
	CLOSE_WEB_PAY,
	CLOSE_WEB_PAY_ERROR,
	BUY_SHOW_PAY_CONTINUE,
	WEB_PAY_ERROR,
	SAVE_ORDER_INFOMATION,
	SAVE_ORDER_ID
} from '../config/types';

const initialState = {
	buy: null,
	loading: null,
	contractInfo: null,
	pays: null,
	webPay: null,
	showPayContinue: null,
	webPayError: null,
	check_out_id: null,

	orderInfomation: null,
	orderId: null
}

export default function buy(state = initialState, action) {
	switch (action.type) {
		case SAVE_ORDER_INFOMATION:
			return {
				...initialState,
				orderInfomation: action.data
			}
		case SAVE_ORDER_ID:
			return {
				...initialState,
				orderId: action.data
			}
		default:
			return state;
	}
}