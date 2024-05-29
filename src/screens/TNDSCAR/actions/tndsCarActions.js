import {
    SAVE_FEE_TNDSCAR,
    TNDS_SET_CAR_TYPE,
    SAVE_CAR_BUYER,
    TNDS_SET_CAR_DURATION,
    SAVE_FEE_LXPXCAR, SAVE_IMG_OCR_CAR,
    CHECK_OCR_AGAIN
} from '../../../config/types';
import {setFeeMotor} from '../../Motorbike/actions/motorActions';


export const setTNDSCarType = (data) => {
    return {
        type: TNDS_SET_CAR_TYPE,
        data
    }
}
export const saveTNDSCarType = (body) => {
    return dispatch => {
        dispatch(setTNDSCarType(body))
    }
}
export const saveCHECK_OCR_AGAIN = (body) => {
    return dispatch => {
        dispatch(setCHECK_OCR_AGAIN(body))
    }
}
export const setCHECK_OCR_AGAIN = (data) => {
    return {
        type: CHECK_OCR_AGAIN,
        data
    }
}
export const setFeeCar = (data) => {
    return {
        type: SAVE_FEE_TNDSCAR,
        data
    }
}
export const saveFeeTNDSCar = (body) => {
    return dispatch => {
        dispatch(setFeeCar(body))
    }
}
export const setFeeLXPXCar = (data) => {
    return {
        type: SAVE_FEE_LXPXCAR,
        data
    }
}
export const saveFeeLXPXCar = (body) => {
    return dispatch => {
        dispatch(setFeeLXPXCar(body))
    }
}
export const setDurationCar = (data) => {
    return {
        type: TNDS_SET_CAR_DURATION,
        data
    }
}
export const saveDurationTNDSCar = (body) => {
    return dispatch => {
        dispatch(setDurationCar(body))
    }
}

export const setBuyerCar = (data) => {
    return {
        type: SAVE_CAR_BUYER,
        data
    }
}

export const saveBuyerCar = (body) => {
    return dispatch => {
        dispatch(setBuyerCar(body))
    }
}

export const setImageOcrCar = (data) => {
    return {
        type: SAVE_IMG_OCR_CAR,
        data
    }
}

export const saveImageOcrCar = (body) => {
    return dispatch => {
        dispatch(setImageOcrCar(body))
    }
}
