
import Store from '../services/Store';
import Const from '../services/Const';
import jwt_decode from "jwt-decode";
import moment from 'moment';

import {
  SET_LOG_CONTRACT,
} from '../config/types';

export const saveLogContract = (id, obj) => ({
  type: SET_LOG_CONTRACT,
  data: { id: id, obj: obj },
})

export const logEventContract = (serviceName, data) => {
  return dispatch => {
    new Store().getSession(Const.TOKEN).then(token => {
      const dataToken = jwt_decode(token);
      const user = {
        userInfo: {
          userName: dataToken?.preferred_username || '',
          userId: dataToken?.userId || '',
          organizationId: dataToken?.organizationId || '',
        }
      };
      let body = {
        "serviceName": serviceName,
        "extraData": Object.assign(data, user),
        "headers": { "Content-Type": "application/json" },
        "method": "POST",
        "params": {},
        "response": {},
        "statusCode": 200,
        "time": moment().format(),
        "url": ''
      }
      let _url = `https://logging.capdon.vn/v1/logging/InsoAPI`
      fetch(_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(async (res) => {
          console.log('======res1', res)
          if (res.status == 200 || res.status == 'success') {
          } else {
          }
        })
        .catch(async (error) => {
          console.log(error)
        })
    })
  }
}

