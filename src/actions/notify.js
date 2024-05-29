

import {
  NOTIFY_REQUEST,
  NOTIFY_SUCCESS,
  NOTIFY_FAIL,
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import {Actions} from "react-native-router-flux";

let HTTP = require('../services/HTTP');

//getHome
export const notifyRequest = () => {
  return {
    type: NOTIFY_REQUEST,
  }
}
export const notifySuccess = (data) => {
  return {
    type: NOTIFY_SUCCESS,
    data,
  }
}

export const notifyFail = () => {
  return {
    type: NOTIFY_FAIL,
  }
}

export const loadNoti = (body) => {
  return dispatch => {
    dispatch(notifyRequest())
    return HTTP.post(body)
      .then(res => {
        switch(res.result_code) {
          case '0000':
            dispatch(notifySuccess(res.result_data.list_notify));
            return;
          case '9002':
            Actions.ForceUpdate({message: res.result_message})
            return;
          case '1001':
            SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại');
            Actions.login({type: 'reset'})
            return;
          default:
            SimpleToast.show(res.result_message)
            dispatch(notifyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(notifyFail())
      });
  };
}
export const updateStatusViewed = (body) => {
    return dispatch => {
        dispatch(notifyRequest())
        return HTTP.post(body)
            .then(res => {
                switch(res.result_code) {
                    case '0000':
                        Actions.tab({type: 'reset'})
                        return;
                      case '9002':
                        Actions.ForceUpdate({message: res.result_message})
                        return;   
                    default:
                        SimpleToast.show(res.result_message)
                        Actions.tab({type: 'reset'})
                        dispatch(notifyFail());
                        return;
                }
            })
            .catch((error) => {
                Actions.tab({type: 'reset'})
                dispatch(notifyFail())
            });
    };
}