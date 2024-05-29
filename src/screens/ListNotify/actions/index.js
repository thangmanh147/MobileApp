import { nameApp, URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    NOTIFY_SET_INFORMATION
} from "../../../config/types";

export const getNotifyInfoSuccess = (obj) => ({
    type: NOTIFY_SET_INFORMATION,
    data: obj,
})
export const getNotifyInfo = (limit) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/communication/v1/notifies/logs?` +
                `limit=${limit || 10}&offset=0`;
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
                        if (res.status === 200) {
                            return res.json().then(data => {
                                // console.log('List - Notify: ', data);
                                dispatch(getNotifyInfoSuccess(
                                    {
                                        data: data?.data,
                                        totalLength: data?.metadata?.total,
                                        notRead: data?.metadata?.notRead,
                                    }
                                ));
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

export const updateStatusNotify = (id, arr, total, notRead) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/communication/v1/notifies/logs/${id}`;
            new Store().getSession(Const.TOKEN).then(token => {
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json().then(data => {
                                dispatch(getNotifyInfoSuccess(
                                    {
                                        data: arr,
                                        totalLength: total,
                                        notRead: notRead,
                                    }
                                ));
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

export const postNotify = (deviceToken, userId, organizationCode) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/communication/v1/notifies`;
            let body = {
                "userId": userId,
                "deviceToken": deviceToken,
                "group": organizationCode,
            };
            console.log('33333BBBB :: ', url);
            console.log('22222DDDDD :: ', body);
            new Store().getSession(Const.TOKEN).then(token => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(body),
                })
                    .then(res => res.json())
                    .then((res) => {
                        console.log('11111CCCC :: ', res);
                        dispatch(logEventContract(res));
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        })
    }
}

const logEventContract = (res) => {
    return dispatch => {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            let body = {
                "serviceName": `${nameApp}_LOG_PUSH_NOTIFY`,
                "extraData": {
                    userName: dataToken?.preferred_username || '',
                    userId: dataToken?.userId || '',
                    organizationId: dataToken?.organizationId || '',
                },
                "headers": { "Content-Type": "application/json" },
                "method": "POST",
                "params": {},
                "response": {
                    message: res?.message || '',
                    //   deviceToken: res?.data?.deviceToken || ''
                },
                "statusCode": 200,
                "time": moment().format(),
                "url": ''
            }
            console.log('=======res0', body);
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