import {
    CAR_PRODUCER_SUCCESS,
    CAR_MODEL_SUCCESS,
    CAR_GET_PRICE_SUCCESS,
    CAR_CHECK_PRICE_SUCCESSS,
    CAR_CHECK_PRICE_FAIL,
    CAR_YEAR_SUCCESS,
    CAR_PACKAGE_REQUEST,
    CAR_PACKAGE_SUCCESS,
    CAR_PACKAGE_FAIL,
    CAR_REQUIREMENT_SUCCESS,
    CAR_SEAT_SUCCESS,
    CAR_UPDATE_IMAGE,
    ADD_PRICE,
    SET_PRICE,
    GET_PROFILE_SUCCESS,
    CAR_REQUEST,
    CAR_FAIL,
    SET_PRODUCER,
    CAR_CHECK_PRICE_REQUEST,
    SAVE_CONTRACT_SUCCESS,
    CLOSE_CONTRACT_SUCCESS,
    CLOSE_PACKAGE_NULL,
    OPEN_CHANGE_FEE,
    CAR_SET_PROFILE_ID,
    CAR_EXCLUSION_SUCCESS,
    CAR_SET_PATH_CORNER,
    CAR_MODAL_CHECK_PRICE,
    CAR_REQUIREMENT_REQUEST,
    CAR_GET_AMOUNT_SUCCESS,
    PUSH_PRICE,
    PUSH_PRICE_INSO,
    ADD_PRICE_INSO,
    SET_PRICE_INSO,
    RESET_DATA,
    PRICE_SALE,
    CAR_REQUIREMENT_BUTTON_OWN_SUCCESS,
    REMOVE_IMAGE_COLLABORATOR,
    CAR_VEHICLES_INFOR,
    PROFILE_ID, CAR_FORM_SUCCESS,

    CAR_GET_LIST_BRANCH_SUCCESS,
    CAR_GET_LIST_MODEL_SUCCESS,
    CAR_GET_TYPE_SUCCESS,
    SET_CAR_INFO,
    SET_CAR_INSURANCE_BUYER_INFO,
    SET_CAR_IMAGE_SUCCESS,
    REMOVE_CAR_IMAGE_SUCCESS,
    GET_LIST_PROVINCE_SUCCESS,
    GET_LIST_DISTRICT_SUCCESS,
    SAVE_IMAGE_CAR_CERTIFICATE,
    SAVE_IMAGE_CAR_REGISTRATION_CERTIFICATE,
    CAR_SET_INSURANCE_PACKAGES,
    SET_IMAGE_FILE,
    SET_PREVIEW_CAR_IMAGE_SUCCESS
} from '../config/types';

const initialState = {
    loading: null,
    producer: [],
    models: [],
    years: [],
    seats: [],
    price: null,
    priceSuggest: null,
    showModalCheckPrice: null,
    package: null,
    requirements: null,
    has_contract_profile_owe: null,
    fields: {},
    paths: {},
    total: 0,
    profile: {},
    showContractSuccess: null,
    showPackageNull: null,
    showChangeFee: null,
    profile_id: null,
    exclusions: null,
    confirmInsuranceAmount: null,
    arrPrice: [],
    arrPriceINSO: [],
    priceSale: null,//case sau khi dien ma giam gia, chon tiep cac option khac

    listBranch: null,
    listModel: null,
    listType: null,
    carInfo: null,
    carInsuranceBuyerInfo: null,
    listProvince: null,
    listDistrict: null,
    uri: {},
    dataPreviewCarImg: {},
    arrayCarImg: [{
        extraSeat: "",
        extraSeatInfo: {},
        behindExtraSeat: "",
        behindExtraSeatInfo: {},
        behindDriverSeat: "",
        behindDriverSeatInfo: {},
        driverSeat: "",
        driverSeatInfo: {},
        registrationStamp: "",
        registrationStampInfo: {},
        frontCarImg: "",
        frontCarImgInfo: {},
        backCarImg: "",
        backCarImgInfo: {},
        saleAvoidPaper: "",
        saleAvoidPaperInfo: {},
        cetificateCar: "",
        cetificateCarInfo: {},
        regisCertificateCar: "",
        regisCertificateCarInfo: {}
    }],
    imageCarCertificate: null,
    imageCarRegistrationCertificate: null,
    listPackages: null,
    arrayImgFile: [{
        extraSeat: "",
        behindExtraSeat: "",
        behindDriverSeat: "",
        driverSeat: "",
        registrationStamp: "",
        frontCarImg: "",
        backCarImg: "",
        saleAvoidPaper: "",
        cetificateCar: "",
        regisCertificateCar: ""
    }],
}

