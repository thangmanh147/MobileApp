import moment from 'moment';
import { isPhoneAccident, isNewLicenseNumber } from '../../../../components/Functions';
import {validateOnlyNumber, validLoadCapacity, validNumberCapacity} from '../../../../config/Validation';
import {isCarLicenseNumber,isAlphaLatinNumeric,convertToNumber} from '../../helpers';

export const validationText = (values, required) => {
    let errors = {}
    try {
        if(!values) {
            errors.fullName = 'Không được bỏ trống'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}

export const validationTextName = (values, required) => {
    const validateName = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let errors = {}
    try {
        if(!values) {
            errors.fullName = 'Không được bỏ trống'
        }
        if(validateName.test(values)) {
            errors.fullName = 'Sai định dạng'
        }

    } catch (error) {
        console.log(error);
    }
    return errors
}

export const validationPackage = (values, name, typeCar) => {
    let errors = {}
    try {
        if(!values) {
            errors.valueCar = 'Không được bỏ trống'
        }
        // if (convertToNumber(values) % 1000 !== 0) {
        //     errors.valueCar = 'Giá trị xe không hợp lệ (phải là bội của 1000)'
        // }
        if (values) {
            if (typeCar?.code == '03' || typeCar?.code == '04' || typeCar?.code == '18' || typeCar?.code == '24') {
                if (convertToNumber(values) < 200000000) {
                    errors.valueCar = 'Giá trị xe không nhỏ hơn 200,000,000VNĐ'
                }
            }
        }

    } catch (error) {
        console.log(error);
    }
    return errors
}

export const validationValueCashCar = (values, name ,valueCar) => {
    let errors = {}
    try {
        if(!values) {
                errors.valueCashCar = 'Không được bỏ trống'
        }
        if (convertToNumber(values) % 1000 !== 0) {
            errors.valueCashCar = 'Số tiền bảo hiểm không hợp lệ (phải là bội của 1000)'
        }
        else if (convertToNumber(values) > valueCar) {
            errors.valueCashCar = 'Số tiền bảo hiểm không lớn hơn giá trị xe'
        }
        else if (convertToNumber(values) > 200000000000) {
            errors.valueCashCar = 'Số tiền bảo hiểm không lớn hơn 200.000.000.000VNĐ'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}
export function validateInformationCar(values,name) {
    let errors = {}
    let a = moment(new Date()).format('YYYY')
    let regex = /[^0-9]/
    try {
        if (!values) {
            errors.year = 'Không được bỏ trống'
        } else if (values?.length == 4 && (Number(a) - Number(values)) < 0) {
            errors.year = 'Không lớn hơn năm hiện tại'
        }else if (values.length < 4) {
            errors.year = 'Sai định dạng'
        }else if (regex.test(values) && values?.length == 4) {
            errors.year = 'Sai định dạng'
        }
        else if (values?.length == 4 && (Number(a) - Number(values)) > 60 ) {
            errors.year = 'Không được quá 60 năm'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}
export function validateInformationCarSeat(values,name) {
    let errors = {}
    let regex = /[^0-9]/
    try {
        if (!values) {
            errors.seat = 'Không được bỏ trống'
        }else if (Number(values)  > 60 ) {
            errors.seat = 'Không vượt quá 60'
        }else if (Number(values)  < 2 ) {
            errors.seat = 'Lớn hơn hoặc bằng 2'
        }else if (regex.test(values)) {
            errors.seat = 'Sai định dạng'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}
export function validateInformationCarchassisNumber(values,name) {
    let errors = {}
    try {
        // if (!values) {
        //     if (name == 'vehicleNumber') {
        //         errors.vehicleNumber = 'Không được để trống'
        //     }
        //     if (name == 'frameNumber') {
        //         errors.frameNumber = 'Không được để trống'
        //     }
        // }
        // else
        if (values && !isAlphaLatinNumeric(values)) {
            if (name == 'vehicleNumber') {
                errors.vehicleNumber = 'Chỉ cho phép chữ và số'
            }
            if (name == 'frameNumber') {
                errors.frameNumber = 'Chỉ cho phép chữ và số'
            }
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}
export function validateInformationCarLicenseNumber(values,name) {
    let errors = {}
    try {
        // if (!values) {
        //     errors.licensePlate = 'Không được bỏ trống'
        // // } else if (!isCarLicenseNumber(values)) {
        // } else 
        if (values && !isNewLicenseNumber(values)) {
            errors.licensePlate = 'Chỉ điền chữ cái và số, không bao gồm khoảng trắng và ký tự đặc biệt.'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}

export function validateLoadCapacity(values) {
    let errors = {}
    try {
        if (!values) {
            errors.loadCapacity = 'Không được bỏ trống'
        }else if (Number(values)  > 100 ) {
            errors.loadCapacity = 'Không vượt quá 100 tấn'
        }else if (Number(values)  == 0 ) {
            errors.loadCapacity = 'Phải lớn hơn 0'
        }else if (!(validLoadCapacity.test(values) || validNumberCapacity.test(values))) {
            errors.loadCapacity = 'Sai định dạng. Ví dụ: 2 tấn hoặc 2.25 tấn'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
}


export const validationPhonePopup = (values) => {
    let errors = {}
    try {
        if (!values && !values.trim()) {
            errors.phone = 'Không được bỏ trống'
        } else if (values && !isPhoneAccident(values)) {
            errors.phone = 'Số điện thoại sai định dạng'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
} 

export const validationC3 = (values, name) => {
    let errors = {}
    try {
        if (values && convertToNumber(values) % 1000 !== 0) {
            errors.insuranceValues = 'Giá trị xe không hợp lệ (phải là bội của 1000)'
        }
    } catch (error) {
        console.log(error);
    }
    return errors
} 
