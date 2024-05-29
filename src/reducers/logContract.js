import {
    SET_LOG_CONTRACT
} from '../config/types'

const initialState = {
    logContract: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOG_CONTRACT:
            return {
                ...state,
                logContract: {...state.logContract, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
