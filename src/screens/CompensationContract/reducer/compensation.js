import {
    COMPENSATION_SET_INFORMATION,
} from '../../../config/types'

const initialState = {
    listCompen: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case COMPENSATION_SET_INFORMATION:
            return {
                ...state,
                listCompen: action.data
            };
        default:
            return state
    }
};
