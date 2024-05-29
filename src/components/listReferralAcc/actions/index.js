import { URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
    GET_LIST_REFERRAL_ACC,
} from "../../../config/types";

export const getListReferralAccSuccess = (data) => ({
  type: GET_LIST_REFERRAL_ACC,
  data
})
export const getListReferralAcc = (userId, orgId) => {
  let url = `${URL}/api/account/v1/users/${userId || ''}/referral-accounts?checkHasContract=true&organizationId=${orgId || ''}`;
  console.log('URL - ACCOUNT : ', url)
  return dispatch => {
    new Store().getSession(Const.TOKEN).then(token => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json().then(data => {
              console.log('REQ - ACCOUNT : ', data?.data)
              dispatch(getListReferralAccSuccess(data?.data || []));
            });
          } else {
            dispatch(getListReferralAccSuccess([]));
          }
        })
        .catch(error => {
          console.log(error)
          dispatch(getListReferralAccSuccess([]));
        })
    })
  }
}
