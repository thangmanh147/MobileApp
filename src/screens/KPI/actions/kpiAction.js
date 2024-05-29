import { URL } from '../../../config/System';
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
    KPI_SET_INFO,
} from '../../../config/types';
import moment from 'moment';
import jwt_decode from "jwt-decode";

export const getKPIInfoSuccess = (id, data) => ({
    type: KPI_SET_INFO,
    data: { id: id, obj: data },
})
export const getKPIInfo = (id, obj) => {
    return dispatch => {
        new Store().getSession(Const.TOKEN).then(token => {
            const dataToken = jwt_decode(token);
            const startStr = moment(obj.startStr, 'DD/MM/YYYY').subtract(1, 'days').format();
            const endStr = moment(obj.endStr, 'DD/MM/YYYY').subtract(1, 'days').format();
            let url = `${URL}/api/datalake/v1/contract-revenue-received?startDate=${startStr}&endDate=${endStr}&channelId=${dataToken?.channelId}&typeDate=createdat&contractStatus=&contractType=&organizationId=${dataToken?.organizationId}&salerName=`;
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
                            console.log('KPIIII -- SUCCESS : ', data.datasets)
                            dispatch(getKPIInfoSuccess(id, Object.assign(obj, {dataKPI: data})));
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
}
