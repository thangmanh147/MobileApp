import {
    SET_INFO_LIST_COMPANY,
    SET_ID_COM_SELECTED,
} from '../../../config/types'

const initialState = {
    idComSelected: {},
    listCompany: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ID_COM_SELECTED:
            return {
                ...state,
                idComSelected: {...state.idComSelected, [action.data?.id]: action.data?.obj}
            };
        case SET_INFO_LIST_COMPANY:
            return {
                ...state,
                listCompany: {...state.listCompany, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
