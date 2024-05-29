import {
    NOTIFY_SET_INFORMATION,
} from '../../../config/types'

const initialState = {
    notifyInfo: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_SET_INFORMATION:
            return {
                ...state,
                notifyInfo: action.data
            };
        default:
            return state
    }
};
