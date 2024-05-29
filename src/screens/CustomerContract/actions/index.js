import { URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
    CONTRACT_SET_INFORMATION,
    SET_DETAIL_CONTRACT,
    SET_EDIT_CONTRACT,
    SET_LIST_REGIS_ACC,
} from "../../../config/types";
import { isBankNumber } from "../../../components/Functions";

export const getContractInfoSuccess = (id, obj) => ({
  type: CONTRACT_SET_INFORMATION,
  data: {id: id, obj: obj},
})
export const getContractInfo = (id, fullName, code, fromDate, toDate, status, expiredAt, productCode, type, limit, orgId) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/contract/v1/mycontracts?` +
                // `fullName=${fullName || ''}&` +
                // `code=${code || ''}&` +
                // `createdAtFrom=${fromDate || ''}&` +
                // `createdAtTo=${toDate || ''}&` +
                // `status=${status || ''}&` +
                // `expiredAt=${expiredAt || ''}&` +
                // `productCode=${productCode || ''}&` +
                // `type=${type || ''}` +
                `keyword=${fullName || ''}&` +
                `objectNumber=${productCode || ''}&` +
                `customerStatus=${status || ''}&` +
                `organizationId=${orgId || ''}&` +
                `limit=${limit || 10}`;
            console.log('000O: ', url);
            new Store().getSession(Const.TOKEN).then(token => {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                })
                    .then((res) => {
                        if(res.status === 200) {
                            return res.json().then(data => {
                                // console.log('11111: ', data);
                                dispatch(getContractInfoSuccess(id, {data: data?.data, totalLength: data?.totalLength}));
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

export const getDetailSuccess = (id, obj) => ({
  type: SET_DETAIL_CONTRACT,
  data: {id: id, obj: obj},
})
export const getDetailContract = (id) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/contract/v1/contracts/${id}`;
            new Store().getSession(Const.TOKEN).then(token => {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                })
                    .then((res) => {
                        if(res.status === 200) {
                            return res.json().then(data => {
                                console.log('9999: ', data);
                                dispatch(getDetailSuccess(id, data?.data));
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

export const getEditSuccess = (id, obj) => ({
    type: SET_EDIT_CONTRACT,
    data: {id: id, obj: obj},
  })
  export const getEditContract = (id, insurCode, codeContract) => {
      return dispatch => {
        let url = `${URL}/api/contract/v1/editing-contracts?objectNumber=${insurCode}&contractCode=${codeContract}`;
        console.log('Url Edit: ', url);
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
                .then((res) => {
                    if(res.status === 200) {
                        return res.json().then(data => {
                            console.log('Edit Contract: ', data);
                            dispatch(getEditSuccess(id, data?.data ? data?.data[0] : {}));
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
      }
  }
  
export const putContract = (id, date) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/contract/v1/contracts/${id}`;
            let body = { effectiveAt: date };
            console.log('70707070: ', url);
            console.log('80808080: ',body);
            new Store().getSession(Const.TOKEN).then(token => {
                fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log('85588855: ', res);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        })
    }
}

export const getListTPBAccSuccess = (id, obj) => ({
    type: SET_LIST_REGIS_ACC,
    data: {id: id, obj: obj},
  })
  export const getListTPBAcc = (id, value) => {
      return dispatch => {
        let fullName = '', phone = '';
        if (isBankNumber(value)) {
            phone = value;
        } else {
            fullName = value
        }
        let url = `${URL}/api/crm/v1/tpb-customers?fullName=${fullName}&phone=${phone}&status=&limit=9999&page=1`
        console.log('Url TPB Acc: ', url);
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
                .then((res) => {
                    if(res.status === 200) {
                        return res.json().then(data => {
                            console.log('Res TPB Acc: ', data);
                            dispatch(getListTPBAccSuccess(id, data?.data || []));
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
      }
  }
  