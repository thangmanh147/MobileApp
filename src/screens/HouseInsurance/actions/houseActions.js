import {
    SET_HOUSE_PACKAGES,
    SAVE_BUYER_HOUSE,
} from '../../../config/types';

export const setHousePackages = (data) => {
    return {
        type: SET_HOUSE_PACKAGES,
        data
    }
}
export const saveHousePackages = (body) => {
    return dispatch => {
        dispatch(setHousePackages(body))
    }
}

export const setBuyerHouse = (data) => {
    return {
        type: SAVE_BUYER_HOUSE,
        data
    }
}

export const saveBuyerHouse = (body) => {
    return dispatch => {
        dispatch(setBuyerHouse(body))
    }
}
