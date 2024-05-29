import { URL } from '../../../config/System';
import {
    SET_INFO_TRAVEL,
    SET_TRAVEL_PACKAGES,
    SAVE_BUYER_TRAVEL,
    SAVE_SELL_INFO
} from '../../../config/types';

export const setInfoTravel = (data) => {
    return {
        type: SET_INFO_TRAVEL,
        data
    }
}
export const saveInfoTravel = (body) => {
    return dispatch => {
        dispatch(setInfoTravel(body))
    }
}

export const setTravelPackages = (data) => {
    return {
        type: SET_TRAVEL_PACKAGES,
        data
    }
}
export const saveTravelPackages = (body) => {
    return dispatch => {
        dispatch(setTravelPackages(body))
    }
}

export const setBuyerTravel = (data) => {
    return {
        type: SAVE_BUYER_TRAVEL,
        data
    }
}

export const saveBuyerTravel = (body) => {
    return dispatch => {
        dispatch(setBuyerTravel(body))
    }
}

export const getSellInfoSuccess = (data) => ({
    type: SAVE_SELL_INFO,
    data
  })
  export const getSellInfo = () => {
    let url = `${URL}/api/master-data/v1/currencies`;
    return dispatch => {
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json().then(data => {
                dispatch(getSellInfoSuccess(data?.data));
              });
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
  