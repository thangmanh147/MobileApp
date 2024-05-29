import { URL } from '../../../config/System';
import Store from '../../../services/Store';
import Const from '../../../services/Const';
import {
    PROMOTION_SET_INFO,
    PROMOTION_SET_PRICE,
} from '../../../config/types';

export const getPromotionSuccess = (data) => ({
  type: PROMOTION_SET_INFO,
  data
})
export const getPromotionInfo = (value, code) => {
    console.log('VALUE : ', value)
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/promotion/v1/programs/filter?insuranceProduct=${code}&contractValue=${value}&name=&offset=0&page=1`;
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
                                console.log('PRO - APIIIII - SUCCESS : ', data)
                                dispatch(getPromotionSuccess(data?.data));
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

export const setPromotionPriceSuccess = (id, obj) => ({
  type: PROMOTION_SET_PRICE,
  data: {id: id, obj: obj},
})

export const setPromotionPrice = (total, code, promotionName, insureId) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/promotion/v1/programs/filter?insuranceProduct=${insureId}`;
            let body = {
                "contractValue": total,
                "promotionCode": code
            };
            console.log('PRO - URL : ', url)
            console.log('PRO - BODY : ', body)
            new Store().getSession(Const.TOKEN).then(token => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                })
                    .then((res) => {
                        if(res.status === 200) {
                            return res.json().then(data => {
                                console.log('PRO - RES : ', data)
                                const totalPrice = data?.data.discountUnit === '0' ?
                                    data?.data.discountValue :
                                    total * data?.data.discountValue / 100;
                                const discountMax = data?.data.discountValueUnit === '0' ?
                                    data?.data.discountValueMax :
                                    total * data?.data.discountValueMax / 100;
                                const price = data?.data.discountValue ?
                                    (totalPrice <= discountMax ? totalPrice : discountMax) :
                                    null;
                                dispatch(setPromotionPriceSuccess(insureId, {price: price, name: promotionName, code: code, id: price ? data?.data?.numberId : ''}));
                            });
                        } else {
                            dispatch(setPromotionPriceSuccess(insureId, {price: null, name: promotionName, code: code}));
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        })
    }
}

export const updatePromotionId = (id) => {
    return dispatch => {
        let url = `${URL}/api/promotion/v1/numbers/${id}`;
        let body = {
            "isActive": false,
        };
        new Store().getSession(Const.TOKEN).then(token => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(body),
            })
                .then((res) => {
                    if(res.status === 200) {
                        console.log('PRO - RES - ID : ', res)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
}
