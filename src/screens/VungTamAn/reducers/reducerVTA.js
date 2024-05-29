import {
    VTA_SAVE_BUYER_INFO,
    VTA_SAVE_CHOSEN_PACKAGE,
    VTA_SAVE_INSURED_CUSTOMER_INFO,
    VTA_SET_PACKAGES_INFO,
    VTA_SET_PACKAGES,
    VTA_SAVE_INSURANCE_PRINT_ADDRESS,
    VTA_SAVE_VAT_INFOMATION,
    SAVE_IMG_OCR_VTA,
    RESET_DATA_VTA
} from '../../../config/types'

const initialState = {
    packagesInfo: null,
    chosenPackage: null,
    buyerInfomation: null,
    insuredCustomerInfo: null,
    insurancePrintsAddress: null,
    vatInfomation: null,
    ocrImg: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case VTA_SET_PACKAGES_INFO:
            return {
                ...state,
                packagesInfo: action.data
            };
        case VTA_SET_PACKAGES:
            return {
                ...state,
                packages: action.data
            };
        case VTA_SAVE_CHOSEN_PACKAGE:
            return {
                ...state,
                chosenPackage: action.data
            };
        case VTA_SAVE_BUYER_INFO:
            return {
                ...state,
                buyerInfomation: action.data
            };
        case VTA_SAVE_INSURED_CUSTOMER_INFO:
            return {
                ...state,
                insuredCustomerInfo: action.data
            };
        case VTA_SAVE_INSURANCE_PRINT_ADDRESS:
            return {
                ...state,
                insurancePrintsAddress: action.data
            };
        case VTA_SAVE_VAT_INFOMATION:
            return {
                ...state,
                vatInfomation: action.data
            };
        case SAVE_IMG_OCR_VTA:
            return {
                ...state,
                ocrImg: action.data,
            };
        case RESET_DATA_VTA:
            return {
                ...state,
                packagesInfo: null,
                packages: null,
                chosenPackage: null,
                buyerInfomation: null,
                insuredCustomerInfo: null,
                insurancePrintsAddress: null,
                vatInfomation: null,
                ocrImg: null
            };
        default:
            return state
    }
};
