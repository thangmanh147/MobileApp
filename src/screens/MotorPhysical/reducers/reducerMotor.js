import {
    SET_MOTOR_TYPE_PHYSICAL,
    TNDS_SET_MOTOR_DURATION,
    SAVE_MOTOR_BUYER_PHYSICAL,
    SAVE_FEE_MOTOR,
    SAVE_IMG_OCR_PHYSICAL,
    SAVE_BODY_CONTRACT_MOTOR,
    MOTOR_GET_LIST_BRAND_SUCCESS,
    MOTOR_GET_LIST_MODEL_SUCCESS,
    RESET_DATA_MOTOR_PHYSICAL,
} from '../../../config/types';

const initialState = {
    infoMotor: null,
    buyer: null,
    fee: null,
    listMotorBrand: null,
};

export default function motor(state = initialState, action) {
    switch (action.type) {
        case SET_MOTOR_TYPE_PHYSICAL:
            return {
                ...state,
                infoMotor: action.data,
            };
        case SAVE_MOTOR_BUYER_PHYSICAL:
            return {
                ...state,
                buyer: action.data,
            };
        case SAVE_FEE_MOTOR:
            return {
                ...state,
                fee: action.data,
            };
        case SAVE_IMG_OCR_PHYSICAL:
            return {
                ...state,
                ocrImg: action.data,
            };
        case SAVE_BODY_CONTRACT_MOTOR:
            return {
                ...state,
                bodyContract: action.data,
            };
        case MOTOR_GET_LIST_BRAND_SUCCESS:
            return {
                ...state,
                listMotorBrand: action.data,
            };
        case MOTOR_GET_LIST_MODEL_SUCCESS:
            return {
                ...state,
                listMotorModel: action.data,
            };
        case RESET_DATA_MOTOR_PHYSICAL:
            return {
                ...state,
                infoMotor: null,
                buyer: null,
                fee: null,
                ocrImg: null,
                bodyContract: null,
                listMotorBrand: null,
                listMotorModel: null,
            };
        default:
            return state;
    }
};
