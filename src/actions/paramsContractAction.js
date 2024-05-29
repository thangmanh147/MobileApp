import {
    SAVE_PARAMS_CONTRACT
} from '../config/types';

export const setParamsContract = (data) => {
    return {
        type: SAVE_PARAMS_CONTRACT,
        data
    }
}
export const saveParamsContract = (body) => {
    return dispatch => {
        dispatch(setParamsContract(body))
    }
}