import {
    PAYMENT_METHOD_SET_INFORMATION,
    PAYMENT_METHOD_SET_BANK_INFORMATION,
} from '../config/types'

const initialState = {
    paymentMethodInfo: {},
    dataBankInfo: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_METHOD_SET_INFORMATION:
            return {
                ...state,
                paymentMethodInfo: {...state.paymentMethodInfo, [action.data?.id]: action.data?.obj}
            };
        case PAYMENT_METHOD_SET_BANK_INFORMATION:
            return {
                ...state,
                dataBankInfo: {...state.dataBankInfo, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
