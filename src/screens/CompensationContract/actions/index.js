import { URL } from "../../../config/System";
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
    COMPENSATION_SET_INFORMATION
} from "../../../config/types";

export const getListSuccess = (obj) => ({
  type: COMPENSATION_SET_INFORMATION,
  data: obj,
})
export const getList = (fullName, code, status, limit) => {
    let url = `${URL}/api/ticket/v1/tickets?type=CLAIM&` +
        `firstName=${fullName || ''}&` +
        `code=${code || ''}&` +
        `status=${status || ''}&` +
        `contractCode=&` +
        `phoneNumber=&` +
        `limit=${limit || 10}`;
    console.log('000O: ', url);
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
                    if(res.status === 200) {
                        return res.json().then(data => {
                            console.log('11111: ', data);
                            dispatch(getListSuccess({data: data?.data, totalLength: data?.total}));
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
}
