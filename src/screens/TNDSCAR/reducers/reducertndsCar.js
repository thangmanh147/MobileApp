import {
    TNDS_SET_CAR_TYPE,
    SAVE_FEE_TNDSCAR,
    SAVE_CAR_BUYER, TNDS_SET_CAR_DURATION,
    SAVE_FEE_LXPXCAR, SAVE_IMG_OCR_CAR, CHECK_OCR_AGAIN,
    RESET_DATA_CAR,
} from '../../../config/types';

const initialState = {
    infoCar: null,
    buyer: null,
    feeCar:null,
    feeLXPXCar:null,
    durationCar:null,
    checkOcr:false
};

export default function motor(state = initialState, action) {
    switch (action.type) {
        case TNDS_SET_CAR_TYPE:
            return {
                ...state,
                infoCar: action.data,
            };
        case SAVE_FEE_TNDSCAR:
            return {
                ...state,
                feeCar: action.data,
            };
        case SAVE_CAR_BUYER:
            return {
                ...state,
                buyer: action.data,
            };
        case TNDS_SET_CAR_DURATION:
            return {
                ...state,
                durationCar: action.data,
            };
        case SAVE_FEE_LXPXCAR:
            return {
                ...state,
                feeLXPXCar: action.data,
            };
        case SAVE_IMG_OCR_CAR:
            return {
                ...state,
                imgOcrCar: action.data,
            };
        case CHECK_OCR_AGAIN:
            return {
                ...state,
                checkOcr: action.data,
            };
        case RESET_DATA_CAR:
            return {
                ...state,
                infoCar: null,
                feeCar: null,
                buyer: null,
                durationCar: null,
                feeLXPXCar: null,
                imgOcrCar: null,
                checkOcr: null,
            };
        default:
            return state;
    }
};
