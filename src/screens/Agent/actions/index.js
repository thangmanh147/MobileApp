import { URL } from '../../../config/System';
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import jwt_decode from "jwt-decode";
import {
    INSURANCE_SET_INFO,
    SET_PERMISSION_USER,
    SET_TOKEN_INSUR,
} from '../../../config/types';

export const getInsuranceInfoSuccess = (data) => ({
    type: INSURANCE_SET_INFO,
    data
})
export const getInsuranceInfo = (tokens) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            new Store().getSession(Const.TOKEN).then(token => {
                if (tokens || token) {
                    const _token = tokens || token; 
                    const dataToken = jwt_decode(_token);
                    const channel = dataToken?.channelId;
                    const url = `${urlORC || URL}/api/insured-object/v1/insurance-product-channel?channel_id=${channel}&agent_id=${dataToken?.organizationId}&insur_id=&offset=0&limit=999`;
                    console.log('TOKEN :: ', token);
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${_token}`,
                        },
                    })
                        .then((res) => {
                            if(res.status === 200) {
                                return res.json().then(data => {
                                    // console.log('LIST :: ', data?.data);
                                    dispatch(getInsuranceInfoSuccess(data?.data || [{code: ''}]));
                                });
                            } else {
                                dispatch(getInsuranceInfoSuccess([{code: ''}]));
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    dispatch(getInsuranceInfoSuccess([{code: ''}]));
                }
            })
        })
    }
}

export const setPermissionUser = (data) => ({
    type: SET_PERMISSION_USER,
    data
})
export const getPermissionUser = () => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            new Store().getSession(Const.TOKEN).then(token => {
                const dataToken = jwt_decode(token);
                const url = `${urlORC || URL}/api/permission/v2/user-permissions/${dataToken?._id || ''}?permission=add&org=${dataToken?.organizationId || ''}&channel=${dataToken?.channelId || ''}&group=MODULE_CONTRACT`;
                console.log('URLLL :: ', url);
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((res) => {
                        if(res.status === 200) {
                            return res.json().then(data => {
                                console.log('ORGG :: ', data)
                                dispatch(setPermissionUser({permissionContract: 'add'}));
                            });
                        } else {
                            dispatch(setPermissionUser({permissionContract: ''}));
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch(setPermissionUser({permissionContract: ''}));
                    })
            })
        })
    }
}

export const setTokenInsur = (code, obj) => {
    return {
        type: SET_TOKEN_INSUR,
        data: {id: code, obj: obj},
    }
}