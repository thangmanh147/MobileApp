import {
    TNDS_SET_MOTOR_TYPE,
    TNDS_SET_MOTOR_DURATION,
    SAVE_MOTOR_BUYER,
    SAVE_FEE_MOTOR,
    SAVE_IMG_OCR,
    SAVE_BODY_CONTRACT_MOTOR
} from '../../../config/types';

export const setMotorType = (data) => {
    return {
        type: TNDS_SET_MOTOR_TYPE,
        data
    }
}
export const saveMotorType = (body) => {
    return dispatch => {
        dispatch(setMotorType(body))
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

export const setBuyerMotor = (data) => {
    return {
        type: SAVE_MOTOR_BUYER,
        data
    }
}

export const saveBuyerMotor = (body) => {
    return dispatch => {
        dispatch(setBuyerMotor(body))
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


export const setImageOcr = (data) => {
    return {
        type: SAVE_IMG_OCR,
        data
    }
}

export const saveImageOcr = (body) => {
    return dispatch => {
        dispatch(setImageOcr(body))
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
