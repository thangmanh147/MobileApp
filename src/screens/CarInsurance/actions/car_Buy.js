import {
    CAR_GET_LIST_BRANCH_SUCCESS,
    CAR_GET_LIST_MODEL_SUCCESS,
    CAR_GET_TYPE_SUCCESS,
    SET_CAR_INFO,
    SET_CAR_INSURANCE_BUYER_INFO,
    SET_CAR_IMAGE_SUCCESS,
    REMOVE_CAR_IMAGE_SUCCESS,
    GET_LIST_PROVINCE_SUCCESS,
    GET_LIST_DISTRICT_SUCCESS,
    SAVE_IMAGE_CAR_CERTIFICATE,
    SAVE_IMAGE_CAR_REGISTRATION_CERTIFICATE,
    CAR_SET_INSURANCE_PACKAGES
} from '../../../config/types'
import { URL } from '../../../config/System'
import Store from '../../../services/Store';
import Const from '../../../services/Const';

export const getCarBranchListSuccess = (data) => {
    return {
        type: CAR_GET_LIST_BRANCH_SUCCESS,
        data
    }
}
export const getCarBranchList = (offset) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/master-data/v1/cars/brands?limit=200&offset=0`
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log("123",res)
                    if (res.status == 'success') {
                        dispatch(getCarBranchListSuccess(res?.data))
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }
}
export const getListCarModelSuccess = (data) => {
    return {
        type: CAR_GET_LIST_MODEL_SUCCESS,
        data
    }
}
export const getListCarModel = (id) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/master-data/v1/cars/models?brandId=${id}&limit=999`
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log("ress modal",res)
                    if (res.status == 'success') {
                        dispatch(getListCarModelSuccess(res?.data))
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }
}
export const getCarTypeSuccess = (data) => {
    return {
        type: CAR_GET_TYPE_SUCCESS,
        data
    }
}
export const getCarType = () => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/attribute/v1/car-types?limit=200`
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log("ress1s",res);
                    if (res.data?.length >0 ) {
                        dispatch(getCarTypeSuccess(res?.data))
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }
}

export const setCarInfoSuccess = (data) => {
    return {
        type: SET_CAR_INFO,
        data
    }
}
export const saveCarInfo = (body) => {
    return dispatch => {
        dispatch(setCarInfoSuccess(body))
    }
}
export const setCarInsuranceBuyerInfo = (data) => {
    return {
        type: SET_CAR_INSURANCE_BUYER_INFO,
        data
    }
}
export const saveCarInsuranceBuyerInfo = (body) => {
    return dispatch => {
        dispatch(setCarInsuranceBuyerInfo(body))
    }
}
export const setCarImageSuccess = (data) => {
    return {
        type: SET_CAR_IMAGE_SUCCESS,
        data
    }
}
export const saveCarImage = (body) => {
    return dispatch => {
        dispatch(setCarImageSuccess(body))
    }
}
export const removeCarImageSuccess = (data) => {
    return {
        type: REMOVE_CAR_IMAGE_SUCCESS,
        data
    }
}
export const removeCarImage = (body) => {
    return dispatch => {
        dispatch(removeCarImageSuccess(body))
    }
}
export const getProvinceSuccess = (data) => {
    return {
        type: GET_LIST_PROVINCE_SUCCESS,
        data
    }
}
export const getProvince = () => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/master-data/v1/provinces?limit=64`
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status == 'success') {
                        dispatch(getProvinceSuccess(res?.data))
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }
}
export const getDistrictSuccess = (data) => {
    return {
        type: GET_LIST_DISTRICT_SUCCESS,
        data
    }
}
export const getDistrict = (id) => {
    return dispatch => {
        new Store().getSession(Const.URL_ORC).then(urlORC => {
            let url = `${urlORC || URL}/api/master-data/v1/provinces/${id}/districts?limit=99`
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status == 'success') {
                        dispatch(getDistrictSuccess(res?.data))
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }
}
export const setImageCarCertificateSuccess = (data) => {
    return {
        type: SAVE_IMAGE_CAR_CERTIFICATE,
        data
    }
}
export const saveImageCarCertificate = (body) => {
    return dispatch => {
        dispatch(setImageCarCertificateSuccess(body))
    }
}
export const setImageCarRegistrationCertificateSuccess = (data) => {
    return {
        type: SAVE_IMAGE_CAR_REGISTRATION_CERTIFICATE,
        data
    }
}
export const saveImageCarRegistrationCertificate = (body) => {
    return dispatch => {
        dispatch(setImageCarRegistrationCertificateSuccess(body))
    }
}
export const setCarInsurancePackages = (data) => {
    return {
        type: CAR_SET_INSURANCE_PACKAGES,
        data
    }
}
export const saveCarInsurancePackage = (body) => {
    return dispatch => {
        dispatch(setCarInsurancePackages(body))
    }
}
