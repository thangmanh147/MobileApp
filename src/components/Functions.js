import { Dimensions, Linking } from "react-native";
import moment from 'moment';

export const renderVND = (data = 0) => {
    let a = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return a;
}
export const formatVND = (amount, prefix = '.') => {
    if (!amount) return 0
    let a = amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, prefix)
    return a
}
export const formatVNDTNDSCAR = (amount, prefix = '.') => {
    if (!amount) return 0
    var str = amount?.toString()?.replace(/\./g, '')
    let a = str?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, prefix)
    return a
}
export const formatNumber = (num, fixed) => {
    var decimalPart;
    var array = Math.floor(num).toString().split('');
    var index = -3;
    while (array.length + index > 0) {
        array.splice(index, 0, ',');
        index -= 4;
    }

    if (fixed > 0) {
        decimalPart = num.toFixed(2).split(",")[1];
        return array.join('') + "," + decimalPart;
    }
    return array.join('');
}
export const formatHours = (value) => {
    if (!value) return '';
    return `${Math.floor(value / 60)} tiếng ${value % 60} phút`;
}
// export const validateEmail = (email) => {
//     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }
// export const openPhoneCall = () => {
//     Linking.openURL('tel:1900232425')
// }
// export const validatePhone = (phone) => {
//     var re = /^\d{10,11}$/;
//     return re.test(phone);
// }

export const validateId = (id) => {
    var re = /^[a-zA-Z0-9]{6,20}$/;
    return re.test(id);
}
export const valueScaleWindowWidth = function (percent) {
    return (Dimensions.get('window').width / 100) * percent;
};
export const convertDate = (date) => {
    var new1 = date.split("-");
    new2 = `${new1[2]}/${new1[1]}/${new1[0]}`;
    return new2;
}
// check validate ngày 29 tháng 02 năm nhuận
// item: ngày input
export const checkLeapYear = (item) => {
    let day = item.slice(0, 2)
    let month = item.slice(3, 5)
    let year = item.slice(6)
    let isLeapYear = moment([year]).isLeapYear()
    if (parseInt(month) == 2 && parseInt(day) > 29) {
        return false;
    }
    if (isLeapYear == false && parseInt(month) == 2 && parseInt(day) > 28) {
        return false;
    } else {
        return true
    }
}
// validate ngày 31 tháng 30 ngày
// item: ngày input
export const checkMonth = (item) => {
    let day = item.slice(0, 2)
    let month = item.slice(3, 5)
    let a = parseInt(month)

    if (a % 2 == 0 && a < 7 && parseInt(day) > 30) {
        return false
    } if (a % 2 !== 0 && a > 8 && parseInt(day) > 30) {
        return false
    } else {
        return true
    }
}
export function subTimestamp (time1, time2, unit = 'minute') {
    try {
        return moment(time1).diff(moment(time2), unit)
    } catch (error) {
        console.log(error);
        throw error
    }
}
// validate số điện thoại
export const isPhone = (phoneNumber) => {
    if (!phoneNumber) return false
    const cleaned = phoneNumber.toString().replace(/-/g, '');
    const regex1 = /^(02)([0-9]{9})$/i
    const regex2 = /^(09|08|07|03|01|02|04|05|06)([0-9]{8})$/i
    const regex3 = /^\+?(?:84)(2)([0-9]{9})$/i
    const regex4 = /^\+?(?:84)(9|8|7|3)([0-9]{8})$/i
    return regex1.test(cleaned) || regex2.test(cleaned) || regex3.test(cleaned) || regex4.test(cleaned)
}
export const isPhoneAccident = (str) => {
    if (!str)
        return false
    if (typeof str !== 'string' && typeof str !== 'number')
        return false
    str.toString()
    const regex1 = /^0[0-9]{9}$/i
    const regex2 = /^84[0-9]{9}$/i
    const regex3 = /^(19|18)00[0-9]{4}$/i
    return regex1.test(str) || regex2.test(str) || regex3.test(str)
}
export function isEmailAccident(email) {
    if (!email) return false;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
}

