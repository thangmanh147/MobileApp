import { URL } from "../../../config/System";
import {
  SET_PACKAGES_INFO_24H,
  SAVE_CHOSEN_PACKAGE_24H,
  SAVE_BUYER_INFO_24H,
  SAVE_INSURED_CUSTOMER_INFO_24H,
  SAVE_INSURANCE_PRINT_ADDRESS_24H,
  SAVE_IMG_OCR_24H,
} from "../../../config/types";

export const getPackagesSuccess = (data) => ({
  type: SET_PACKAGES_INFO_24H,
  data
})
export const getAccidentPackages = () => {
  return dispatch => {
    let url = `${URL}/api/contract/v1/insurance-packages?type=A3&sort=priority`
    console.log('Url :: : ', url)
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 'success') {
          console.log('DATAaaaaa :: : ', res?.data)
          dispatch(getPackagesSuccess(res?.data))
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}
export const setPackageSuccess = (data) => {
  return {
    type: SAVE_CHOSEN_PACKAGE_24H,
    data
  }
}
export const saveChosenPackage = (body) => {
  return dispatch => {
    dispatch(setPackageSuccess(body))
  }
}
export const setBuyerInfomation = (data) => {
  return {
    type: SAVE_BUYER_INFO_24H,
    data
  }
}
export const saveBuyerInfomation = (body) => {
  return dispatch => {
    dispatch(setBuyerInfomation(body))
  }
}
export const setInsuredCustomerInfomation = (data) => {
  return {
    type: SAVE_INSURED_CUSTOMER_INFO_24H,
    data
  }
}
export const saveInsuredCustomerInfo = (body) => {
  return dispatch => {
    dispatch(setInsuredCustomerInfomation(body))
  }
}
export const setInsurancePrintAddress = (data) => {
  return {
    type: SAVE_INSURANCE_PRINT_ADDRESS_24H,
    data
  }
}
export const saveInsurancePrintAddress = (body) => {
  return dispatch => {
    dispatch(setInsurancePrintAddress(body))
  }
}

export const setImageOcr24h = (data) => {
  return {
      type: SAVE_IMG_OCR_24H,
      data
  }
}

export const saveImageOcr24h = (body) => {
  return dispatch => {
      dispatch(setImageOcr24h(body))
  }
}
