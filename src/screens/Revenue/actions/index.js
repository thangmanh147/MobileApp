import { URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
  REVENUE_SET_LIST,
} from "../../../config/types";
import axios from 'axios';
import moment from 'moment';

export const getListTotal = (obj) => {
  const start = moment(obj?.startDateStr, 'DD/MM/YYYY').format('MM/DD/YYYY');
  const end = moment(obj?.endDateStr, 'DD/MM/YYYY').format('MM/DD/YYYY');
  let url = `${URL}/api/report/v1/crevenue-by-contract-type/group?organizationId=${obj?.orgId || ''}&startDate=${start || ''}&endDate=${end || ''}&product=${obj?.productCode || ''}`;
  console.log('URL-REV-TOTAL: ', url);
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
              console.log('REQ - REV - TOTAL : ', data?.data)
              dispatch(getListSuccess('3', {list: data?.data, options: obj}));
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

export const getListSuccess = (id, data) => ({
  type: REVENUE_SET_LIST,
  data: { id: id, obj: data },
})
export const getList = (obj) => {
  const start = moment(obj?.startDateStr, 'DD/MM/YYYY').format('MM/DD/YYYY');
  const end = moment(obj?.endDateStr, 'DD/MM/YYYY').format('MM/DD/YYYY');
  let url = `${URL}/api/report/v1/crevenue-by-contract-type?organizationId=${obj?.orgId || ''}&startDate=${start || ''}&endDate=${end || ''}&product=${obj?.productCode || ''}`;
  console.log('URL-REV: ', url);
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
              console.log('REQ - REV - SUCCESS : ', data?.data)
              dispatch(getListSuccess('1', {list: data?.data, options: obj}));
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

export const getListStaff = (obj) => {
  const start = moment(obj?.startDateStr, 'DD/MM/YYYY').format('MM/DD/YYYY');
  const end = moment(obj?.endDateStr, 'DD/MM/YYYY').format('MM/DD/YYYY');
  let url = `${URL}/api/report/v1/crevenue-by-contract-type/group?organizationId=${obj?.orgId || ''}&startDate=${start || ''}&endDate=${end || ''}&product=${obj?.productCode || ''}`;
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
              fetch(`${URL}/api/report/v1/crevenue-by-contract-type?organizationId=${obj?.orgId || ''}&startDate=${start || ''}&endDate=${end || ''}&product=${obj?.productCode || ''}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
              })
                .then((resP) => {
                  if (resP.status === 200) {
                    return resP.json().then(dataP => {
                      if (data?.data?.length > 0 && dataP?.data?.length > 0) {
                        const a = data?.data;
                        const b = dataP?.data;
                        const c = a.map((item) => {
                          const d = b.find((i) => i.product === item.product)
                          if (d) {
                            return {"product": item.product, "revenue": item.revenue - d.revenue}
                          } else return item;
                        })
                        dispatch(getListSuccess('2', {list: c, options: obj}));
                      } else {
                        dispatch(getListSuccess('2', {list: data?.data, options: obj}));
                      }
                    });
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            });
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}