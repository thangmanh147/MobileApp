import {
    KPI_SET_INFO,
} from '../config/types'

const initialState = {
    kpiInfo: {'1': {}, '2': {}, '3': {}},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case KPI_SET_INFO:
            return {
                ...state,
                kpiInfo: {...state.kpiInfo, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
