import { URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import jwt_decode from "jwt-decode";
import {
    SET_USER_INFORMATION,
    SET_PROFILE_LOG,
    GET_LIST_BANK_SUCCESS,
    GET_LIST_NATION_SUCCESS,
    SET_PROFILE_INFORMATION,
    SET_ORG_CODE_USER,
    SET_LEVEL_USER,
    SET_TPBANK_LOG,
    SET_TPBANK_INFO_IMG,
    SET_FMARKET_LOG,
} from "../../../config/types";

export const getUserInfoSuccess = (data) => ({
    type: SET_USER_INFORMATION,
    data,
})
export const getUserInfo = () => {
    return dispatch => {
        let url = `${URL}/api/account/v1/users/me/profile`;
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
                            console.log('USER: ', data);
                            dispatch(getUserInfoSuccess(data?.data));
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
}

export const saveProfileLogSuccess = (data) => ({
    type: SET_PROFILE_LOG,
    data,
})
export const saveProfileLog = (data) => {
    return dispatch => {
        dispatch(saveProfileLogSuccess(data));
    }
}

export const saveFmarketLogSuccess = (data) => ({
    type: SET_FMARKET_LOG,
    data,
})
export const saveFmarketLog = (data) => {
    return dispatch => {
        dispatch(saveFmarketLogSuccess(data));
    }
}

export const saveTPBankLogSuccess = (data) => ({
    type: SET_TPBANK_LOG,
    data,
})
export const saveTPBankLog = (data) => {
    return dispatch => {
        dispatch(saveTPBankLogSuccess(data));
    }
}

export const saveInfoImgSuccess = (data) => ({
    type: SET_TPBANK_INFO_IMG,
    data,
})
export const saveInfoImg = (data) => {
    return dispatch => {
        dispatch(saveInfoImgSuccess(data));
    }
}

export const getBankSuccess = (data) => {
    return {
        type: GET_LIST_BANK_SUCCESS,
        data
    }
}
export const getBank = () => {
    return dispatch => {
        let url = `${URL}/api/master-data/v1/banks?limit=200`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 'success') {
                    dispatch(getBankSuccess(res?.data))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export const getBankFmarket = () => {
    return dispatch => {
        let url = `https://rapi.fma.dev.techland.link/plus-partner//static/banks`
        let body = {
            "client_id": "inso",
            "data": { "page": 1, "page_size": 100 }
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res?.data) {
                    dispatch(getBankSuccess(res?.data?.items || []))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export const getNationSuccess = (data) => {
    return {
        type: GET_LIST_NATION_SUCCESS,
        data
    }
}
export const getNation = () => {
    return dispatch => {
        let url = `https://rapi.fma.dev.techland.link/plus-partner/static/nationalities`
        let body = {
            "client_id": "inso",
            "data": { "page": 1, "page_size": 100 }
        }
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res?.data) {
                    dispatch(getNationSuccess(res?.data?.items || []))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export const getProfileInfoSuccess = (data) => ({
    type: SET_PROFILE_INFORMATION,
    data,
})
export const getProfileInfo = () => {
    return dispatch => {
        let url = `${URL}/api/account/v1/profiles`;
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
            .then(res => res.json())
                .then((res) => {
                    console.log('RESSS PROFILE: ', res);
                    if (res.status === 200 || res.status == 'success') {
                        dispatch(getProfileInfoSuccess(res?.data));
                    } else {
                        dispatch(getProfileInfoSuccess({}));
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
}

export const setOrgCodeUser = (data) => ({
    type: SET_ORG_CODE_USER,
    data,
})

export const getLevelSuccess = (data) => ({
    type: SET_LEVEL_USER,
    data,
})
export const getLevelUser = (role) => {
    return dispatch => {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            let url = `${URL}/api/commission/v3/commissions/maxlevel/channel/${dataToken?.channelId}/organization/${dataToken?.organizationId}/role/${role}`;
            console.log('Url LEVEL: ', url);
            fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        return res.json().then(data => {
                            console.log('LEVEL: ', data);
                            dispatch(getLevelSuccess(data?.data));
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
}
