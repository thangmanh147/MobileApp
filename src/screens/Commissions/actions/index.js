import { URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
  COMMISSIONS_SET_INFORMATION,
  COMMISSIONS_SET_LIST,
  COMMISSIONS_SET_TOTAL_FULL
} from "../../../config/types";
import axios from 'axios'

export const getCommissionsSuccess = (data) => ({
  type: COMMISSIONS_SET_INFORMATION,
  data
})
export const getCommissions = (fromDate, toDate, chartType) => {
  let url = `${URL}/api/contract/v1/commissions/me`;
  let body = {
    "fromDate": fromDate,
    "toDate": toDate,
    "chartType": chartType,
  };
  return dispatch => {
    new Store().getSession(Const.TOKEN).then(token => {
      console.log('TOKEN : ', token)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Cookie: 'connect.sid=s%3Aan9NFRq4tYipNuUFDdUCpaAm-SovbGRb.rBQHeMNh2hofpdUEuEIA8%2BHGN8ghnwF5TwDy7z3HwyY',
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json().then(data => {
              console.log('REQ - APIIIII - SUCCESS : ', data?.data)
              dispatch(getCommissionsSuccess(data?.data));
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

export const getListTotal = (obj) => {
  let url = `${URL}/api/contract/v1/commissions/me/group?organizationId=${obj?.orgId || ''}&dateType=${obj?.dateType || ''}&fromDate=${obj?.startDateStr || ''}&toDate=${obj?.endDateStr || ''}&product=${obj?.productCode || ''}`;
  console.log('URL-COMMIS-TOTAL: ', url);
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
          console.log('RESQ : ', res)
          if (res.status === 200) {
            return res.json().then(data => {
              console.log('REQ - COMMIS - TOTAL : ', data?.data)
              dispatch(getListCommissionSuccess('3', {list: data?.data, options: obj}));
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

export const getListCommissionSuccess = (id, data) => ({
  type: COMMISSIONS_SET_LIST,
  data: { id: id, obj: data },
})
export const getListCommission = (obj) => {
  let url = `${URL}/api/contract/v1/commissions/total?organizationId=${obj?.orgId || ''}&dateType=${obj?.dateType || ''}&fromDate=${obj?.startDateStr || ''}&toDate=${obj?.endDateStr || ''}&product=${obj?.productCode || ''}`;
  console.log('URL-COMMIS: ', url);
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
          console.log('RESQ : ', res)
          if (res.status === 200) {
            return res.json().then(data => {
              console.log('REQ - COMMIS - SUCCESS : ', data?.data)
              dispatch(getListCommissionSuccess('1', {list: data?.data, options: obj}));
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

export const getListCommissionStaff = (obj) => {
  let url = `${URL}/api/contract/v1/commissions/me/follows?groupBy=product&organizationId=${obj?.orgId || ''}&dateType=${obj?.dateType || ''}&fromDate=${obj?.startDateStr || ''}&toDate=${obj?.endDateStr || ''}&product=${obj?.productCode || ''}`;
  console.log('URL-COMMIS-STAFF: ', url);
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
          console.log('RESQ : ', res)
          if (res.status === 200) {
            return res.json().then(data => {
              console.log('REQ - COMMIS - STAFF : ', data?.data)
              dispatch(getListCommissionSuccess('2', {list: data?.data, options: obj}));
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

export const getTotalFullSuccess = (data) => ({
  type: COMMISSIONS_SET_TOTAL_FULL,
  data
})
export const getTotalFull = () => {
  let url = `${URL}/api/contract/v1/commissions/me/total`;
  return dispatch => {
    new Store().getSession(Const.TOKEN).then(token => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json().then(data => {
              console.log('REQ - FULL - SUCCESS : ', data?.data)
              dispatch(getTotalFullSuccess(data?.data));
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}
