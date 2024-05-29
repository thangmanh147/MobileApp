
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_WITH_OTP,
	PROFILE_GET_INFO_SUCCESS,
	CONFIRM_REF_CODE
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import Store from '../services/Store';
import { getMobileCardCodeSuccess } from "./profile";
import { nameApp, URL } from '../config/System';
const HTTP = require('../services/HTTP');
const Const = require('../services/Const');


//logout
export const logout = (body) => {
	return dispatch => {
		return HTTP.post(body)
			.then(res => {
				switch (res.result_code) {
					case '0000':
						new Store().storeSession(Const.IS_LOGIN, null);
						new Store().storeSession(Const.SESSION_ID, null);
						new Store().storeSession(Const.SESSION_KEY, null);
						return;
					case '9002':
						Actions.ForceUpdate({ message: res.result_message })
						return;
					default:
						return;
				}
			})
			.catch((error) => {
				dispatch(loginFail())
			});
	};
}

// getInfo
export const getInfoSuccess = data => {
	return {
		type: PROFILE_GET_INFO_SUCCESS,
		data
	}
}

export const getInfo = (body) => {
	return dispatch => {
		return HTTP.post(body).then(res => {
			switch (res.result_code) {
				case '0000':
					dispatch(getInfoSuccess(res.result_data.customer))
					return;
				case '1001':
					SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
					Actions.login({ type: 'reset' })
					return;
				case '9002':
					Actions.ForceUpdate({ message: res.result_message })
					return;
				default:
					SimpleToast.show(res.result_message)
					return;
			}
		})
			.catch((error) => {
				Actions.login({ type: 'reset' })
			});
	};
}
//check login

export const loginRequest = () => {
	return {
		type: LOGIN_REQUEST,
	}
}
export const loginSuccess = () => {
	return {
		type: LOGIN_SUCCESS,
	}
}
export const loginFail = () => {
	return {
		type: LOGIN_FAIL,
	}
}

export const updateFirstLogin = (body) => {
	return dispatch => {
		dispatch(loginRequest());
		return HTTP.post(body)
			.then(res => {
				switch (res.result_code) {
					case '0000':
						dispatch(loginSuccess());
						Actions.tab({ type: 'reset' })
						return;
					case '9002':
						Actions.ForceUpdate({ message: res.result_message })
						return;
					case '1007':
						dispatch(loginWithOTP(true));
						return;
					default:
						SimpleToast.show(res.result_message);
						dispatch(loginFail());
						return;
				}
			})
			.catch((error) => {
				dispatch(loginFail())
			});
	};
}
export const updateRefCode = (data) => {
	return {
		type: CONFIRM_REF_CODE,
		data
	}
}
export const updateAffiliateCode = (body) => {
	return dispatch => {
		dispatch(loginRequest());
		return HTTP.post(body)
			.then(res => {

				switch (res.result_code) {
					case '0000':
						dispatch(loginSuccess());
						dispatch(updateRefCode({ refCodeSuccess: true }))
						return;
					case '9002':
						Actions.ForceUpdate({ message: res.result_message })
						return;
					default:
						SimpleToast.show(res.result_message);
						dispatch(loginFail());
						return;
				}
			})
			.catch((error) => {
				dispatch(loginFail())
			});
	};
}
export const checkLogin = () => {
	return dispatch => {
		new Store().getSession(Const.IS_LOGIN).then(isLogin => {
			if (isLogin) {
				if (nameApp.includes('IAGENT') || nameApp.includes('INSO')) {
					Actions.tab();
				} else {
					Actions.InsuranceType();
				}
			} else {
				if (nameApp.includes('IAGENT') || nameApp.includes('INSO')) {
					Actions.tab();
				} else {
					Actions.LoginNew();
				}
            }
		})
	}
}

export const onLogin = (body) => {
	return dispatch => {
		dispatch(loginRequest())
		let url = `${URL}/api/account/v1/users/login`
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body)
		})
			.then(res => {
				if (res.status >= 200 && res.status < 300) {
					dispatch(loginSuccess())
					return res.json()
						.then(response => {
							console.log('response-login',response)
							new Store().storeSession(Const.TOKEN, response?.data?.access_token)
							new Store().storeSession(Const.IS_LOGIN, true)
							Actions.tab()
						})
				} else {
					dispatch(loginFail())
					SimpleToast.show('Tài khoản hoặc mật khẩu không đúng')
				}
			})
	}
}
