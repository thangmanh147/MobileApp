import { URL } from "../../../config/System";
import {
  VTA_SET_PACKAGES_INFO,
  VTA_SAVE_CHOSEN_PACKAGE,
  VTA_SAVE_BUYER_INFO,
  VTA_SAVE_INSURED_CUSTOMER_INFO,
  VTA_SAVE_INSURANCE_PRINT_ADDRESS,
  VTA_SAVE_VAT_INFOMATION,
  SAVE_IMG_OCR_VTA,
} from "../../../config/types";

export const getPackagesSuccess = (data) => ({
  type: VTA_SET_PACKAGES_INFO,
  data
})
export const getVTAPackages = () => {
  return dispatch => {
    let url = `${URL}/api/contract/v1/insurance-packages?type=A4&sort=priority`
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
    type: VTA_SAVE_CHOSEN_PACKAGE,
    data
  }
}
export const saveChosenPackageVTA = (body) => {
  return dispatch => {
    dispatch(setPackageSuccess(body))
  }
}
export const setBuyerInfomation = (data) => {
  return {
    type: VTA_SAVE_BUYER_INFO,
    data
  }
}
export const saveBuyerInfomationVTA = (body) => {
  return dispatch => {
    dispatch(setBuyerInfomation(body))
  }
}
export const setInsuredCustomerInfomation = (data) => {
  return {
    type: VTA_SAVE_INSURED_CUSTOMER_INFO,
    data
  }
}
export const saveInsuredCustomerInfoVTA = (body) => {
  return dispatch => {
    dispatch(setInsuredCustomerInfomation(body))
  }
}
export const setInsurancePrintAddress = (data) => {
  return {
    type: VTA_SAVE_INSURANCE_PRINT_ADDRESS,
    data
  }
}
export const saveInsurancePrintAddressVTA = (body) => {
  return dispatch => {
    dispatch(setInsurancePrintAddress(body))
  }
}
export const setVatInfomation = (data) => {
  return {
    type: VTA_SAVE_VAT_INFOMATION,
    data
  }
}
export const saveVatInfomation = (body) => {
  return dispatch => {
    dispatch(setVatInfomation(body))
  }
}

export const setImageOcrVTA = (data) => {
  return {
      type: SAVE_IMG_OCR_VTA,
      data
  }
}

export const saveImageOcrVTA = (body) => {
  return dispatch => {
      dispatch(setImageOcrVTA(body))
  }
}