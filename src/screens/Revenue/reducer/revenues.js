import {
    REVENUE_SET_LIST
} from '../../../config/types'

const initialState = {
    dataRevenue: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REVENUE_SET_LIST:
            return {
                ...state,
                dataRevenue: {...state.dataRevenue, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
