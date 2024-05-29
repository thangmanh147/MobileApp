import {
  ACARE_SAVE_BUYER_INFO,
  ACARE_SAVE_IMG_OCR,
  ACARE_SAVE_CUSTOMER_INFO,
  ACARE_SAVE_PACKAGE_INFO,
} from "../../../config/types";

export const setBuyerInfomation = (data) => {
  return {
    type: ACARE_SAVE_BUYER_INFO,
    data
  }
}
export const saveBuyerInfomation = (body) => {
  return dispatch => {
    dispatch(setBuyerInfomation(body))
  }
}
export const setCustomerInfo = (data) => {
  return {
    type: ACARE_SAVE_CUSTOMER_INFO,
    data
  }
}
export const saveCustomerInfo = (body) => {
  return dispatch => {
    dispatch(setCustomerInfo(body))
  }
}

export const setImageOcr = (id, data) => {
  return {
      type: ACARE_SAVE_IMG_OCR,
      data: { id: id, obj: data },
  }
}

export const saveImageOcr = (id, body) => {
  return dispatch => {
      dispatch(setImageOcr(id, body))
  }
}

export const setPackageInfo = (data) => {
  return {
    type: ACARE_SAVE_PACKAGE_INFO,
    data
  }
}
export const savePackageInfo = (body) => {
  return dispatch => {
    dispatch(setPackageInfo(body))
  }
}