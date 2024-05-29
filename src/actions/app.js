

import {
    APP_GET_DISTRICT,
    SET_CAR_INSURANCE_TYPE
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';
import {Alert} from 'react-native';

let HTTP = require('../services/HTTP');

export const getListDistrictSuccess = (data) => {
	return {
        type: APP_GET_DISTRICT,
        data
	}
}

export const getListDistrict = (body) => {
	return dispatch => {
		return HTTP.post(body)
		.then(res => {
			switch(res.result_code) {
                case '0000':
                    dispatch(getListDistrictSuccess(res.result_data.districts));
                    return;
                case '9002':
                    Actions.ForceUpdate({message: res.result_message})
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(getListDistrictSuccess([]));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(getListDistrictSuccess([]));
                    return;
			}
		})
		.catch((error) => {
            dispatch(getListDistrictSuccess([]));
		});
	};
}
export const setCarInsuranceType = (data) => {
    return {
        type: SET_CAR_INSURANCE_TYPE,
        data
    }
}
export const saveCarInsuranceType = (body) => {
    return dispatch => {
        dispatch(setCarInsuranceType(body))
    }
}