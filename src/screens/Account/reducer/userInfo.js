import {
    SET_USER_INFORMATION,
    SET_PROFILE_LOG,
    SET_TPBANK_LOG,
    SET_TPBANK_INFO_IMG,
    SET_FMARKET_LOG,
    GET_LIST_BANK_SUCCESS,
    GET_LIST_NATION_SUCCESS,
    SET_PROFILE_INFORMATION,
    SET_ORG_CODE_USER,
    SET_LEVEL_USER
} from '../../../config/types'

const initialState = {
    userInfo: null,
    profileLog: null,
    listBank: null,
    listNation: null,
    profileInfo: null,
    orgCodeUser: null,
    userLevels: null,
    TPBankLog: null,
    infoImg: null,
    FmarketLog: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFORMATION:
            return {
                ...state,
                userInfo: action.data
            };
        case SET_PROFILE_LOG:
            return {
                ...state,
                profileLog: action.data
            };
        case SET_TPBANK_LOG:
            return {
                ...state,
                TPBankLog: action.data
            };
        case SET_TPBANK_INFO_IMG:
            return {
                ...state,
                infoImg: action.data
            };
        case SET_FMARKET_LOG:
            return {
                ...state,
                FmarketLog: action.data
            };
        case GET_LIST_BANK_SUCCESS:
            return {
                ...state,
                listBank: action.data
            };
        case GET_LIST_NATION_SUCCESS:
            return {
                ...state,
                listNation: action.data
            };
        case SET_PROFILE_INFORMATION:
            return {
                ...state,
                profileInfo: action.data
            };
        case SET_ORG_CODE_USER:
            return {
                ...state,
                orgCodeUser: action.data
            };
        case SET_LEVEL_USER:
            return {
                ...state,
                userLevels: action.data
            };
        default:
            return state
    }
};
