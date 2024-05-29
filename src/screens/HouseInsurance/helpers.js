import moment from 'moment'





export const checkCarIsTruck = carType => {
    return ['07', '08', '09', '10', '11', '17', '20', '21', '22', '23', '28'].includes(carType)
}
export const convertToNumber = value => {
    if (!value) return value
    const valueConvert = value.toString().replace(/\D/g, '')
    return valueConvert > 0 ? Number(valueConvert) : valueConvert
}
export const isMotorLicenseNumber = (value) => {
    if (!value) return false
    const regex1 = /^[0-9]{2}[a-zA-Z]{1,}[0-9]{4,6}$/
    const regex2 = /^[0-9]{2}(MĐ)[0-9]{5,6}$/
    return regex1.test(value) || regex2.test(value)
}
export function subTimestamp(time1, time2, unit = 'minute') {
    try {
        return moment(time1).diff(moment(time2), unit)
    } catch (error) {
        console.log(error);
        throw error
    }
}
export function isAlphaLatinNumeric(str) {
    const regex = /^[a-z0-9]+$/i
    return regex.test(str);
}
