import {
    HOUSE_SAVE_BUYER_INFO,
    HOUSE_SAVE_HOUSE_INFO,
    HOUSE_SAVE_INSURANCE_PRINT_ADDRESS,
    HOUSE_SAVE_INSURED_CUSTOMER,
    HOUSE_SAVE_VAT_INFO,
    HOUSE_SAVE_HOUSE_TYPE,
    HOUSE_SAVE_HOUSE_PROPERTY_INSURANCE
} from '../../../config/types';
import { URL } from '../../../config/System';

export const setHouseInfomation = (data) => {
    return {
        type: HOUSE_SAVE_HOUSE_INFO,
        data
    }
}
export const saveHouseInfomation = (body) => {
    return dispatch => {
        dispatch(setHouseInfomation(body))
    }
}
export const getHouseTypeSuccess = (data) => {
    return {
        type: HOUSE_SAVE_HOUSE_TYPE,
        data
    }
}
export const getHouseType = () => {
    return dispatch => {
        let url = `${URL}/api/contract/v1/insur-object-type?insurObjectId=37ab75f0-4dc2-11eb-b829-91dbf1c9137e`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI1ODQxMTIsImlhdCI6OTkwMjU1NTMxMiwiYXV0aF90aW1lIjoxNjAyNTU1MzEwLCJqdGkiOiIxNDBiNDQyMC03MTUyLTRkZDAtYjQwNy0wYTNlMTE0MzAyMTUiLCJpc3MiOiJodHRwczovL2F1dGgwZGV2Lmluc28udm4vYXV0aC9yZWFsbXMvaW5zby1odWIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzNmZWI2NmMtY2M3Ny00ZDVhLWE2OGMtZDY3OGNjYWI3NDAyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicG9ydGFsIiwibm9uY2UiOiJkYmJmOWZlOC03ODI1LTQ0MjMtOTVhZC1iMGE4Y2ZjYmZjODMiLCJzZXNzaW9uX3N0YXRlIjoiZTIyODRmNGMtZGJlYy00Y2UxLWI3YTctZDFjYWMyNDQ1NDI5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJwb3J0YWwuY2FwZG9uLnZuIiwiKiIsInZwYi5jYXBkb24udm4iLCJodWJkZXYuaW5zby52biJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiU1lTLUFETUlOIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIG9yZ2FuaXphdGlvbnMgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiaW5zby1hZG1pbiIsImNoYW5uZWxJZCI6IjVmMmU2ZTFkNzVhNzhmMDA0Y2U4OWY4NiJ9.r-YB7hg7lTN8YUuL1ASt_9UaMLCfkVo63374qcce2LM'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status == 'success') {
                    dispatch(getHouseTypeSuccess(res?.data))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
export const getHousePropertyInsuranceSuccess = (data) => {
    return {
        type: HOUSE_SAVE_HOUSE_PROPERTY_INSURANCE,
        data
    }
}
export const getHousePropertyInsurance = () => {
    return dispatch => {
        let url = `${URL}/api/contract/v1/insurance-packages?type=INHOUSE`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI1ODQxMTIsImlhdCI6OTkwMjU1NTMxMiwiYXV0aF90aW1lIjoxNjAyNTU1MzEwLCJqdGkiOiIxNDBiNDQyMC03MTUyLTRkZDAtYjQwNy0wYTNlMTE0MzAyMTUiLCJpc3MiOiJodHRwczovL2F1dGgwZGV2Lmluc28udm4vYXV0aC9yZWFsbXMvaW5zby1odWIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzNmZWI2NmMtY2M3Ny00ZDVhLWE2OGMtZDY3OGNjYWI3NDAyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicG9ydGFsIiwibm9uY2UiOiJkYmJmOWZlOC03ODI1LTQ0MjMtOTVhZC1iMGE4Y2ZjYmZjODMiLCJzZXNzaW9uX3N0YXRlIjoiZTIyODRmNGMtZGJlYy00Y2UxLWI3YTctZDFjYWMyNDQ1NDI5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJwb3J0YWwuY2FwZG9uLnZuIiwiKiIsInZwYi5jYXBkb24udm4iLCJodWJkZXYuaW5zby52biJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiU1lTLUFETUlOIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIG9yZ2FuaXphdGlvbnMgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiaW5zby1hZG1pbiIsImNoYW5uZWxJZCI6IjVmMmU2ZTFkNzVhNzhmMDA0Y2U4OWY4NiJ9.r-YB7hg7lTN8YUuL1ASt_9UaMLCfkVo63374qcce2LM'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status == 'success') {
                    dispatch(getHousePropertyInsuranceSuccess(res?.data))
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
export const setInsuredCustomerInfoSuccess = (data) => {
    return {
        type: HOUSE_SAVE_INSURED_CUSTOMER,
        data
    }
}
export const saveInsuredCustomerInfo = (body) => {
    return dispatch => {
        dispatch(setInsuredCustomerInfoSuccess(body))
    }
}
export const setBuyerInfomationSuccess = (data) => {
    return {
        type: HOUSE_SAVE_BUYER_INFO,
        data
    }
}
export const saveBuyerInfomation = (body) => {
    return dispatch => {
        dispatch(setBuyerInfomationSuccess(body))
    }
}