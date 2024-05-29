

import {
  CLAIM_REQUEST,
  CLAIM_SUCCESS,
  CLAIM_FAIL,
    LOAD_OWN_IMAGE
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

let HTTP = require('../services/HTTP');

//get list compensation
export const request = () => {
    return {
        type: CLAIM_REQUEST,
    }
}
export const loadClaimSuccess = (data) => {
    return {
        type:CLAIM_SUCCESS,
        data,
    }
}

export const fail = () => {
    return {
        type: CLAIM_FAIL,
    }
}

export const loadClaim = (body) => {
    return dispatch => {
        dispatch(request())
        return HTTP.post(body)
        .then(res => {
            switch(res.result_code) {
            case '0000':
                dispatch(loadClaimSuccess(res.result_data.claims));
                return;
            case '1001':
                SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                Actions.login({type: 'reset'})
                dispatch(fail());
                return;
            case '9002':
                Actions.ForceUpdate({message: res.result_message})
                return;
            default:
                SimpleToast.show(res.result_message)
                dispatch(fail());
                return;
            }
        })
        .catch((error) => {
            dispatch(fail())
        });
    };
}
export const loadOwnImageSuccess = (data) => {
    return {
        type:LOAD_OWN_IMAGE,
        data,
    }
}
export const getListOweContracts = (body) => {
    return dispatch => {
        dispatch(request())
        return HTTP.post(body)
            .then(res => {
                switch(res.result_code) {
                    case '0000':
                        dispatch(loadOwnImageSuccess(res.result_data.contracts));
                        return;
                    case '1001':
                        SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                        Actions.login({type: 'reset'})
                        dispatch(fail());
                        return;
                    case '9002':
                        Actions.ForceUpdate({message: res.result_message})
                        return;
                    default:
                        SimpleToast.show(res.result_message)
                        dispatch(fail());
                        return;
                }
            })
            .catch((error) => {
                dispatch(fail())
            });
    };
}