export default function carBuy(state = initialState, action) {
    switch (action.type) {
        // case REMOVE_IMAGE_COLLABORATOR:
        //     var profile = state.profile;
        //     profile['ADD_ID_NUMBER_FRONT_IMAGE'] = '';
        //     profile['ADD_ID_NUMBER_BEHIND_IMAGE'] = '';
        //     profile['ADD_PASS_PORT_IMAGE'] = '';
        //     return {
        //         ...state,
        //         profile
        //     }
        // case CAR_GET_AMOUNT_SUCCESS:
        //     return {
        //         ...state,
        //         confirmInsuranceAmount: action.data
        //     }
        // case PROFILE_ID:
        //     return {
        //         ...state,
        //         profile_id: action.data
        //     }
        // case CAR_EXCLUSION_SUCCESS:
        //     return {
        //         ...state,
        //         exclusions: action.data
        //     }
        // case CAR_SET_PROFILE_ID:
        //     return {
        //         ...state,
        //         profile_id: action.data
        //     }
        // case OPEN_CHANGE_FEE:
        //     return {
        //         ...state,
        //         showChangeFee: action.data,
        //     }
        // case CLOSE_PACKAGE_NULL:
        //     return {
        //         ...state,
        //         showPackageNull: null
        //     }
        // case CLOSE_CONTRACT_SUCCESS:
        //     return {
        //         ...state,
        //         showContractSuccess: null
        //     }
        // case SAVE_CONTRACT_SUCCESS:
        //     return {
        //         ...state,
        //         showContractSuccess: true
        //     }
        // case SET_PRODUCER:
        //     switch (action.action) {
        //         case 'producer':
        //             return {
        //                 ...state,
        //                 years: [],
        //                 seats: [],
        //                 models: []
        //             }
        //         case 'year':
        //             return {
        //                 ...state,
        //                 seats: [],
        //                 models: []
        //             }
        //         case 'model':
        //             return {
        //                 ...state,
        //                 seats: [],
        //             }
        //         default:
        //             return
        //     }

        // case CAR_FAIL:
        //     return {
        //         ...state,
        //         loading: null,
        //     }

        // case CAR_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     }
        // case GET_PROFILE_SUCCESS:
        //     var profile = state.profile;
        //     switch (action.code) {
        //         case 'FORM_SALES_INVOICE_CAR':
        //             profile['salesInvoiceCar'] = action.data
        //             return {
        //                 ...state,
        //                 profile
        //             }
        //         case 'FORM_REGISTRATION_CERTIFICATE_CAR':
        //             profile['registration'] = action.data
        //             return {
        //                 ...state,
        //                 profile
        //             }
        //         case 'FORM_CERTIFICATE_CAR':
        //             profile['certificate'] = action.data
        //             return {
        //                 ...state,
        //                 profile
        //             }
        //         case 'FORM_IMAGE_CAR':
        //             profile['corner'] = action.data
        //             return {
        //                 ...state,
        //                 profile
        //             }
        //         default:
        //             return {
        //                 ...state,
        //             }
        //     }


        // case PRICE_SALE:
        //     return {
        //         ...state,
        //         priceSale: true,
        //         gift_code: action.data.gift_code,
        //         insurance_amount: action.data.insurance_amount,
        //     }

        // case CAR_SET_PATH_CORNER:
        //     return {
        //         ...state,
        //         paths: {}
        //     }

        // case CAR_UPDATE_IMAGE:
        //     switch (action.action) {
        //         case 'ADD_ID_NUMBER_FRONT_IMAGE':
        //             var profile = state.profile;
        //             profile['ADD_ID_NUMBER_FRONT_IMAGE'] = action.data;
        //             profile['ALLOW_ADD_FRONT_IMAGE'] = true;
        //             profile['ALLOW_ADD_BEHIND_IMAGE'] = false;
        //             profile['HEIGHT_FRONT_IMAGE'] = action.height;
        //             profile['WIDTH_FRONT_IMAGE'] = action.width;
        //             return {
        //                 ...state,
        //                 profile
        //             }
        //         case 'ADD_ID_NUMBER_BEHIND_IMAGE':
        //             var profile = state.profile;
        //             profile['ADD_ID_NUMBER_BEHIND_IMAGE'] = action.data;
        //             profile['ALLOW_ADD_FRONT_IMAGE'] = false;
        //             profile['ALLOW_ADD_BEHIND_IMAGE'] = true;
        //             profile['HEIGHT_BEHIND_IMAGE'] = action.height;
        //             profile['WIDTH_BEHIND_IMAGE'] = action.width;
        //             return {
        //                 ...state,
        //                 profile
        //             }
        //         case 'ADD_PASS_PORT_IMAGE':
        //             var profile = state.profile;
        //             profile['ADD_PASS_PORT_IMAGE'] = action.data;
        //             profile['ALLOW_ADD_FRONT_IMAGE'] = false;
        //             profile['ALLOW_ADD_BEHIND_IMAGE'] = false;
        //             profile['HEIGHT_ADD_PASS_PORT_IMAGE_IMAGE'] = action.height;
        //             profile['WIDTH_ADD_PASS_PORT_IMAGE_IMAGE'] = action.width;
        //             return {
        //                 ...state,
        //                 profile
        //             }
        //         case 'FORM_SALES_INVOICE_CAR':
        //             var profile = state.profile;
        //             profile.salesInvoiceCar.IMAGE.value = action.data
        //             return {
        //                 ...state,
        //                 profile,
        //             }
        //         case 'FORM_IMAGE_CAR':
        //             var profile = state.profile;
        //             var paths = state.paths;
        //             var fields = state.fields;
        //             fields[action.data.name] = action.data.value
        //             switch (action.data.name) {
        //                 case "IMAGE_1":
        //                     profile.corner.IMAGE_1.value = action.data.value
        //                     paths[action.data.name] = action.data.path
        //                     return {
        //                         ...state,
        //                         profile,
        //                         paths,
        //                     }
        //                 case "IMAGE_2":
        //                     profile.corner.IMAGE_2.value = action.data.value
        //                     paths[action.data.name] = action.data.path
        //                     return {
        //                         ...state,
        //                         profile,
        //                         paths,
        //                     }
        //                 case "IMAGE_3":
        //                     profile.corner.IMAGE_3.value = action.data.value
        //                     paths[action.data.name] = action.data.path
        //                     return {
        //                         ...state,
        //                         profile,
        //                         paths,
        //                     }
        //                 case "IMAGE_4":
        //                     profile.corner.IMAGE_4.value = action.data.value
        //                     paths[action.data.name] = action.data.path
        //                     return {
        //                         ...state,
        //                         profile,
        //                         paths,
        //                     }
        //                 case "IMAGE_5":
        //                     profile.corner.IMAGE_5.value = action.data.value
        //                     paths[action.data.name] = action.data.path
        //                     return {
        //                         ...state,
        //                         profile,
        //                         paths,
        //                     }
        //                 default:
        //                     return {
        //                         ...state
        //                     }
        //             }
        //         case 'FORM_CERTIFICATE_CAR':
        //             var profile = state.profile;
        //             profile.certificate.IMAGE.value = action.data
        //             return {
        //                 ...state,
        //                 profile,
        //             }
        //         case 'FORM_REGISTRATION_CERTIFICATE_CAR':
        //             var profile = state.profile;
        //             profile.registration.IMAGE.value = action.data
        //             return {
        //                 ...state,
        //                 profile,
        //             }
        //         default:
        //             return {
        //                 ...state
        //             }
        //     }

        // case CAR_REQUIREMENT_REQUEST:
        //     return {
        //         ...state,
        //         requirements: null
        //     }
        // case CAR_REQUIREMENT_SUCCESS:
        //     return {
        //         ...state,
        //         requirements: action.data,
        //     }
        // case CAR_FORM_SUCCESS:
        //     return {
        //         ...state,
        //         formCar: action.data,
        //     }
        // case CAR_VEHICLES_INFOR:
        //     return {
        //         ...state,
        //         inforVehicles: action.data,
        //     }
        // case CAR_REQUIREMENT_BUTTON_OWN_SUCCESS:
        //     return {
        //         ...state,
        //         has_contract_profile_owe: action.data
        //     }
        // case CAR_PACKAGE_REQUEST:
        //     return {
        //         ...state,
        //         total: 0,
        //         package: null,
        //         loading: true
        //     }
        // case CAR_PACKAGE_SUCCESS:
        //     return {
        //         ...state,
        //         package: action.data,
        //         loading: null
        //     }

        case CAR_PACKAGE_FAIL:
            return {
                ...state,
                showPackageNull: true,
                loading: null
            }
        case CAR_YEAR_SUCCESS:
            return {
                ...state,
                years: action.data
            }

        case CAR_MODAL_CHECK_PRICE:
            return {
                ...state,
                showModalCheckPrice: action.data,
            }
        case CAR_CHECK_PRICE_REQUEST:
            return {
                ...state,
                total: 0,
                package: null,
                showModalCheckPrice: null,
            }
        case CAR_CHECK_PRICE_SUCCESSS:
            return {
                ...state,
                showModalCheckPrice: null,
                price: action.data
            }
        case CAR_CHECK_PRICE_FAIL:
            return {
                ...state,
                loading: null,
                showModalCheckPrice: true,
                priceSuggest: action.data
            }

        case CAR_GET_PRICE_SUCCESS:
            return {
                ...state,
                loading: null,
                carPrice: action.data,
                showChangeFee: null,
            }

        case CAR_SEAT_SUCCESS:
            return {
                ...state,
                seats: action.data
            }

        case CAR_MODEL_SUCCESS:
            return {
                ...state,
                models: action.data
            }

        case CAR_PRODUCER_SUCCESS:
            return {
                ...state,
                producer: action.data
            }
        /////////////////////////////
        case CAR_GET_LIST_BRANCH_SUCCESS:
            return {
                ...state,
                listBranch: action.data
            }
        case CAR_GET_LIST_MODEL_SUCCESS:
            return {
                ...state,
                listModel: action.data
            }
        case CAR_GET_TYPE_SUCCESS:
            return {
                ...state,
                listType: action.data
            }
        case SET_CAR_INFO:
            return {
                ...state,
                carInfo: action.data
            }
        case SET_CAR_INSURANCE_BUYER_INFO:
            return {
                ...state,
                carInsuranceBuyerInfo: action.data
            }
        case SET_CAR_IMAGE_SUCCESS:
            let arrayCarImg = state.arrayCarImg;
            let uri = state.uri;
            switch (action.data.name) {
                case "IMG_RESET":
                    arrayCarImg[0].extraSeat = ''
                    arrayCarImg[0].behindExtraSeat = ''
                    arrayCarImg[0].behindDriverSeat = ''
                    arrayCarImg[0].driverSeat = ''
                    arrayCarImg[0].registrationStamp = ''
                    arrayCarImg[0].frontCarImg = ''
                    arrayCarImg[0].backCarImg = ''
                    arrayCarImg[0].saleAvoidPaper = ''
                    arrayCarImg[0].cetificateCar = ''
                    arrayCarImg[0].regisCertificateCar = ''
                    arrayCarImg[0].extraSeatInfo = {}
                    arrayCarImg[0].behindExtraSeatInfo = {}
                    arrayCarImg[0].behindDriverSeatInfo = {}
                    arrayCarImg[0].driverSeatInfo = {}
                    arrayCarImg[0].registrationStampInfo = {}
                    arrayCarImg[0].frontCarImgInfo = {}
                    arrayCarImg[0].backCarImgInfo = {}
                    arrayCarImg[0].saleAvoidPaperInfo = {}
                    arrayCarImg[0].cetificateCarInfo = {}
                    arrayCarImg[0].regisCertificateCarInfo = {}
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_1":
                    arrayCarImg[0].extraSeat = action.data.uri
                    arrayCarImg[0].extraSeatInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_2":
                    arrayCarImg[0].behindExtraSeat = action.data.uri
                    arrayCarImg[0].behindExtraSeatInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_3":
                    arrayCarImg[0].behindDriverSeat = action.data.uri
                    arrayCarImg[0].behindDriverSeatInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_4":
                    arrayCarImg[0].driverSeat = action.data.uri
                    arrayCarImg[0].driverSeatInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_5":
                    arrayCarImg[0].registrationStamp = action.data.uri
                    arrayCarImg[0].registrationStampInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_6":
                    arrayCarImg[0].frontCarImg = action.data.uri
                    arrayCarImg[0].frontCarImgInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_7":
                    arrayCarImg[0].backCarImg = action.data.uri
                    arrayCarImg[0].backCarImgInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_8":
                    arrayCarImg[0].saleAvoidPaper = action.data.uri
                    arrayCarImg[0].saleAvoidPaperInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_9":
                    arrayCarImg[0].cetificateCar = action.data.uri
                    arrayCarImg[0].cetificateCarInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                case "IMAGE_10":
                    arrayCarImg[0].regisCertificateCar = action.data.uri
                    arrayCarImg[0].regisCertificateCarInfo = action.data.infoImg
                    return {
                        ...state,
                        arrayCarImg
                    }
                default:
                    return {
                        ...state
                    }
            }
        case SET_PREVIEW_CAR_IMAGE_SUCCESS:
            let dataPreviewCarImg = state.dataPreviewCarImg;
            switch (action.data.name) {
                case "IMG_RESET":
                    return {
                        ...state,
                        dataPreviewCarImg: {}
                    }
                case "IMAGE_1":
                    dataPreviewCarImg['GOC_TRUOC_GHE_PHU'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_2":
                    dataPreviewCarImg['GOC_SAU_GHE_PHU'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_3":
                    dataPreviewCarImg['GOC_SAU_GHE_LAI'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_4":
                    dataPreviewCarImg['GOC_TRUOC_GHE_LAI'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_5":
                    dataPreviewCarImg['TEM_DANG_KIEM'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_6":
                    dataPreviewCarImg['GOC_CHINH_DIEN_DAU_XE'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_7":
                    dataPreviewCarImg['GOC_CHINH_DIEN_DUOI_XE'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_8":
                    dataPreviewCarImg['GIAY_BAN_GIAO_XE'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_9":
                    dataPreviewCarImg['GIAY_DANG_KIEM'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                case "IMAGE_10":
                    dataPreviewCarImg['DANG_KY_XE'] = {
                        uri: action.data.uri,
                        infoImg: action.data.infoImg
                    }
                    return {
                        ...state,
                        dataPreviewCarImg
                    }
                default:
                    return {
                        ...state
                    }
            }
        case SET_IMAGE_FILE:
            let arrayImgFile = state.arrayImgFile;
            switch (action.data.name) {
                case "IMG_RESET":
                    arrayImgFile[0].extraSeat = ''
                    arrayImgFile[0].behindExtraSeat = ''
                    arrayImgFile[0].behindDriverSeat = ''
                    arrayImgFile[0].driverSeat = ''
                    arrayImgFile[0].registrationStamp = ''
                    arrayImgFile[0].frontCarImg = ''
                    arrayImgFile[0].backCarImg = ''
                    arrayImgFile[0].saleAvoidPaper = ''
                    arrayImgFile[0].cetificateCar = ''
                    arrayImgFile[0].regisCertificateCar = ''
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_1":
                    arrayImgFile[0].extraSeat = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_2":
                    arrayImgFile[0].behindExtraSeat = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_3":
                    arrayImgFile[0].behindDriverSeat = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_4":
                    arrayImgFile[0].driverSeat = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_5":
                    arrayImgFile[0].registrationStamp = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_6":
                    arrayImgFile[0].frontCarImg = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_7":
                    arrayImgFile[0].backCarImg = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_8":
                    arrayImgFile[0].saleAvoidPaper = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_9":
                    arrayImgFile[0].cetificateCar = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                case "IMAGE_10":
                    arrayImgFile[0].regisCertificateCar = action.data.uri
                    return {
                        ...state,
                        arrayImgFile
                    }
                default:
                    return {
                        ...state
                    }
            }
        case REMOVE_CAR_IMAGE_SUCCESS:
            return {
                ...state,
                arrayCarImg
            }
        case GET_LIST_PROVINCE_SUCCESS:
            return {
                ...state,
                listProvince: action.data
            }
        case GET_LIST_DISTRICT_SUCCESS:
            return {
                ...state,
                listDistrict: action.data
            }
        case SAVE_IMAGE_CAR_CERTIFICATE:
            return {
                ...state,
                imageCarCertificate: action.data
            }
        case SAVE_IMAGE_CAR_REGISTRATION_CERTIFICATE:
            return {
                ...state,
                imageCarRegistrationCertificate: action.data
            }
        case CAR_SET_INSURANCE_PACKAGES:
            return {
                ...state,
                listPackages: action.data
            }
        default:
            return state
    }
}