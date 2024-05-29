import {
    HOUSE_SAVE_VAT_INFO,
    HOUSE_SAVE_INSURED_CUSTOMER,
    HOUSE_SAVE_INSURANCE_PRINT_ADDRESS,
    HOUSE_SAVE_HOUSE_INFO,
    HOUSE_SAVE_BUYER_INFO,
    HOUSE_SAVE_HOUSE_TYPE,
    HOUSE_SAVE_HOUSE_PROPERTY_INSURANCE
} from '../config/types';
const initialState = {
    listHouseType: null,
    listHousePropertyInsurance: null,
    houseInfomation: null,
    insuredCustomer: null,
    buyerInfomation: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HOUSE_SAVE_HOUSE_INFO:
            return {
                ...state,
                houseInfomation: action.data
            };
        case HOUSE_SAVE_HOUSE_TYPE:
            return {
                ...state,
                listHouseType: action.data
            };
        case HOUSE_SAVE_HOUSE_PROPERTY_INSURANCE:
            return {
                ...state,
                listHousePropertyInsurance: action.data
            };
        case HOUSE_SAVE_INSURED_CUSTOMER:
            return {
                ...state,
                insuredCustomer: action.data
            };
        case HOUSE_SAVE_BUYER_INFO:
            return {
                ...state,
                buyerInfomation: action.data
            };
        default:
            return state
    }
};
