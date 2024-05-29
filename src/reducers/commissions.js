import {
    COMMISSIONS_SET_INFORMATION,
    COMMISSIONS_SET_LIST,
    COMMISSIONS_SET_TOTAL_FULL,
} from '../config/types'

const initialState = {
    commissionsInfo: null,
    dataCommission: {},
    totalFull: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case COMMISSIONS_SET_INFORMATION:
            return {
                ...state,
                commissionsInfo: action.data
            };
        case COMMISSIONS_SET_LIST:
            return {
                ...state,
                dataCommission: {...state.dataCommission, [action.data?.id]: action.data?.obj}
            };
        case COMMISSIONS_SET_TOTAL_FULL:
            return {
                ...state,
                totalFull: action.data
            };
        default:
            return state
    }
};
