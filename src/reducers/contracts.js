import {
    CONTRACT_SET_INFORMATION,
    SET_DETAIL_CONTRACT,
    SET_EDIT_CONTRACT,
    SET_LIST_REGIS_ACC,
} from '../config/types'

const initialState = {
    contractInfo: {},
    detailContract: {},
    editContract: {},
    listRegisAcc: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CONTRACT_SET_INFORMATION:
            return {
                ...state,
                contractInfo: {...state.contractInfo, [action.data?.id]: action.data?.obj}
            };
        case SET_DETAIL_CONTRACT:
            return {
                ...state,
                detailContract: {...state.detailContract, [action.data?.id]: action.data?.obj}
            };
        case SET_EDIT_CONTRACT:
            return {
                ...state,
                editContract: {...state.editContract, [action.data?.id]: action.data?.obj}
            };
        case SET_LIST_REGIS_ACC:
            return {
                ...state,
                listRegisAcc: {...state.listRegisAcc, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
