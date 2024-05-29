import {
    TNDS_SET_MOTOR_TYPE,
    TNDS_SET_MOTOR_DURATION,
    SAVE_MOTOR_BUYER,
    SAVE_FEE_MOTOR,
    SAVE_IMG_OCR,
    SAVE_BODY_CONTRACT_MOTOR,
    RESET_DATA_MOTOR
} from '../../../config/types';

const initialState = {
    infoMotor: null,
    buyer: null,
    fee:null
};

export default function motor(state = initialState, action) {
    switch (action.type) {
        case TNDS_SET_MOTOR_TYPE:
            return {
                ...state,
                infoMotor: action.data,
            };
        case SAVE_MOTOR_BUYER:
            return {
                ...state,
                buyer: action.data,
            };
        case SAVE_FEE_MOTOR:
            return {
                ...state,
                fee: action.data,
            };
        case SAVE_IMG_OCR:
            return {
                ...state,
                ocrImg: action.data,
            };
        case SAVE_BODY_CONTRACT_MOTOR:
            return {
                ...state,
                bodyContract: action.data,
            };
        case RESET_DATA_MOTOR:
            return {
                ...state,
                infoMotor: null,
                buyer: null,
                fee: null,
                ocrImg: null,
                bodyContract: null,
            };
        default:
            return state;
    }
};
