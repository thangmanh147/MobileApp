import {
    FLIGHT_GET_LIST_SUCCESS,
    FLIGHT_LOADING,
    FLIGHT_GET_PACKAGE_SUCCESS, FLIGHT_GET_LIST_PACKAGE_SUCCESS,
    FLIGHT_GET_INFO_FLIGHT_SUCCESS,
    FLIGHT_GET_LIST_FLIGHT_DEPARTURE,
    FLIGHT_GET_COUNTRY, FLIGHT_GET_ARRIVALAIRPORT,
    FLIGHT_GET_BANKS_SUCCESS,
    FLIGHT_GET_TARGETS_SUCCESS,
    FLIGHT_UPDATE_CLAIM_SUCCESS, FLIGHT_GET_INTRODUCTION,
    FLIGHT_UPDATE_FORM_PROFILE_SUCCESS,
    CHECK_FLIGHT_ADD_CLAIM,
    FLIGHT_CLAIM_INFO_SUCCESS,
    FLIGHT_CANCAL_OLD_FLIGHT, FLIGHT_GET_DEPATUREAIREPORT,
    FLIGHT_GET_COUNTRY_ARRIVAL,
    FLIGHT_ONE_WAY_SUCCESS,
    ADD_ARRAY_BUYER,
    REMOVE_ARRAY_BUYER,
    ADD_ARRAY_FLIGHT_DISCOUNT_CODE,
    ADD_ARRAY_LOVING_DISCOUNT_CODE,
    REMOVE_ARRAY_LOVING_DISCOUNT_CODE,
    REMOVE_ARRAY_FLIGHT_DISCOUNT_CODE,
    RESET_ARRAY_BUYER,
    UPDATE_ARRAY_BUYER,
    ADD_ARRAY_COLLABORATOR_DISCOUNT_CODE,
    REMOVE_FULL_ARRAY_FLIGHT_DISCOUNT_CODE,
    REMOVE_EXISTED_ITEM_DISCOUNT_CODE,
    REMOVE_ARRAY_DISOCOUNT_CODE,
    ADD_USER_BALANCE,
    GET_INFO_DISCOUNT_ACTIVATED,
    GET_INFO_DISCOUNT_ACTIVATED_COLLABORATOR,
    ADD_ARRAY_FLIGHT_DISCOUNT_CODE_2,
    ADD_INPUT_ARRAY_BUYER,
    FLIGHT_SET_CUSTOMERS_INFO,
    FLIGHT_SET_FLIGHT_INFO,
    FLIGHT_SET_BILL_INFO,
    FLIGHT_SET_INSURANCE_PACKAGE_INFO,
    SET_CUSTOM_FLIGHT_INFO,
    SET_CUSTOM_DEPART_FLIGHT,
    SET_CUSTOM_RETURN_FLIGHT
} from '../config/types';

const initialState = {
    loading: null,
    listFlight: null,
    packagesFlight: null,
    infoFlight: null,
    listDepartureFlightCities: null,
    listCountry: null,
    listCountryArrival: null,
    listArrivalAirport: null,
    listBank: null,
    ListTargetsByClaim: null,
    updateClaim: null,
    introductionFlight: null,
    claimUpdateForm: null,
    checkFlightAddClaim: null,
    flightClaimInfoSuccess: null,
    cancelOldFlight: null,
    flightWay: null,
    arrayBuyer: [],
    arrayFlightDiscountCode: [],
    arrayLovingDiscountCode: [],
    collaboratorDiscountCode: [],
    infoUserBalance: null,

    customerInfo: null,
    flightInfo: null,
    billInfo: null,
    insurancePackage: null,
    customFlightInfo: null,

    customDepartFlight: null,
    customReturnFlight: null,
}

