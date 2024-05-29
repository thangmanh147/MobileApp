import { URL } from '../../../config/System';
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
    SET_INFO_LIST_COMPANY,
    SET_ID_COM_SELECTED,
} from '../../../config/types';
import jwt_decode from "jwt-decode";

export const getListCompanySuccess = (id, obj) => ({
    type: SET_INFO_LIST_COMPANY,
    data: {id: id, obj: obj},
})
export const getListCompany = (code, id) => {
    return dispatch => {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            let url = `${URL}/api/insured-object/v1/insurance-product-channel?f_insurance_product_id=${id}&agent_id=${dataToken?.organizationId}&offset=0&limit=20`
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
                            console.log('COMPANY - APIIIII - SUCCESS : ', data)
                            dispatch(getListCompanySuccess(code, data?.data));
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }
}

export const setIdSelectedSuccess = (code, id) => {
    return {
        type: SET_ID_COM_SELECTED,
        data: {id: code, obj: id},
    }
}
export const setIdSelected = (code, id) => {
    return dispatch => {
        dispatch(setIdSelectedSuccess(code, id))
    }
}

