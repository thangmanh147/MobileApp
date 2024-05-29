import {
    ACARE_SAVE_BUYER_INFO,
    ACARE_SAVE_IMG_OCR,
    ACARE_SAVE_CUSTOMER_INFO,
    RESET_DATA_ACARE,
    ACARE_SAVE_PACKAGE_INFO
} from '../../../config/types'

const initialState = {
    buyerInfomation: null,
    packageInfo: null,
    ocrInfo: {},
    customerInfo: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACARE_SAVE_BUYER_INFO:
            return {
                ...state,
                buyerInfomation: action.data
            };
        case ACARE_SAVE_IMG_OCR:
            return {
                ...state,
                ocrInfo: {...state.ocrInfo, [action.data?.id]: action.data?.obj}
            };
        case ACARE_SAVE_CUSTOMER_INFO:
            return {
                ...state,
                customerInfo: action.data
            };
        case ACARE_SAVE_PACKAGE_INFO:
            return {
                ...state,
                packageInfo: action.data
            };
        case RESET_DATA_ACARE:
            return {
                ...state,
                buyerInfomation: null,
                packageInfo: null,
                ocrInfo: {},
                customerInfo: [],
            };
        default:
            return state
    }
};