export default function flightBuy(state = initialState, action) {
    switch (action.type) {
        case FLIGHT_GET_LIST_SUCCESS:
            return {
                ...state,
                listFlight: action.data
            }

        case FLIGHT_LOADING:
            return {
                ...state,
                loading: action.data
            }
        case FLIGHT_GET_LIST_PACKAGE_SUCCESS:
            return {
                ...state,
                packagesFlight: action.data
            }
        case FLIGHT_GET_INFO_FLIGHT_SUCCESS:
            return {
                ...state,
                infoFlight: action.data
            }
        case FLIGHT_GET_LIST_FLIGHT_DEPARTURE:
            return {
                ...state,
                listDepartureFlightCities: action.data
            }
        case FLIGHT_GET_COUNTRY:
            return {
                ...state,
                listCountry: action.data
            }
        case FLIGHT_GET_COUNTRY_ARRIVAL:
            return {
                ...state,
                listCountryArrival: action.data
            }
        case FLIGHT_GET_ARRIVALAIRPORT:
            return {
                ...state,
                listArrivalAirport: action.data
            }
        case FLIGHT_GET_DEPATUREAIREPORT:
            return {
                ...state,
                listDepartureFlightCities: action.data
            }
        case FLIGHT_GET_BANKS_SUCCESS:
            return {
                ...state,
                listBank: action.data
            }
        case FLIGHT_GET_TARGETS_SUCCESS:
            return {
                ...state,
                ListTargetsByClaim: action.data
            }
        case FLIGHT_UPDATE_CLAIM_SUCCESS:
            return {
                ...state,
                updateClaim: action.data
            }
        case FLIGHT_GET_INTRODUCTION:
            return {
                ...state,
                introductionFlight: action.data
            }
        case FLIGHT_UPDATE_FORM_PROFILE_SUCCESS:
            return {
                ...state,
                claimUpdateForm: action.data
            }
        case CHECK_FLIGHT_ADD_CLAIM:
            return {
                ...state,
                checkFlightAddClaim: action.data
            }
        case FLIGHT_CLAIM_INFO_SUCCESS:
            return {
                ...state,
                flightClaimInfoSuccess: action.data
            }
        case FLIGHT_CANCAL_OLD_FLIGHT:
            return {
                ...state,
                cancelOldFlight: action.data
            }
        case ADD_USER_BALANCE:
            return {
                ...state,
                infoUserBalance: action.data
            }
        case FLIGHT_ONE_WAY_SUCCESS:
            return {
                ...state,
                flightWay: action.data
            }
        case ADD_INPUT_ARRAY_BUYER:
            return {
                ...state,
                arrayBuyer: action.data
            }
        case ADD_ARRAY_BUYER:
            var arrayBuyer = state.arrayBuyer;
            if (arrayBuyer.length == 5) {
                return {
                    ...state,
                    arrayBuyer
                }
            } else {
                arrayBuyer.push({
                    id: arrayBuyer.length + 1,
                    ...action.data
                })
                return {
                    ...state,
                    arrayBuyer
                }
            }
        case REMOVE_ARRAY_BUYER:
            var arrayBuyer = state.arrayBuyer;
            for (let i = 0; i < arrayBuyer.length; i++) {
                if (arrayBuyer[i].id === action.data) {
                    arrayBuyer.splice(i, 1);
                    return {
                        ...state,
                        arrayBuyer
                    }
                }
            }
        case ADD_ARRAY_FLIGHT_DISCOUNT_CODE:
            return {
                ...state,
                arrayFlightDiscountCode: action.data
            }
        // var arrayFlightDiscountCode = state.arrayFlightDiscountCode;
        //     arrayFlightDiscountCode.push({
        //         id: arrayFlightDiscountCode.length + 1,
        //         discount_amount: action.data.discount_amount,
        //         code: action.data.code,
        //     })
        //     return {
        //         ...state,
        //         arrayFlightDiscountCode
        //     }
        case ADD_ARRAY_FLIGHT_DISCOUNT_CODE_2:
            var arrayFlightDiscountCode = state.arrayFlightDiscountCode;
            arrayFlightDiscountCode.push({
                id: arrayFlightDiscountCode.length + 1,
                discount_amount: action.data.discount_amount,
                code: action.data.code,
            })
            return {
                ...state,
                arrayFlightDiscountCode
            }
        case REMOVE_ARRAY_FLIGHT_DISCOUNT_CODE:
            var arrayFlightDiscountCode = state.arrayFlightDiscountCode;
            for (let i = 0; i < arrayFlightDiscountCode.length; i++) {
                if (arrayFlightDiscountCode[i].code === action.data.code) {
                    arrayFlightDiscountCode.splice(i, 1);
                    return {
                        ...state,
                        arrayFlightDiscountCode
                    }
                }
            }
        case REMOVE_ARRAY_DISOCOUNT_CODE:
            return {
                ...state,
                arrayFlightDiscountCode: [],
                collaboratorDiscountCode: []
            }

        case GET_INFO_DISCOUNT_ACTIVATED:
            var arrayFlightDiscountCode = state.arrayFlightDiscountCode;
            for (let i = 0; i < action.data.length; i++) {
                if (action.data[i].type === '') {
                    arrayFlightDiscountCode.push({
                        discount_amount: action.data[i].discount_amount,
                        code: action.data[i].code,
                    });
                }
            }
            return {
                ...state,
                arrayFlightDiscountCode
            }

        case GET_INFO_DISCOUNT_ACTIVATED_COLLABORATOR:
            for (let i = 0; i < action.data.length; i++) {
                if (action.data[i].type !== '') {
                    return {
                        ...state,
                        collaboratorDiscountCode: action.data[i]
                    }
                }
            }
        // case ADD_ARRAY_LOVING_DISCOUNT_CODE:
        //     var arrayLovingDiscountCode = state.arrayLovingDiscountCode;
        //         arrayLovingDiscountCode.push({
        //             id: arrayLovingDiscountCode.length + 1,
        //             discount_amount: action.data.discount_amount,
        //             giftCode: action.data.giftCode,
        //         });
        //         return {
        //             ...state,
        //             arrayLovingDiscountCode
        //         }
        // case REMOVE_ARRAY_LOVING_DISCOUNT_CODE:
        //     console.log('action: ', action)
        //     var arrayLovingDiscountCode = state.arrayLovingDiscountCode;
        //     console.log('arrayLovingDiscountCode: ', arrayLovingDiscountCode)
        //     for (let i = 0; i < arrayLovingDiscountCode.length; i++) {
        //         if (arrayLovingDiscountCode[i].giftCode === action.data.code) {
        //             arrayLovingDiscountCode.splice(i, 1);
        //             return {
        //                 ...state,
        //                 arrayLovingDiscountCode
        //             }
        //         }
        //     }
        case ADD_ARRAY_COLLABORATOR_DISCOUNT_CODE:
            return {
                ...state,
                collaboratorDiscountCode: action.data
            }
        case REMOVE_EXISTED_ITEM_DISCOUNT_CODE:
            return {
                ...state,
                collaboratorDiscountCode: action.data
            }
        case RESET_ARRAY_BUYER:
            return {
                ...state,
                arrayBuyer: []
            }
        case UPDATE_ARRAY_BUYER:
            var arrayBuyer = state.arrayBuyer;
            for (let i = 0; i < arrayBuyer.length; i++) {
                if (arrayBuyer[i].id === action.data.id) {
                    arrayBuyer[i] = action.data
                    return {
                        ...state,
                        arrayBuyer
                    }
                }
            }
            arrayBuyer.push({
                ...action.data
            })
            return {
                ...state,
                arrayBuyer
            }

        case REMOVE_FULL_ARRAY_FLIGHT_DISCOUNT_CODE:
            return {
                ...state,
                arrayFlightDiscountCode: []
            }
        case FLIGHT_SET_CUSTOMERS_INFO:
            return {
                ...state,
                customerInfo: action.data
            }
        case FLIGHT_SET_FLIGHT_INFO:
            return {
                ...state,
                flightInfo: action.data
            }
        case FLIGHT_SET_BILL_INFO:
            return {
                ...state,
                billInfo: action.data
            }
        case FLIGHT_SET_INSURANCE_PACKAGE_INFO:
            return {
                ...state,
                insurancePackage: action.data
            }
        case SET_CUSTOM_FLIGHT_INFO:
            return {
                ...state,
                customFlightInfo: action.data
            }
        case SET_CUSTOM_DEPART_FLIGHT:
            return {
                ...state,
                customDepartFlight: action.data
            }
        case SET_CUSTOM_RETURN_FLIGHT:
            return {
                ...state,
                customReturnFlight: action.data
            }
        default:
            return state
    }
}