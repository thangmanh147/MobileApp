import {
    SAVE_FEE_TNDSCAR,
    SET_CAR_PHYSICAL_TYPE,
    SAVE_CAR_BUYER_PHYSICAL,
    TNDS_SET_CAR_DURATION,
    SAVE_FEE_LXPXCAR, SAVE_IMG_CAR_PHYSICAL,
    CHECK_OCR_AGAIN_PHYSICAL,
    CHANG_DATA_PACKAGE,
    SAVE_CONTRACT_CAR_ID
} from '../../../config/types';

export const setCarPhysicalType = (data) => {
    return {
        type: SET_CAR_PHYSICAL_TYPE,
        data
    }
}
export const saveCarPhysicalType = (body) => {
    return dispatch => {
        dispatch(setCarPhysicalType(body))
    }
}
export const saveCHECK_OCR_AGAIN_PHYSICAL = (body) => {
    return dispatch => {
        dispatch(setCHECK_OCR_AGAIN_PHYSICAL(body))
    }
}
export const setCHECK_OCR_AGAIN_PHYSICAL = (data) => {
    return {
        type: CHECK_OCR_AGAIN_PHYSICAL,
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

export const setBuyerCarPhysical = (data) => {
    return {
        type: SAVE_CAR_BUYER_PHYSICAL,
        data
    }
}

export const saveBuyerCarPhysical = (body) => {
    return dispatch => {
        dispatch(setBuyerCarPhysical(body))
    }
}

export const setDataPackage = (data) => {
    return {
        type: CHANG_DATA_PACKAGE,
        data
    }
}

export const changeDataPackage = (body) => {
    return dispatch => {
        dispatch(setDataPackage(body))
    }
}

export const setImageCarPhysical = (data) => {
    return {
        type: SAVE_IMG_CAR_PHYSICAL,
        data
    }
}

export const saveImageCarPhysical = (body) => {
    return dispatch => {
        dispatch(setImageCarPhysical(body))
    }
}

export const setContractCarId = (data) => {
    return {
        type: SAVE_CONTRACT_CAR_ID,
        data
    }
}

export const saveContractCarId = (body) => {
    return dispatch => {
        dispatch(setContractCarId(body))
    }
}
