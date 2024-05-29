import {
    SET_CAR_PHYSICAL_TYPE,
    SAVE_FEE_TNDSCAR,
    SAVE_CAR_BUYER_PHYSICAL, TNDS_SET_CAR_DURATION,
    SAVE_FEE_LXPXCAR, SAVE_IMG_CAR_PHYSICAL, CHECK_OCR_AGAIN_PHYSICAL, CHANG_DATA_PACKAGE,
    RESET_DATA_CAR_PHYSICAL,
    SAVE_CONTRACT_CAR_ID,
} from '../../../config/types';

const initialState = {
    infoCarPhysical: null,
    buyerPhysical: null,
    feeCar: null,
    feeLXPXCar: null,
    durationCar: null,
    checkOcrPhysical: false,
    dataPackage: null,
    contractCarId: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CAR_PHYSICAL_TYPE:
            return {
                ...state,
                infoCarPhysical: action.data,
            };
        case SAVE_FEE_TNDSCAR:
            return {
                ...state,
                feeCar: action.data,
            };
        case SAVE_CAR_BUYER_PHYSICAL:
            return {
                ...state,
                buyerPhysical: action.data,
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
        case SAVE_IMG_CAR_PHYSICAL:
            return {
                ...state,
                imgOcrCarPhysical: action.data,
            };
        case CHECK_OCR_AGAIN_PHYSICAL:
            return {
                ...state,
                checkOcrPhysical: action.data,
            };
        case CHANG_DATA_PACKAGE:
            return {
                ...state,
                dataPackage: action.data,
            };
        case SAVE_CONTRACT_CAR_ID:
            return {
                ...state,
                contractCarId: action.data,
            };
        case RESET_DATA_CAR_PHYSICAL:
            return {
                ...state,
                infoCarPhysical: null,
                feeCar: null,
                buyerPhysical: null,
                durationCar: null,
                feeLXPXCar: null,
                imgOcrCarPhysical: null,
                checkOcrPhysical: null,
                dataPackage: null,
                contractCarId: null,
            };
        default:
            return state;
    }
};
