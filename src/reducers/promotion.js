import {
    PROMOTION_SET_INFO,
    PROMOTION_SET_PRICE,
} from '../config/types'

const initialState = {
    promotionInfo: null,
    promotionPrice: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PROMOTION_SET_INFO:
            return {
                ...state,
                promotionInfo: action.data
            };
        case PROMOTION_SET_PRICE:
            return {
                ...state,
                promotionPrice: {...state.promotionPrice, [action.data?.id]: action.data?.obj}
            };
        default:
            return state
    }
};
