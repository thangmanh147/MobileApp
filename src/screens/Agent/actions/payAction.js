import { URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
    PAYMENT_METHOD_SET_INFORMATION,
    PAYMENT_METHOD_SET_BANK_INFORMATION,
} from "../../../config/types";

export const getPaymentMethodSuccess = (id, obj) => ({
  type: PAYMENT_METHOD_SET_INFORMATION,
  data: {id: id, obj: obj},
})
export const getPaymentMethod = (insuranceProductId) => {
  return dispatch => {
    new Store().getSession(Const.URL_ORC).then(urlORC => {
      let url = `${urlORC || URL}/api/payment/v1/payment-method?insuranceProductId=${insuranceProductId}`;
      console.log('REQ - PAY : ', url)
      new Store().getSession(Const.TOKEN).then(token => {
              fetch(url, {
                method: 'GET',
                headers: {
                  Authorization: token,
                },
              })
              .then((res) => {
                  if(res.status === 200) {
                      return res.json().then(data => {
                        console.log('REQ - PAY - SUCCESS : ', data?.data)
                          dispatch(getPaymentMethodSuccess(insuranceProductId, data?.data));
                      });
                  }
              })
              .catch(error => {
                  console.log(error)
              })
      })
    })
  }
}


export const getDataBankSuccess = (id, obj) => ({
  type: PAYMENT_METHOD_SET_BANK_INFORMATION,
  data: {id: id, obj: obj},
})
export const getDataBank = (insuranceProductId) => {
  return dispatch => {
    new Store().getSession(Const.URL_ORC).then(urlORC => {
      let url = `${urlORC || URL}/api/payment/v1/bank-account?insuranceProductId=${insuranceProductId}`;
      new Store().getSession(Const.TOKEN).then(token => {
              fetch(url, {
                method: 'GET',
                headers: {
                  Authorization: token,
                },
              })
              .then((res) => {
                  if(res.status === 200) {
                      return res.json().then(data => {
                        console.log('REQ - PAY - SUCCESS : ', data?.data)
                          dispatch(getDataBankSuccess(insuranceProductId, data?.data));
                      });
                  }
              })
              .catch(error => {
                  console.log(error)
              })
      })
    })
  }
}
