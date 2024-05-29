import { URL } from "../../../config/System";
import {
  ACCIDENT_SET_PACKAGES_INFO,
    ACCIDENT_SET_PACKAGES,
  ACCIDENT_SAVE_CHOSEN_PACKAGE,
  ACCIDENT_SAVE_BUYER_INFO,
  ACCIDENT_SAVE_BUYER_AAA,
  ACCIDENT_SAVE_CUSTOMER_AAA,
  ACCIDENT_SAVE_INSURED_CUSTOMER_INFO,
  ACCIDENT_SAVE_INSURANCE_PRINT_ADDRESS,
  ACCIDENT_SAVE_VAT_INFOMATION
} from "../../../config/types";

export const getPackagesSuccess = (data) => ({
  type: ACCIDENT_SET_PACKAGES_INFO,
  data
})
export const getPackages = (data) => ({
  type: ACCIDENT_SET_PACKAGES,
  data
})
export const getAccidentPackages = (orgId, tokenInsur) => {
  return dispatch => {
    let url = `${URL}/api/contract/v1/insurance-packages?type=FAMILY_ACCIDENT&sort[priority]=1${orgId ? `&subType=SVFC` : ''}`
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
export const getAccident = (codeSelected) => {
  return dispatch => {
    let url = `${URL}/api/contract/v1/insurance-packages?type=INDIVIDUAL_ACCIDENT&sort[priority]=1`
    if (codeSelected === 'AAA') {
      url = `${URL}/api/contract/v1/insurance-packages?type=INDIVIDUAL_ACCIDENT&subType=AAA`
    }
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 'success') {
          dispatch(getPackages(res?.data))
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
}
export const setPackageSuccess = (data) => {
  return {
    type: ACCIDENT_SAVE_CHOSEN_PACKAGE,
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
    type: ACCIDENT_SAVE_BUYER_INFO,
    data
  }
}
export const saveBuyerInfomation = (body) => {
  return dispatch => {
    dispatch(setBuyerInfomation(body))
  }
}
export const setBuyerAAA = (data) => {
  return {
    type: ACCIDENT_SAVE_BUYER_AAA,
    data
  }
}
export const saveBuyerAAA = (body) => {
  return dispatch => {
    dispatch(setBuyerAAA(body))
  }
}
export const setCustomerAAA = (data) => {
  return {
    type: ACCIDENT_SAVE_CUSTOMER_AAA,
    data
  }
}
export const saveCustomerAAA = (body) => {
  return dispatch => {
    dispatch(setCustomerAAA(body))
  }
}
export const setInsuredCustomerInfomation = (data) => {
  return {
    type: ACCIDENT_SAVE_INSURED_CUSTOMER_INFO,
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
    type: ACCIDENT_SAVE_INSURANCE_PRINT_ADDRESS,
    data
  }
}
export const saveInsurancePrintAddress = (body) => {
  return dispatch => {
    dispatch(setInsurancePrintAddress(body))
  }
}
export const setVatInfomation = (data) => {
  return {
    type: ACCIDENT_SAVE_VAT_INFOMATION,
    data
  }
}
export const saveVatInfomation = (body) => {
  return dispatch => {
    dispatch(setVatInfomation(body))
  }
}
