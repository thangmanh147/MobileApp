import {
    SAVE_BUYER_INFO_24H,
    SAVE_CHOSEN_PACKAGE_24H,
    SAVE_INSURED_CUSTOMER_INFO_24H,
    SET_PACKAGES_INFO_24H,
    SAVE_INSURANCE_PRINT_ADDRESS_24H,
    SAVE_IMG_OCR_24H,
    RESET_DATA_24H,
} from '../../../config/types'

const initialState = {
    packagesInfo: null,
    chosenPackage: null,
    buyerInfomation: null,
    insuredCustomerInfo: null,
    insurancePrintsAddress: null,
    ocrImg: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PACKAGES_INFO_24H:
            return {
                ...state,
                packagesInfo: action.data
            };
        case SAVE_CHOSEN_PACKAGE_24H:
            return {
                ...state,
                chosenPackage: action.data
            };
        case SAVE_BUYER_INFO_24H:
            return {
                ...state,
                buyerInfomation: action.data
            };
        case SAVE_INSURED_CUSTOMER_INFO_24H:
            return {
                ...state,
                insuredCustomerInfo: action.data
            };
        case SAVE_INSURANCE_PRINT_ADDRESS_24H:
            return {
                ...state,
                insurancePrintsAddress: action.data
            };
        case SAVE_IMG_OCR_24H:
            return {
                ...state,
                ocrImg: action.data,
            };
        case RESET_DATA_24H:
            return {
                ...state,
                packagesInfo: null,
                chosenPackage: null,
                buyerInfomation: null,
                insuredCustomerInfo: null,
                insurancePrintsAddress: null,
                ocrImg: null,
            };
        default:
            return state
    }
};
