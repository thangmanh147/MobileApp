

import {
	BUY_REQUEST,
	BUY_SUCCESS,
	BUY_FAIL,
	CONTRACT_INFO_SUCCESS,
	GET_PAY_SUCCESS,
	WEB_PAY_SUCCESS,
	WEB_PAY_ERROR,
	CLOSE_WEB_PAY_ERROR,
	CLOSE_WEB_PAY,
	BUY_SHOW_PAY_CONTINUE,
	GET_INFO_DISCOUNT_ACTIVATED,
	GET_INFO_DISCOUNT_ACTIVATED_COLLABORATOR,

	SAVE_ORDER_INFOMATION,
	SAVE_ORDER_ID
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

let HTTP = require('../services/HTTP');

export const setOrderInfomation = (data) => {
	return {
		type: SAVE_ORDER_INFOMATION,
		data
	}
}
export const saveOrderInfomation = (body) => {
	return dispatch => {
		dispatch(setOrderInfomation(body))
	}
}
export const setOrderId = (data) => {
	return {
		type: SAVE_ORDER_ID,
		data
	}
}
export const saveOrderId = (body) => {
	return dispatch => {
		dispatch(setOrderId(body))
	}
}

//updateBuyerAddress
// export const updateBuyerAddress = (body, status, sale_order_id,amount_money) => {
// 	return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
// 			switch(res.result_code) {
// 				case '0000':
// 					if (status == 'active') {
// 						dispatch(buyFail());
// 						Actions.NewTransactionPasscode({contract_id: body.params.contract_id,sale_order_id})
// 						return;
// 					} else if (status == 'nonactive') {
// 						dispatch(buyFail());
// 						Actions.payList({payment_amount: amount_money ? amount_money : res.result_data.payment_amount, sale_order_id  ,contract_id: body.params.contract_id, back: 'home'})
// 						return;
// 					} else {
// 						dispatch(buyFail());
// 						return null;
// 					}
// 					// dispatch(buyFail());
// 					// return;
// 				case '9002':
// 					Actions.ForceUpdate({message: res.result_message})
//                     return;
// 				case '1001':
// 					SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 					Actions.login({type: 'reset'})
// 					dispatch(buyFail());
// 					return;
// 				default:
// 					SimpleToast.show(res.result_message)
// 					dispatch(buyFail());
// 					return;
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(buyFail());
// 		});
// 	};
// }

// //loveGetPayStatus
// export const showPayContinue = data => {
// 	return {
// 		type: BUY_SHOW_PAY_CONTINUE,
// 		data
// 	}
// }
// export const loveGetPayStatus = (body) => {
// 	return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
// 			switch(res.result_code) {
// 			case '0000':
// 				if(res.result_data.payment_status.code == 'PAYMENT_STATUS_PAID') {
// 					Actions.loveBuyPaySuccess({contract_id: body.params.contract_id, back: 'home'})
// 					dispatch(buyFail());
// 				}else {
// 					dispatch(showPayContinue(true))
// 					dispatch(buyFail());
// 				}
// 				return;
// 			case '9002':
// 				Actions.ForceUpdate({message: res.result_message})
// 				return;
// 			case '1001':
// 				SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 				Actions.login({type: 'reset'})
// 				dispatch(buyFail());
// 				return;
// 			default:
// 				SimpleToast.show(res.result_message)
// 				return;
// 			}
// 		})
// 		.catch((error) => {
// 		});
// 	};
// }
// //sendEmail
// export const sendEmail = (body) => {
// 	return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
// 			switch(res.result_code) {
// 			case '0000':
// 				Alert.alert(
// 				'Thông báo!',
// 				'Hệ thống đã gửi giấy chứng nhận điện tử đến email của bạn',
// 				[
// 					{text: 'OK'},
// 				],
// 				)
// 				dispatch(buyFail());
// 				if(res.result_data.screen_home === true){
//                     Actions.tab({type: 'reset'})
//                 }else{
//                     Actions.InsuranceProfile({type: 'reset', back: 'home'})
//                 }
// 				return;
// 			case '9002':
// 				Actions.ForceUpdate({message: res.result_message})
// 				return;
// 			case '1001':
// 				SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 				Actions.login({type: 'reset'})
// 				dispatch(buyFail());
// 				return;
// 			default:
// 				SimpleToast.show(res.result_message)
// 				dispatch(buyFail());
// 				return;
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(buyFail());
// 		});
// 	};
// }

// //get pay status
// export const getPayStatus = (body) => {
// 	return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
// 			switch(res.result_code) {
// 			case '0000':
// 				if(res.result_data.payment_status.code == 'PAYMENT_STATUS_PAID') {
// 					Actions.paySuccess({contract_id: body.params.contract_id, back: 'home'})
// 				}
// 				dispatch(buyFail());
// 				return;
// 			case '1001':
// 				SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 				Actions.login({type: 'reset'})
// 				dispatch(buyFail());
// 				return;
// 			case '9002':
// 				Actions.ForceUpdate({message: res.result_message})
// 				return;
// 			default:
// 				SimpleToast.show(res.result_message)
// 				dispatch(buyFail());
// 				return;
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(buyFail());
// 		});
// 	};
// }
// export const getPayStatusFlight = (body) => {

//     return dispatch => {
//         return HTTP.post(body)
//             .then(res => {
//                 switch(res.result_code) {
//                     case '0000':
//                         if(res.result_data.payment_status.code == 'PAYMENT_STATUS_PAID') {
//                             Actions.FlightPaymentSuccess({contract_id: body.params.contract_id, back: 'home'})
//                         }
//                         return;
//                     case '1001':
//                         SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
//                         Actions.login({type: 'reset'})
//                         dispatch(buyFail());
// 						return;
// 					case '9002':
// 						Actions.ForceUpdate({message: res.result_message})
// 						return;
//                     default:
//                         SimpleToast.show(res.result_message)
//                         return;
//                 }
//             })
//             .catch((error) => {
//             });
//     };
// }
// //submitPay
// export const closeWebPay = () => {
// 	return {
// 		type: CLOSE_WEB_PAY,
// 	}
// }
// export const closeWebPayError = () => {
//     return {
//         type: CLOSE_WEB_PAY_ERROR,
//     }
// }
// export const submitPaySuccess = (data) => {
//     return {
//         type: WEB_PAY_SUCCESS,
//         data,
//     }
// }
// export const submitPayError = (data) => {
//     return {
//         type: WEB_PAY_ERROR,
//         data,
//     }
// }
// export const submitPay = (body) => {
// 	return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
//             switch(res.result_code) {
// 			case '0000':
// 				dispatch(submitPaySuccess(res.result_data));
// 				dispatch(buyFail());
// 				return;
//             case '2038':
//                     dispatch(submitPayError(res.result_message));
//                     dispatch(buyFail());
// 					return;
// 			case '9002':
// 				Actions.ForceUpdate({message: res.result_message})
// 				return;
// 			case '1001':
// 				SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 				Actions.login({type: 'reset'})
// 				dispatch(buyFail());
// 				return;
// 			default:
// 				SimpleToast.show(res.result_message)
// 				dispatch(buyFail());
// 				return;
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(buyFail())
// 		});
// 	};
// }

// //getPay
// export const getPaySuccess = (data) => {
// 	return {
// 		type: GET_PAY_SUCCESS,
// 		data,
// 	}
// }
// export const getPay = (body) => {
// 	return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
//             switch(res.result_code) {
// 			case '0000':
// 				dispatch(getPaySuccess(res.result_data.methods));
// 				dispatch(buyFail());
// 				return;
// 			case '1001':
// 				SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 				Actions.login({type: 'reset'})
// 				dispatch(buyFail());
// 				return;
// 			case '9002':
// 				Actions.ForceUpdate({message: res.result_message})
// 				return;
// 			default:
// 				SimpleToast.show(res.result_message)
// 				dispatch(buyFail());
// 				return;
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(buyFail())
// 		});
// 	};
// }
// export const getPayFlight = (body) => {
//     return dispatch => {
//         dispatch(request())
//         return HTTP.post(body)
//             .then(res => {
//                 switch(res.result_code) {
//                     case '0000':
//                         dispatch(getPaySuccess(res.result_data.payment_status));
//                         return;
//                     case '1001':
//                         SimpleToast.show('Hết phiên làm việc. Vui lòng đăng nhập lại')
//                         Actions.login({type: 'reset'})
//                         dispatch(buyFail());
// 						return;
// 					case '9002':
// 						Actions.ForceUpdate({message: res.result_message})
// 						return;
//                     default:
//                         SimpleToast.show(res.result_message)
//                         dispatch(buyFail());
//                         return;
//                 }
//             })
//             .catch((error) => {
//                 dispatch(buyFail())
//             });
//     };
// }
// // contract detail
// export const contractInfoSuccess = (data) => {
// 	return {
// 		type: CONTRACT_INFO_SUCCESS,
// 		data,
// 	}
// }

// export const getListDiscountActived = data => {
//     return {
//         type: GET_INFO_DISCOUNT_ACTIVATED,
//         data
//     }
// }

// export const getListDiscountActivedCollaborator = data => {
//     return {
//         type: GET_INFO_DISCOUNT_ACTIVATED_COLLABORATOR,
//         data
//     }
// }

// export const contractInfo = (body) => {
//     return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
// 			switch(res.result_code) {
// 			case '0000':
// 				// if (res.result_data.sale_order_info.gift_codes.length > 0) {
// 				// 	dispatch(getListDiscountActivedCollaborator(res.result_data.sale_order_info.gift_codes));
// 				// 	dispatch(getListDiscountActived(res.result_data.sale_order_info.gift_codes));
// 				// }
// 				dispatch(contractInfoSuccess(res.result_data));
// 				return;
// 			case '1001':
// 				SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 				Actions.login({type: 'reset'})
// 				dispatch(buyFail());
// 				return;
// 			case '9002':
// 				Actions.ForceUpdate({message: res.result_message})
// 				return;
// 			default:
// 				SimpleToast.show(res.result_message)
// 				dispatch(buyFail());
// 				return;
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(buyFail())
// 		});
// 	};
// }

// //get list buy
// export const request = () => {
// 	return {
// 		type: BUY_REQUEST,
// 	}
// }
// export const buySuccess = (data) => {
// 	return {
// 		type:BUY_SUCCESS,
// 		data,
// 	}
// }

// export const buyFail = () => {
// 	return {
// 		type: BUY_FAIL,
// 	}
// }

// export const loadBuy = (body) => {
// 	return dispatch => {
// 		dispatch(request())
// 		return HTTP.post(body)
// 		.then(res => {
// 			switch(res.result_code) {
// 			case '0000':
// 				dispatch(buySuccess(res.result_data.sale_orders));
// 				return;
// 			case '1001':
// 				SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
// 				Actions.login({type: 'reset'})
// 				dispatch(buyFail());
// 				return;
// 			case '9002':
// 				Actions.ForceUpdate({message: res.result_message})
// 				return;
// 			default:
// 				SimpleToast.show(res.result_message)
// 				dispatch(buyFail());
// 				return;
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(buyFail())
// 		});
//  	};
// }
