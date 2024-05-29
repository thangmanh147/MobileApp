import {
    ACCIDENT_SAVE_BUYER_INFO,
    ACCIDENT_SAVE_BUYER_AAA,
    ACCIDENT_SAVE_CUSTOMER_AAA,
    ACCIDENT_SAVE_CHOSEN_PACKAGE,
    ACCIDENT_SAVE_INSURED_CUSTOMER_INFO,
    ACCIDENT_SET_PACKAGES_INFO,
    ACCIDENT_SET_PACKAGES,
    ACCIDENT_SAVE_INSURANCE_PRINT_ADDRESS,
    ACCIDENT_SAVE_VAT_INFOMATION,
    RESET_DATA_ACCIDENT
} from '../config/types'

const initialState = {
    packagesInfo: null,
    chosenPackage: null,
    buyerInfomation: null,
    buyerAAA: null,
    customerAAA: null,
    insuredCustomerInfo: null,
    insurancePrintsAddress: null,
    vatInfomation: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACCIDENT_SET_PACKAGES_INFO:
            return {
                ...state,
                packagesInfo: action.data
            };
        case ACCIDENT_SET_PACKAGES:
            return {
                ...state,
                packages: action.data
            };
        case ACCIDENT_SAVE_CHOSEN_PACKAGE:
            return {
                ...state,
                chosenPackage: action.data
            };
        case ACCIDENT_SAVE_BUYER_INFO:
            return {
                ...state,
                buyerInfomation: action.data
            };
        case ACCIDENT_SAVE_BUYER_AAA:
            return {
                ...state,
                buyerAAA: action.data
        };
        case ACCIDENT_SAVE_CUSTOMER_AAA:
            return {
                ...state,
                customerAAA: action.data
        };
        case ACCIDENT_SAVE_INSURED_CUSTOMER_INFO:
            return {
                ...state,
                insuredCustomerInfo: action.data
            };
        case ACCIDENT_SAVE_INSURANCE_PRINT_ADDRESS:
            return {
                ...state,
                insurancePrintsAddress: action.data
            };
        case ACCIDENT_SAVE_VAT_INFOMATION:
            return {
                ...state,
                vatInfomation: action.data
            };
        case RESET_DATA_ACCIDENT:
            return {
                ...state,
                packagesInfo: null,
                packages: null,
                chosenPackage: null,
                buyerInfomation: null,
                buyerAAA: null,
                customerAAA: null,
                insuredCustomerInfo: null,
                insurancePrintsAddress: null,
                vatInfomation: null,
            };
        default:
            return state
    }
};