export const isIdentity = (value) => {
    if (!value) return false;
    const validate = /^[a-zA-Z0-9]*$/i;
    return validate.test(value) && value.length >= 8;
}

export const isBankFullName = (value) => {
    if (!value) return false;
    const regex = /^[a-z\s]+$/i;
    return regex.test(value);
}

export const isReferralCode = (value) => {
    if (!value) return true;
    const validate = /^[a-zA-Z0-9]{6,8}$/i;
    return validate.test(value);
}

export const isAddress = (value) => {
    if (!value) return true;
    return value.length >= 3 && value.length <= 255;
}

export const isAddressUnsigned = (str) => {
    if (!str) return false;
    const regex = /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/i;
    return str.length >= 3 && str.length <= 255 && regex.test(str.normalize());
}

export const isCodeSeatNumber = (value) => {
    if (!value) return false;
    const validate = /^[a-zA-Z0-9]*$/i;
    return validate.test(value);
}

export const isIdentityCusTravel = (value) => {
    if (!value) return false;
    const regex1 = /^[0-9a-z]{8,12}$/i;
    const regex2 = /^[0-9a-z]{8,12}\/[0-9]{1}$/i;
    return regex1.test(value) || regex2.test(value);
};

export function isToManySpace(test) {
    return /^[a-zA-Z0-9_ ]*$/i.test(test)
}

export function isEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

export function isEmailNotDot(email) {
    return /^[A-Z0-9]+[A-Z0-9._%+-]+[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

export function isEmailNext(email) {
    if (email) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    }else {
        return true
    }
}

export const isTaxCode = value => {
    if (!value) return false
    const regex1 = /^[0-9]{10}$/
    const regex2 = /^[0-9]{10}-[0-9]{3}$/
    return regex1.test(value) || regex2.test(value)
}

export const isTaxCodePersonal = value => {
    if (!value) return false
    const regex1 = /^[0-9]{10,13}$/
    return regex1.test(value)
}

export const isRefCode = value => {
    if (!value) return false
    const regex = /^[a-zA-Z]{1}-[a-zA-Z0-9]{1,15}$/
    return regex.test(value)
}

export const isNewLicenseNumber = value => {
    const regex = /^[a-zA-Z0-9.-]+$/i
    return regex.test(value);
}

export const isFullName = (str) => {
    if (!str) return false;
    const regex = /^[a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểếễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹý'\s]+$/i;
    // Thêm normalize() để tránh trường hợp validate false
    // khi người dùng sử dụng kiểu gõ Composite Unicode (ko phải kiểu gõ chuẩn: Precomposed Unicode)
    return regex.test(str.normalize());
}

export const isFullNameUnsigned = (str) => {
    if (!str) return false;
    const regex = /^[a-z'\s]+$/i;
    // Thêm normalize() để tránh trường hợp validate false
    // khi người dùng sử dụng kiểu gõ Composite Unicode (ko phải kiểu gõ chuẩn: Precomposed Unicode)
    return regex.test(str.normalize());
}

export const isFullNameAccount = (str) => {
    if (!str) return false;
    const regex = /^[a-z0-9-àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểếễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹý'\s]+$/i;
    // Thêm normalize() để tránh trường hợp validate false
    // khi người dùng sử dụng kiểu gõ Composite Unicode (ko phải kiểu gõ chuẩn: Precomposed Unicode)
    return regex.test(str.normalize());
}

export const isFullNameExpand = (str) => {
    if (!str) return false;
    const regex = /^[a-z0-9àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểếễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹý'\s]+$/i;
    // Thêm normalize() để tránh trường hợp validate false
    // khi người dùng sử dụng kiểu gõ Composite Unicode (ko phải kiểu gõ chuẩn: Precomposed Unicode)
    // return regex.test(str.normalize());
    return true;
}

export const isBankNumber = (str) => {
    if (!str) return false;
    const regex = /^[0-9]+$/i;
    return regex.test(str);
}

export const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}