import {
    GET_LIST_REFERRAL_ACC,
} from '../../../config/types';

const initialState = {
    listReferralAcc: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_REFERRAL_ACC:
            return {
                ...state,
                listReferralAcc: action.data
            };
        default:
            return state
    }
};
