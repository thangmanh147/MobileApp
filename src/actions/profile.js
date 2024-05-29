

import {
    PROFILE_GET_INFO_SUCCESS,
    LIST_PACKGES_GET_INFO_SUCCESS,
    PROFILE_LOADING,
    PROFILE_LIST_CONTRACT_SUCCESS,
    PROFILE_GET_AFFILIATECODE_SUCCESS,
    USER_LIST_GIFT_PRODUCT,
    USER_GET_DETAIL_VOUCHER,
    USER_GET_VOUCHER_SUCCESS, CUSTOMER_LIST_VOUCHER,
    CUSTOMER_DETAIL_VOUCHER,
    CUSTOMER_VOUCHER_CODE,
    HOME_LIST_GIFT,
    HOME_LIST_PROMOTION,
    DETAILS_PROMOTION,
    ADD_CONTACT_SUCCESS,
    DETAIL_CONTRACT_ACTIVE_SUCCESS


} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

let HTTP = require('../services/HTTP');

//getInfo
export const getInfoSuccess = data => {
    return {
		type: PROFILE_GET_INFO_SUCCESS,
		data
	}
}

export const getListPackage = data => {
    return {
		type: LIST_PACKGES_GET_INFO_SUCCESS,
		data
	}
}

export const getInfo = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getInfoSuccess(res.result_data.customer))
                    dispatch(getListPackage(res.result_data.group_packages))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                case '1021':
                    Actions.SettingPasscode({type: 'reset',setupPasscode: 'setupPasscode', customer_id: res.result_data.customer.id_number })
                    dispatch(loading(null))
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
        .catch((error) => {
            dispatch(loading(null));
        });
    };
}
export const updateInfo = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    SimpleToast.show('Bạn đã thay đổi thông tin thành công')
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
//loading
export const loading = data => {
	return {
		type: PROFILE_LOADING,
		data
	}
}
export const ListContractActiveSuccess = data => {
    return {
        type: PROFILE_LIST_CONTRACT_SUCCESS,
        data
    }
}


export const getListContractActive = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(ListContractActiveSuccess(res.result_data.contracts))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getAffiliateCodeSuccess = data => {
    return {
        type: PROFILE_GET_AFFILIATECODE_SUCCESS,
        data
    }
}
export const getAffiliateCode = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getAffiliateCodeSuccess(res.result_data))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getListGiftProductsSuccess = data => {
    return {
        type: USER_LIST_GIFT_PRODUCT,
        data
    }
}

export const getListGiftProducts = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getListGiftProductsSuccess(res.result_data))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getListCustomerSuccess = data => {
    return {
        type: CUSTOMER_LIST_VOUCHER,
        data
    }
}
export const getListCustomerProducts = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getListCustomerSuccess(res.result_data.list_customer_products))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getDetailVoucherSuccess = data => {
    return {
        type: USER_GET_DETAIL_VOUCHER,
        data
    }
}
export const getDetailVoucher = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getDetailVoucherSuccess(res.result_data))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
// export const getVoucherSuccess = data => {
//     console.log("Data",data); //cho chạy vào reducer
//     return {
//         type: USER_GET_VOUCHER_SUCCESS,
//         data
//     }
// }
// export const buyProductByRewardPoint = (body) => {
//     console.log("body buyProductByRewardPoint",body)
//     return dispatch => {
//         dispatch(loading(true))
//         return HTTP.post(body).then(res => {
//             console.log("resbuyProductByRewardPoint",res)
//             switch(res.result_code) {
//                 case '0000':
//                     let data  = res.result_message; // api luôn trả về 1 data y hệt cũ mỗi lần gọi
//                     dispatch(getVoucherSuccess(data))
//                     dispatch(loading(null))
//                     return;
//                 case '1001':
//                     SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
//                     Actions.login({type: 'reset'})
//                     dispatch(loading(null));
//                     return;
//                 default:
//                     SimpleToast.show(res.result_message)
//                     dispatch(loading(null));
//                     return;
//             }
//         })
//             .catch((error) => {
//                 dispatch(loading(null));
//             });
//     };
// }
export const getDetailUserVoucherSuccess = data => {
    return {
        type: CUSTOMER_DETAIL_VOUCHER,
        data
    }
}
export const getDetailUserVoucher = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getDetailUserVoucherSuccess(res.result_data.product))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getVoucherCodeSuccess = data => {
    return {
        type: CUSTOMER_VOUCHER_CODE,
        data
    }
}
export const getVoucherCode = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {

            switch(res.result_code) {
                case '0000':
                    dispatch(getVoucherCodeSuccess(res.result_data.voucher_code))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getMobileCardCodeSuccess = data => {
    return {
        type: CUSTOMER_VOUCHER_CODE,
        data
    }
}
export const getMobileCardCode = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getMobileCardCodeSuccess(res.result_data))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getTopGiftProductsSuccess = data => {
    return {
        type: HOME_LIST_GIFT,
        data
    }
}
export const getTopGiftProducts = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getTopGiftProductsSuccess(res.result_data))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                case '9002':
                    Actions.ForceUpdate({message: res.result_message})
                return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getListPromotionNewsSuccess = data => {
    return {
        type: HOME_LIST_PROMOTION,
        data
    }
}
export const getListPromotionNews = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getListPromotionNewsSuccess(res.result_data.list_news))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                case '9002':
                    Actions.ForceUpdate({message: res.result_message})
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getDetailPromotionNewsSuccess = data => {
    return {
        type: DETAILS_PROMOTION,
        data
    }
}
export const getDetailPromotionNews = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getDetailPromotionNewsSuccess(res.result_data.news))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const addContactSuccess = data => {
    return {
        type: ADD_CONTACT_SUCCESS,
        data
    }
}
export const addContact = (body) => {
    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(addContactSuccess({addContactSuccess:true}))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
export const getDetailContractActiveSuccess = data => {
    return {
        type: DETAIL_CONTRACT_ACTIVE_SUCCESS,
        data
    }
}
export const getDetailContractActive = (body) => {

    return dispatch => {
        dispatch(loading(true))
        return HTTP.post(body).then(res => {
            switch(res.result_code) {
                case '0000':
                    dispatch(getDetailContractActiveSuccess({DetailContract:res.result_data}))
                    dispatch(loading(null))
                    return;
                case '1001':
                    SimpleToast.show('Hệ thống yêu cầu đăng nhập. Vui lòng đăng nhập lại')
                    Actions.login({type: 'reset'})
                    dispatch(loading(null));
                    return;
                case '2009':
                    SimpleToast.show(res.result_message)
                    Actions.pop()
                    dispatch(loading(null));
                    return;
                default:
                    SimpleToast.show(res.result_message)
                    dispatch(loading(null));
                    return;
            }
        })
            .catch((error) => {
                dispatch(loading(null));
            });
    };
}
