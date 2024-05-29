import moment from 'moment'

export const HEADER_MIN_HEIGHT = 90;
export const HEADER_MAX_HEIGHT = 267;

export const convertMonthDay = (dateFrom,dateTo) => {
    let c = moment(dateTo).diff(dateFrom,'months')
    let d = moment(dateFrom).add(c,'months');
    let e =  moment(dateTo).diff(d,'days',true)
    e = Math.ceil(e)
    return `${c} tháng ${e} ngày`
}
export const makeId = (length) => {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

export const roundNumber = (value) => {
   return Math.round(value / 1000) * 1000;
}

export const trimFullNameOCR = (value) => {
    if (value?.trim()?.length === 0) {
        return '';
    } else {
        return value
            .replace('SOCIALIST REPUBLIC OF VIET NAM CĂN CƯỚC CÔNG DÂN', '')
            .replace('CĂN CƯỚC CÔNG DÂN', '')
            .replace('YA W', '')
            .replace('HoTen', '')
            .replace('HovaTen', '')
            .replace('Ho Ten', '')
            .replace('Ho va Ten', '')
            .replace('Họ Tên', '')
            .replace('Họ và Tên', '')
            .replace('Họ tên', '')
            .replace('Họ và tên', '')
            .trim()
    }
 }
 
import {Dimensions, Platform, StatusBar} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX =
        (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
        (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
}

export {isIPhoneX};


