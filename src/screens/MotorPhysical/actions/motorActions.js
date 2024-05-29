import {
    SET_MOTOR_TYPE_PHYSICAL,
    TNDS_SET_MOTOR_DURATION,
    SAVE_MOTOR_BUYER_PHYSICAL,
    SAVE_FEE_MOTOR,
    SAVE_IMG_OCR_PHYSICAL,
    SAVE_BODY_CONTRACT_MOTOR,
    MOTOR_GET_LIST_BRAND_SUCCESS,
    MOTOR_GET_LIST_MODEL_SUCCESS,
} from '../../../config/types';
import { URL } from '../../../config/System';

export const setMotorTypePhysical = (data) => {
    return {
        type: SET_MOTOR_TYPE_PHYSICAL,
        data
    }
}
export const saveMotorTypePhysical = (body) => {
    return dispatch => {
        dispatch(setMotorTypePhysical(body))
    }
}
export const setMotorDuration = (data) => {
    return {
        type: TNDS_SET_MOTOR_DURATION,
        data
    }
}
export const saveMotorDuration = (body) => {
    return dispatch => {
        dispatch(setMotorDuration(body))
    }
}

export const setBuyerMotorPhysical = (data) => {
    return {
        type: SAVE_MOTOR_BUYER_PHYSICAL,
        data
    }
}

export const saveBuyerMotorPhysical = (body) => {
    return dispatch => {
        dispatch(setBuyerMotorPhysical(body))
    }
}

export const setFeeMotor = (data) => {
    return {
        type: SAVE_FEE_MOTOR,
        data
    }
}

export const saveFeeMotor = (body) => {
    return dispatch => {
        dispatch(setFeeMotor(body))
    }
}


export const setImageOcrPhysical = (data) => {
    return {
        type: SAVE_IMG_OCR_PHYSICAL,
        data
    }
}

export const saveImageOcrPhysical = (body) => {
    return dispatch => {
        dispatch(setImageOcrPhysical(body))
    }
}

export const setBodyContractMotor = (data) => {
    return {
        type: SAVE_BODY_CONTRACT_MOTOR,
        data
    }
}

export const saveBodyContractMotor = (body) => {
    return dispatch => {
        dispatch(setBodyContractMotor(body))
    }
}

export const getMotorBrandListSuccess = (data) => {
    return {
        type: MOTOR_GET_LIST_BRAND_SUCCESS,
        data
    }
}
export const getMotorBrandList = (offset) => {
    return dispatch => {
        let url = `${URL}/api/master-data/v1/motos/brands?limit=200&offset=0`
        console.log('MotorBrandList - URL ::', url);
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('MotorBrandList ::', res);
                if (res.status == 'success') {
                    dispatch(getMotorBrandListSuccess(res?.data))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export const getMotorModelListSuccess = (data) => {
    return {
        type: MOTOR_GET_LIST_MODEL_SUCCESS,
        data
    }
}
export const getMotorModelList = (id, type) => {
    let typeModel = 'xe_gan_may';
    if(type?.code === '06') {
        typeModel = 'xe_dien';
    }
    return dispatch => {
        let url = `${URL}/api/master-data/v1/motos/models?brandId=${id}&typeModel=${typeModel}&limit=999&offset=0`
        console.log('ModelList -- Url ::', url);
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('ModelList ::', res);
                if (res.status == 'success') {
                    dispatch(getMotorModelListSuccess(res?.data))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
