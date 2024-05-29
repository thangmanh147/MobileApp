import moment from 'moment'
import { URL } from '../../config/System'

export const checkCarIsTruck = carType => {
    return ['07', '08', '09', '10', '11', '17', '20', '21', '22', '23', '28'].includes(carType)
}
export const convertToNumber = value => {
    if (!value) return value
    const valueConvert = value.toString().replace(/\D/g, '')
    return valueConvert > 0 ? Number(valueConvert) : valueConvert
}
export const isCarLicenseNumber = (value) => {
    if (!value) return false
    const regex1 = /^[0-9]{2,}[a-zA-Z]{1,}[0-9]{4,6}$/
    const regex2 = /^[0-9]{5,}[a-zA-Z]{2,}[0-9]{2,3}$/
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

export const dataSubmitCarPhysical = values => {
    const result = {}
    if (values?.imageConfirm) {
        result.imageConfirm = true;
    }
    if (values?.purpose_car) {
        result.purpose = values.purpose_car.value == "C" ? "Y" : "N"
    }
    if (values?.typeCar) {
        result.carType = values.typeCar.code
    }
    if (values?.carBrand) {
        result.carBrand = values.carBrand.id
        result.carBrandName = values.carBrand.name
    }
    if (values?.carModel) {
        result.carModel = values.carModel.id
        result.carModeName = values.carModel.name
    }
    if (values?.seat) {
        result.numberSeat = Number(values.seat)
    }
    if (values?.year) {
        result.manufactureYear = Number(values.year)
    }
    if (values?.loadCapacity) {
        result.loadCapacity = checkCarIsTruck(values.typeCar.code) ? Number(values.loadCapacity) : 0
    }
    result.licenseStatus = ''
    result.licenseNumber = values?.licensePlate || ''
    result.chassisNumber = values?.frameNumber || ''
    result.machineNumber = values?.vehicleNumber || ''
    result.declarationPrice = values?.valueCar || 0
    result.insuredValue = values?.valueCashCar || 0
    result.ownerFullName = values.buyerName
    result.ownerAddress = `${values?.buyerAddress}, ${values?.buyerDistrict}, ${values?.buyerProvince}`

    if (values?.dateFrom) {
        result.effectiveAt = values.dateFrom
    }
    if (values?.duration) {
        result.duration = values.duration
    }
    if (values?.codeSelected === 'VNI') {
        result.expiredAt = values.dateTo;
        result.paymentDate = moment().format('DD/MM/YYYY');
        result.timeEnd = moment().add(8, 'minutes').format('HH:mm');
        result.timeStart = moment().add(5, 'minutes').format('HH:mm');
        result.carTonage = checkCarIsTruck(values.typeCar.code) ? Number(values.loadCapacity) : 0;
        result.feeAdditional = 0;
        result.feeNotVAT = Math.round(values?.amount / 1.1);
        result.feeVat = values?.amount;
        result.rateOfChange = values?.dataPackage?.tyle || 0;
        result.vat = values?.dataPackage?.vatTyle || 0;
        result.carTypeCode = values?.dataPackage?.carTypeCode || '';
        if (values?.listPkgsVNI?.length > 0) {
            result.packagesData = convertPackageVNI(values.listPkgsVNI.filter(item => item?.isSelect))
        } else {
            result.packagesData = ""
        }
    } else {
        if (values?.listBs?.length) {
            const pkgs = [...values.listBs];
            const _pkgs = pkgs.filter(item => item !== 'bs01' && item !== 'bs19');
            result.packages = _pkgs.join()
        }
        else {
            result.packages = ""
        }
    }

    // buyer data
    result.buyerType = Number(values?.buyerTypeId)
    result.buyerFullName = values?.buyerName || ''
    if (result.buyerType === 1) {
        if (values?.buyerBirthday) {
            result.buyerBirthday = values?.buyerBirthday
        }
        if (values?.buyerGender) {
            if (values?.buyerGender == "Nam") {
                result.buyerGender = "1"
            } else if (values?.buyerGender == "Nữ") {
                result.buyerGender = "2"
            } else {
                result.buyerGender = "0"
            }

        }
        if (values?.buyerIdentity) {
            result.buyerIdentityNumber = values.buyerIdentity
        }
    }
    result.buyerTaxCode = result.buyerType === 2 ? values?.companyTaxCode : ''
    result.buyerCompanyName = result.buyerType === 2 ? values?.companyName : ''
    if (values?.isVat) {
        result.isVat = 'Y'
        result.companyAddress = values?.vatCompanyAddress || ''
        result.companyEmail = values?.vatCompanyEmail || ''
        result.companyName = values?.vatCompanyName || ''
        result.companyTaxCode = values?.vatCompanyTaxCode || ''
    }
    result.buyerPhone = values?.buyerPhone || ''
    result.buyerEmail = values?.buyerEmail || ''
    if (values?.dataProvince?.id) {
        result.buyerProvinceId = values.dataProvince?.id
        result.buyerProvinceName = values.buyerProvince
    }
    if (values?.dataDistrict?.id) {
        result.buyerDistrictId = values.dataDistrict?.id
        result.buyerDistrictName = values.buyerDistrict
    }
    if (values?.buyerAddress) {
        result.buyerAddress = values.buyerAddress
    }

    result.receiveType = values?.receiveType ? 'BOTH' : 'EMAIL'
    if (values?.receiveType) {
        result.insurancePrintFullName = values.receiverName
        result.insurancePrintPhone = values.receiverPhone
        result.insurancePrintEmail = values.receiverEmail
        result.insurancePrintProvinceId = values.dataProvinceReceiver?.id
        result.insurancePrintProvinceName = values.receiverProvince
        result.insurancePrintDistrictId = values.dataDistrictReceiver?.id
        result.insurancePrintDistrictName = values.receiverDistrict
        result.insurancePrintAddress = values.receiverAddress
    }
    if (values?.amount) {
        result.amount = values?.amount
    }
    result.productCode = "C2"
    result.supplierId = values.idComSelected || ''
    result.supplierCode = values.codeSelected || ''
    if (values?.licensePlate?.length > 0) {
        result.extraSeat = values?.extraSeat || ''
        result.frontCarImg = values?.frontCarImg || ''
        result.driverSeat = values?.driverSeat || ''
        result.behindExtraSeat = values?.behindExtraSeat || ''
        result.backCarImg = values?.backCarImg || ''
        result.behindDriverSeat = values?.behindDriverSeat || ''
        result.registrationStamp = values?.registrationStamp || ''
        result.cetificateCar = values?.cetificateCar || ''
        result.regisCertificateCar = values?.regisCertificateCar || ''
        result.extraSeatInfo = values?.extraSeatInfo || {}
        result.frontCarImgInfo = values?.frontCarImgInfo || {}
        result.driverSeatInfo = values?.driverSeatInfo || {}
        result.behindExtraSeatInfo = values?.behindExtraSeatInfo || {}
        result.backCarImgInfo = values?.backCarImgInfo || {}
        result.behindDriverSeatInfo = values?.behindDriverSeatInfo || {}
        result.registrationStampInfo = values?.registrationStampInfo || {}
        result.cetificateCarInfo = values?.cetificateCarInfo || {}
        result.regisCertificateCarInfo = values?.regisCertificateCarInfo || {}
    }
    else {
        result.saleAvoidPaper = values?.saleAvoidPaper || ''
        result.saleAvoidPaperInfo = values?.saleAvoidPaperInfo || {}
    }
    return result
}

export const dataSubmitCarPhysicalImage = values => {
    const result = {}
    result.licenseNumber = values?.licensePlate || ''
    if (values?.licensePlate?.length > 0) {
        result.extraSeat = values?.extraSeat || ''
        result.frontCarImg = values?.frontCarImg || ''
        result.driverSeat = values?.driverSeat || ''
        result.behindExtraSeat = values?.behindExtraSeat || ''
        result.backCarImg = values?.backCarImg || ''
        result.behindDriverSeat = values?.behindDriverSeat || ''
        result.registrationStamp = values?.registrationStamp || ''
        result.cetificateCar = values?.cetificateCar || ''
        result.regisCertificateCar = values?.regisCertificateCar || ''
        result.extraSeatInfo = values?.extraSeatInfo || {}
        result.frontCarImgInfo = values?.frontCarImgInfo || {}
        result.driverSeatInfo = values?.driverSeatInfo || {}
        result.behindExtraSeatInfo = values?.behindExtraSeatInfo || {}
        result.backCarImgInfo = values?.backCarImgInfo || {}
        result.behindDriverSeatInfo = values?.behindDriverSeatInfo || {}
        result.registrationStampInfo = values?.registrationStampInfo || {}
        result.cetificateCarInfo = values?.cetificateCarInfo || {}
        result.regisCertificateCarInfo = values?.regisCertificateCarInfo || {}
    }
    else {
        result.saleAvoidPaper = values?.saleAvoidPaper || ''
        result.saleAvoidPaperInfo = values?.saleAvoidPaperInfo || {}
    }
    return result
}

const convertPackageVNI = (data) => {
    let arr = data || []
    return arr.map((item, index) => ({
        code: item?.CODE,
        premiumNotVAT: item?.PHI_DKBS_CHUA_VAT,
        premiumIncludeVAT: item?.PHI_DKBS
    }))
}

export const dataSubmitTNDS = values => {
    const result = {}
    if (values?.purpose_car) {
        result.purpose = values.purpose_car.value == "C" ? "Y" : "N"
    }
    if (values?.typeCar) {
        result.carType = values.typeCar.code
    }
    if (values?.carBrand) {
        result.carBrand = values.carBrand.id
    }
    if (values?.carModel) {
        result.carModel = values.carModel.id
    }
    if (values?.seat) {
        result.numberSeat = Number(values.seat)
    }
    if (values?.year) {
        result.manufactureYear = Number(values.year)
    }
    if (values?.loadCapacity) {
        result.loadCapacity = checkCarIsTruck(values.typeCar.code) ? Number(values.loadCapacity) : 0
    }
    if (values?.organizationId) {
        result.organizationId = values?.organizationId
    }
    result.licenseStatus = ''
    result.licenseNumber = values?.licensePlate || ''
    result.chassisNumber = values?.frameNumber || ''
    result.machineNumber = values?.vehicleNumber || ''
    result.ownerFullName = values.buyerName
    result.ownerAddress = `${values?.buyerAddress}, ${values?.buyerDistrict}, ${values?.buyerProvince}`
    if (values?.registrationExp) {
        result.regisExpiredAt = values?.registrationExp
    }

    if (values?.dateFromTNDS) {
        result.effectiveAt = values?.dateFromTNDS
    }
    if (values?.dateToTNDS) {
        result.expiredAt = values?.dateToTNDS
    }
    // buyer data
    result.buyerType = Number(values?.buyerTypeId)
    result.buyerFullName = values?.buyerName || ''
    if (result.buyerType === 1) {
        if (values?.buyerBirthday) {
            result.buyerBirthday = values?.buyerBirthday
        }
        if (values?.buyerGender) {
            if (values?.buyerGender == "Nam") {
                result.buyerGender = "1"
            } else if (values?.buyerGender == "Nữ") {
                result.buyerGender = "2"
            } else {
                result.buyerGender = "0"
            }

        }
        if (values?.buyerIdentity) {
            result.buyerIdentityNumber = values.buyerIdentity
        }
    }
    result.buyerTaxCode = result.buyerType === 2 ? values?.companyTaxCode : ''
    result.buyerCompanyName = result.buyerType === 2 ? values?.companyName : ''
    if (values?.isVat) {
        result.isVat = 'Y'
        result.companyAddress = values?.vatCompanyAddress || ''
        result.companyEmail = values?.vatCompanyEmail || ''
        result.companyName = values?.vatCompanyName || ''
        result.companyTaxCode = values?.vatCompanyTaxCode || ''
    }
    result.buyerPhone = values?.buyerPhone || ''
    result.buyerEmail = values?.buyerEmail || ''
    if (values?.dataProvince?.id) {
        result.buyerProvinceId = values.dataProvince?.id
        result.buyerProvinceName = values.buyerProvince
    }
    if (values?.dataDistrict?.id) {
        result.buyerDistrictId = values.dataDistrict?.id
        result.buyerDistrictName = values.buyerDistrict
    }
    if (values?.buyerAddress) {
        result.buyerAddress = values.buyerAddress
    }

    result.receiveType = values?.receiveType ? 'BOTH' : 'EMAIL'
    if (values?.receiveType) {
        result.insurancePrintFullName = values.receiverName
        result.insurancePrintPhone = values.receiverPhone
        result.insurancePrintEmail = values.receiverEmail
        result.insurancePrintProvinceId = values.dataProvinceReceiver?.id
        result.insurancePrintProvinceName = values.receiverProvince
        result.insurancePrintDistrictId = values.dataDistrictReceiver?.id
        result.insurancePrintDistrictName = values.receiverDistrict
        result.insurancePrintAddress = values.receiverAddress
    }
    if (values?.checkTNLX) {
        result.buyAccident = 'Y'
        result.insuredValue = values?.insuranceValues || 0
        result.numberInsuredSeat = values?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? parseInt(values?.seatParent) : 0
    }
    result.productCode = "C1"
    result.supplierId = values.idComSelected || ''
    result.supplierCode = values.codeSelected || ''
    return result
}

export const dataSubmitTNDSVNI = values => {
    const result = {}
    result.purpose = values.purpose_car.value == "C" ? "Y" : "N"
    result.carType = values.typeCar.code || ''
    result.carBrand = values.carBrand.id || ''
    result.carModel = values.carModel.id || ''
    result.numberSeat = Number(values.seat)
    result.manufactureYear = Number(values.year)
    result.carTonage = checkCarIsTruck(values.typeCar.code) ? Number(values.loadCapacity) : 0
    result.organizationId = values?.organizationId
    result.licenseStatus = ''
    result.licenseNumber = values?.licensePlate || ''
    result.chassisNumber = values?.frameNumber || ''
    result.machineNumber = values?.vehicleNumber || ''
    result.ownerFullName = values.buyerName
    result.ownerAddress = `${values?.buyerAddress}, ${values?.buyerDistrict}, ${values?.buyerProvince}`
    result.regisExpiredAt = values?.registrationExp || ''
    result.effectiveAt = values?.dateFromTNDS || ''
    result.expiredAt = values?.dateToTNDS || ''
    result.duration = values.duration
    result.buyerType = Number(values?.buyerTypeId)
    result.buyerFullName = values?.buyerName || ''
    if (result.buyerType === 1) {
        if (values?.buyerBirthday) {
            result.buyerBirthday = values?.buyerBirthday
        }
        if (values?.buyerGender) {
            if (values?.buyerGender == "Nam") {
                result.buyerGender = "1"
            } else if (values?.buyerGender == "Nữ") {
                result.buyerGender = "2"
            } else {
                result.buyerGender = "0"
            }

        }
        if (values?.buyerIdentity) {
            result.buyerIdentityNumber = values.buyerIdentity
        }
    }
    result.buyerTaxCode = result.buyerType === 2 ? values?.companyTaxCode : ''
    result.buyerCompanyName = result.buyerType === 2 ? values?.companyName : ''
    if (values?.isVat) {
        result.isVat = 'Y'
        result.companyAddress = values?.vatCompanyAddress || ''
        result.companyEmail = values?.vatCompanyEmail || ''
        result.companyName = values?.vatCompanyName || ''
        result.companyTaxCode = values?.vatCompanyTaxCode || ''
    }
    result.buyerPhone = values?.buyerPhone || ''
    result.buyerEmail = values?.buyerEmail || ''
    result.buyerProvinceId = values.dataProvince?.id || ''
    result.buyerProvinceName = values.buyerProvince || ''
    result.buyerDistrictId = values.dataDistrict?.id || ''
    result.buyerDistrictName = values.buyerDistrict || ''
    result.buyerAddress = values.buyerAddress || ''
    result.receiveType = values?.receiveType ? 'BOTH' : 'EMAIL'
    result.insurancePrintFullName = values.receiverName || ''
    result.insurancePrintPhone = values.receiverPhone || ''
    result.insurancePrintEmail = values.receiverEmail || ''
    result.insurancePrintProvinceId = values.dataProvinceReceiver?.id || ''
    result.insurancePrintProvinceName = values.receiverProvince || ''
    result.insurancePrintDistrictId = values.dataDistrictReceiver?.id || ''
    result.insurancePrintDistrictName = values.receiverDistrict || ''
    result.insurancePrintAddress = values.receiverAddress || ''
    result.buyAccident = values?.checkTNLX ? 'Y' : 'N'
    result.insuredValue = values?.checkTNLX ? values?.insuranceValues : 0
    result.numberInsuredSeat = values?.checkTNLX ? values?.typeCar?.value?.toUpperCase()?.includes('TAXI') ? parseInt(values?.seatParent) : 0 : 0
    result.insuranceValue = values?.checkTNLX ? values?.insuranceValues : 0;
    result.rateOfChangeAccident = values?.insuranceMoney?.tyle || 0;
    result.feeVatAccident = values?.insuranceMoney?.feeVat || 0;
    result.feeNotVatAccident = values?.insuranceMoney?.fee || 0;
    result.carTypeCode = values?.feeTNDS?.carTypeCode;
    result.feeNotVAT = values?.feeTNDS?.fee;
    result.feeVat = values?.feeTNDS?.feeVat;
    result.insuranceAccidentValue = values?.checkTNLX ? values?.insuranceValues : 0;
    result.paymentDate = moment().format('DD/MM/YYYY');
    result.rateOfChange = values?.feeTNDS?.tyle;
    result.timeEnd = moment().add(8, 'minutes').format('HH:mm');
    result.timeStart = moment().add(5, 'minutes').format('HH:mm');
    result.vat = values?.feeTNDS?.vatTyle;
    result.vatAccident = 0;
    result.productCode = "C1"
    result.supplierId = values.idComSelected || ''
    result.supplierCode = values.codeSelected || ''
    return result
}

export const dataLogCarPhysical = values => {
    const result = {}
    if (values?.purpose_car) {
        result.purpose = values.purpose_car.value == "C" ? "Y" : "N"
    }
    if (values?.typeCar) {
        result.carType = values.typeCar.code
    }
    if (values?.carBrand) {
        result.carBrand = values.carBrand.id
        result.carBrandName = values.carBrand.name
    }
    if (values?.carModel) {
        result.carModel = values.carModel.id
        result.carModeName = values.carModel.name
    }
    if (values?.seat) {
        result.numberSeat = Number(values.seat)
    }
    if (values?.year) {
        result.manufactureYear = Number(values.year)
    }
    if (values?.loadCapacity) {
        result.loadCapacity = checkCarIsTruck(values.typeCar.code) ? Number(values.loadCapacity) : 0
    }
    result.licenseStatus = 'null'
    result.licenseNumber = values?.licensePlate || 'null'
    result.chassisNumber = values?.frameNumber || 'null'
    result.machineNumber = values?.vehicleNumber || 'null'
    result.declarationPrice = values?.valueCar || 0
    result.insuredValue = values?.valueCashCar || 0
    result.ownerFullName = values.buyerName
    result.ownerAddress = `${values?.buyerAddress}, ${values?.buyerDistrict}, ${values?.buyerProvince}`

    if (values?.dateFrom) {
        result.effectiveAt = values.dateFrom
    }
    if (values?.duration) {
        result.duration = values.duration
    }
    if (values?.dataPackage?.length) {
        result.packages = values?.dataPackage?.filter(item => item.disable && item.code !== 'vc')?.map((item) => item.code)?.toString()
    }
    else {
        result.packages = "null"
    }

    // buyer data
    result.buyerType = Number(values?.buyerTypeId)
    result.buyerFullName = values?.buyerName || 'null'
    if (result.buyerType === 1) {
        if (values?.buyerBirthday) {
            result.buyerBirthday = values?.buyerBirthday
        }
        // if (values?.buyerGender) {
        //     if (values?.buyerGender == "Nam") {
        //         result.buyerGender = "1"
        //     } else if (values?.buyerGender == "Nữ") {
        //         result.buyerGender = "2"
        //     } else {
        //         result.buyerGender = "0"
        //     }

        // }
        if (values?.buyerIdentity) {
            result.buyerIdentityNumber = values.buyerIdentity
        }
    }
    else if (result.buyerType === 2) {
        result.buyerTaxCode = values?.companyTaxCode || 'null'
        result.buyerCompanyName = values?.companyName || 'null'
        if (values?.isVat) {
            result.isVat = 'Y'
        }
    }
    result.buyerPhone = values?.buyerPhone || 'null'
    result.buyerEmail = values?.buyerEmail || 'null'
    if (values?.dataProvince?.id) {
        // result.buyerProvinceId = values.dataProvince?.id
        result.buyerProvinceName = values.buyerProvince
    }
    if (values?.dataDistrict?.id) {
        // result.buyerDistrictId = values.dataDistrict?.id
        result.buyerDistrictName = values.buyerDistrict
    }
    if (values?.buyerAddress) {
        result.buyerAddress = values.buyerAddress
    }

    // result.receiveType = values?.receiveType ? 'BOTH' : 'EMAIL'
    // if (values?.receiveType) {
    //     result.insurancePrintFullName = values.receiverName
    //     result.insurancePrintPhone = values.receiverPhone
    //     result.insurancePrintEmail = values.receiverEmail
    //     result.insurancePrintProvinceId = values.dataProvinceReceiver?.id
    //     result.insurancePrintProvinceName = values.receiverProvince
    //     result.insurancePrintDistrictId = values.dataDistrictReceiver?.id
    //     result.insurancePrintDistrictName = values.receiverDistrict
    //     result.insurancePrintAddress = values.receiverAddress
    // }
    // if (values?.amount) {
    //     result.amount = values?.amount
    // }
    // result.productCode = "C2"
    // if (values?.carStatus?.value === 'Y') {
    //     result.extraSeat = values?.extraSeat
    //     result.frontCarImg = values?.frontCarImg
    //     result.driverSeat = values?.driverSeat
    //     result.behindExtraSeat = values?.behindExtraSeat
    //     result.backCarImg = values?.backCarImg
    //     result.behindDriverSeat = values?.behindDriverSeat
    //     result.registrationStamp = values?.registrationStamp
    //     result.cetificateCar = values?.cetificateCar
    //     result.regisCertificateCar = values?.regisCertificateCar
    // }
    // else if (values?.carStatus?.value === 'N') {
    //     result.saleAvoidPaper = values?.saleAvoidPaper
    // }
    result.url = `${URL}/api/contract/v1/car-contracts/physical`
    return result
}

