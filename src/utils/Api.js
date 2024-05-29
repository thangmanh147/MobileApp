import SimpleToast from 'react-native-simple-toast';
import Store from '../services/Store';
import Const from '../services/Const';

export const callApiGet = async (data) => {
    return new Store().getSession(Const.TOKEN).then(token => {
        return fetch(data?.url, {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : token
            },
        })
            .then(res => res.json())
            .then((res) => {
                if (res.status == 'success') {
                    return res?.data;
                }
            })
            .catch(error => {
                console.log(error)
            })
    })
}

export const callApiUpload = async (uri, url) => {
    let form_Data = new FormData();
    form_Data.append('file', {
        uri: uri,
        name: 'image.jpg', 
        type: 'image/jpeg',
    });
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: form_Data,
    })
        .then(res => res.json())
        .then((res) => {
            if (res?.data) {
                return res?.data;
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export const callApiContract = async (data, isForm, method, type, tokenInsur) => {
    return new Store().getSession(Const.TOKEN).then(token => {
        return fetch(data?.url, {
            method: method || 'POST',
            headers:{
                'Content-Type' : isForm ? 'multipart/form-data' : 'application/json',
                'Authorization' : tokenInsur || token
            },
            body: isForm ? (type === 'image' ? formDataImage(data?.body) : dataSubmitCarPhysicalFormData(data?.body)) : JSON.stringify(data?.body),

        })
            .then(res => res.json())
            .then((res) => {
                console.log('======RES - Create Contract : ',res)
                if (res.status !== 'success') {
                    if (res.errors) {
                        let error = Object.values(res.errors).join('\n');
                        SimpleToast.show(error);
                    } else if (res.message) {
                        SimpleToast.show(res.message);
                    }
                }
                return res;
            })
            .catch(error => {
                console.log(error)
            })
    })
}

const dataSubmitCarPhysicalFormData = values => {
    const result = {}
    const formData = new FormData();
    if (values?.imageConfirm) {
        formData.append('imageConfirm', true);
    }
    if (values?.purpose) {
        formData.append('purpose', values.purpose);
    }
    if (values?.carType) {
        formData.append('carType', values.carType);
    }
    if (values?.carBrand) {
        formData.append('carBrand', values.carBrand);
        formData.append('carBrandName', values.carBrandName);
    }
    if (values?.carModel) {
        formData.append('carModel', values.carModel);
        formData.append('carModeName', values.carModeName);
    }
    if (values?.numberSeat) {
        formData.append('numberSeat', Number(values.numberSeat));
    }
    if (values?.manufactureYear) {
        formData.append('manufactureYear', Number(values.manufactureYear));
    }
    if (values?.loadCapacity) {
        formData.append('loadCapacity', Number(values.loadCapacity));
    }
    formData.append('carTonage', Number(values.carTonage));
    formData.append('licenseStatus', values?.licenseStatus);
    formData.append('licenseNumber', values?.licenseNumber);
    formData.append('chassisNumber', values?.chassisNumber);
    formData.append('machineNumber', values?.machineNumber);
    formData.append('declarationPrice', values?.declarationPrice);
    formData.append('insuredValue', values?.insuredValue);
    formData.append('ownerFullName', values.ownerFullName);
    formData.append('ownerAddress', values?.ownerAddress);
    if (values?.effectiveAt) {
        formData.append('effectiveAt', values.effectiveAt);
    }
    if (values?.duration) {
        formData.append('duration', values.duration);
    }
    if (values?.packages) {
        formData.append('packages', values?.packages);
    }
    else {
        formData.append('packages', "");
    }

    if (values?.packagesData) {
        formData.append('packagesData', JSON.stringify(values?.packagesData));
    }

    if (values?.expiredAt) {
        formData.append('expiredAt', values?.expiredAt);
    }

    if (values?.paymentDate) {
        formData.append('paymentDate', values?.paymentDate);
    }

    if (values?.timeEnd) {
        formData.append('timeEnd', values?.timeEnd);
    }

    if (values?.timeStart) {
        formData.append('timeStart', values?.timeStart);
    }

    formData.append('feeAdditional', values?.feeAdditional);

    if (values?.feeNotVAT) {
        formData.append('feeNotVAT', values?.feeNotVAT);
    }

    if (values?.feeVat) {
        formData.append('feeVat', values?.feeVat);
    }

    if (values?.rateOfChange) {
        formData.append('rateOfChange', values?.rateOfChange);
    }

    if (values?.vat) {
        formData.append('vat', values?.vat);
    }

    if (values?.carTypeCode) {
        formData.append('carTypeCode', values?.carTypeCode);
    }

    // buyer data
    formData.append('buyerType', Number(values?.buyerType));
    formData.append('buyerFullName', values?.buyerFullName);
    if (Number(values.buyerType) === 1) {
        if (values?.buyerBirthday) {
            formData.append('buyerBirthday', values?.buyerBirthday);
        }
        if (values?.buyerGender) {
            formData.append('buyerGender', values?.buyerGender);
        }
        if (values?.buyerIdentityNumber) {
            formData.append('buyerIdentityNumber', values.buyerIdentityNumber);
        }
    }
    if (values.buyerTaxCode) {
        formData.append('buyerTaxCode', values.buyerTaxCode || '' );
    }
    if (values.buyerCompanyName) {
        formData.append('buyerCompanyName', values.buyerCompanyName || '' );
    }
    if (values.companyAddress) {
        formData.append('companyAddress', values.companyAddress || '' );
    }
    if (values.companyEmail) {
        formData.append('companyEmail', values.companyEmail || '' );
    }
    if (values.companyName) {
        formData.append('companyName', values.companyName || '' );
    }
    if (values.companyTaxCode) {
        formData.append('companyTaxCode', values.companyTaxCode || '' );
    }
    if (values.isVat) {
        formData.append('isVat', values.isVat || '');
    }
    formData.append('buyerPhone', values?.buyerPhone );
    formData.append('buyerEmail', values?.buyerEmail );
    if (values?.buyerProvinceId) {
        formData.append('buyerProvinceId', values.buyerProvinceId);
        formData.append('buyerProvinceName', values.buyerProvinceName);

    }
    if (values?.buyerDistrictId) {
        formData.append('buyerDistrictId', values.buyerDistrictId);
        formData.append('buyerDistrictName', values.buyerDistrictName);
    }
    if (values?.buyerAddress) {
        formData.append('buyerAddress', values.buyerAddress);
    }
    formData.append('receiveType', values?.receiveType);
    if (values?.receiveType == "BOTH") {
        formData.append('insurancePrintFullName', values.insurancePrintFullName);
        formData.append('insurancePrintPhone', values.insurancePrintPhone);
        formData.append('insurancePrintEmail', values.insurancePrintEmail);
        formData.append('insurancePrintProvinceId', values.insurancePrintProvinceId);
        formData.append('insurancePrintProvinceName', values.insurancePrintProvinceName);
        formData.append('insurancePrintDistrictId', values.insurancePrintDistrictId);
        formData.append('insurancePrintDistrictName', values.insurancePrintDistrictName);
        formData.append('insurancePrintAddress', values.insurancePrintAddress);
    }
    if (values?.amount) {
        formData.append('amount', values.amount);
    }
    formData.append('productCode', "C2");
    if (values?.licenseNumber?.length > 0) {
        if (values?.extraSeat) {
            let img1 = { 
                uri: values?.extraSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_TRUOC_GHE_PHU', img1);
        }
        if (values?.frontCarImg) {
            let img2 = { 
                uri: values?.frontCarImg, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_CHINH_DIEN_DAU_XE', img2);
        }
        if (values?.driverSeat) {
            let img3 = { 
                uri: values?.driverSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_TRUOC_GHE_LAI', img3);
        }
        if (values?.behindExtraSeat) {
            let img4 = { 
                uri: values?.behindExtraSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_SAU_GHE_PHU', img4);
        }
        if (values?.backCarImg) {
            let img5 = { 
                uri: values?.backCarImg, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_CHINH_DIEN_DUOI_XE', img5);
        }
        if (values?.behindDriverSeat) {
            let img6 = { 
                uri: values?.behindDriverSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_SAU_GHE_LAI', img6);
        }
        if (values?.registrationStamp) {
            let img7 = { 
                uri: values?.registrationStamp, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('TEM_DANG_KIEM', img7);
        }
        if (values?.cetificateCar) {
            let img8 = { 
                uri: values?.cetificateCar, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GIAY_DANG_KIEM', img8);
        }
        if (values?.regisCertificateCar) {
            let img9 = { 
                uri: values?.regisCertificateCar, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('DANG_KY_XE', img9);
        }

        formData.append('location', JSON.stringify({
            'GOC_TRUOC_GHE_PHU': values?.extraSeatInfo?.location || '',
            'GOC_CHINH_DIEN_DAU_XE': values?.frontCarImgInfo?.location || '',
            'GOC_TRUOC_GHE_LAI': values?.driverSeatInfo?.location || '',
            'GOC_SAU_GHE_PHU': values?.behindExtraSeatInfo?.location || '',
            'GOC_CHINH_DIEN_DUOI_XE': values?.backCarImgInfo?.location || '',
            'GOC_SAU_GHE_LAI': values?.behindDriverSeatInfo?.location || '',
            'TEM_DANG_KIEM': values?.registrationStampInfo?.location || '',
            'GIAY_DANG_KIEM': values?.cetificateCarInfo?.location || '',
            'DANG_KY_XE': values?.regisCertificateCarInfo?.location || '',
        }));
        formData.append('timePhoto', JSON.stringify({
            'GOC_TRUOC_GHE_PHU': values?.extraSeatInfo?.timePhoto || '',
            'GOC_CHINH_DIEN_DAU_XE': values?.frontCarImgInfo?.timePhoto || '',
            'GOC_TRUOC_GHE_LAI': values?.driverSeatInfo?.timePhoto || '',
            'GOC_SAU_GHE_PHU': values?.behindExtraSeatInfo?.timePhoto || '',
            'GOC_CHINH_DIEN_DUOI_XE': values?.backCarImgInfo?.timePhoto || '',
            'GOC_SAU_GHE_LAI': values?.behindDriverSeatInfo?.timePhoto || '',
            'TEM_DANG_KIEM': values?.registrationStampInfo?.timePhoto || '',
            'GIAY_DANG_KIEM': values?.cetificateCarInfo?.timePhoto || '',
            'DANG_KY_XE': values?.regisCertificateCarInfo?.timePhoto || '',
        }));
    } else {
        if (values?.saleAvoidPaper) {
            let img = {
                uri: values?.saleAvoidPaper,
                name: 'image.jpg',
                type: 'image/jpeg',
            }
            formData.append('GIAY_BAN_GIAO_XE', img);
        } 
        formData.append('location', JSON.stringify({
            'GIAY_BAN_GIAO_XE': values?.saleAvoidPaperInfo?.location || '',
        }));
        formData.append('timePhoto', JSON.stringify({
            'GIAY_BAN_GIAO_XE': values?.saleAvoidPaperInfo?.timePhoto || '',
        }));
    }
    if (values?.paymentMethod) {
        formData.append('paymentMethod', values?.paymentMethod);
    }
    formData.append('supplierId', values?.supplierId);
    formData.append('supplierCode', values?.supplierCode);
    return formData
}


const formDataImage = values => {
    const formData = new FormData();
    if (values?.licenseNumber?.length > 0) {
        if (values?.extraSeat) {
            let img1 = { 
                uri: values?.extraSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_TRUOC_GHE_PHU', img1);
        }
        if (values?.frontCarImg) {
            let img2 = { 
                uri: values?.frontCarImg, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_CHINH_DIEN_DAU_XE', img2);
        }
        if (values?.driverSeat) {
            let img3 = { 
                uri: values?.driverSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_TRUOC_GHE_LAI', img3);
        }
        if (values?.behindExtraSeat) {
            let img4 = { 
                uri: values?.behindExtraSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_SAU_GHE_PHU', img4);
        }
        if (values?.backCarImg) {
            let img5 = { 
                uri: values?.backCarImg, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_CHINH_DIEN_DUOI_XE', img5);
        }
        if (values?.behindDriverSeat) {
            let img6 = { 
                uri: values?.behindDriverSeat, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GOC_SAU_GHE_LAI', img6);
        }
        if (values?.registrationStamp) {
            let img7 = { 
                uri: values?.registrationStamp, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('TEM_DANG_KIEM', img7);
        }
        if (values?.cetificateCar) {
            let img8 = { 
                uri: values?.cetificateCar, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('GIAY_DANG_KIEM', img8);
        }
        if (values?.regisCertificateCar) {
            let img9 = { 
                uri: values?.regisCertificateCar, 
                name: 'image.jpg', 
                type: 'image/jpeg',
            }
            formData.append('DANG_KY_XE', img9);
        }

        formData.append('location', JSON.stringify({
            'GOC_TRUOC_GHE_PHU': values?.extraSeatInfo?.location || '',
            'GOC_CHINH_DIEN_DAU_XE': values?.frontCarImgInfo?.location || '',
            'GOC_TRUOC_GHE_LAI': values?.driverSeatInfo?.location || '',
            'GOC_SAU_GHE_PHU': values?.behindExtraSeatInfo?.location || '',
            'GOC_CHINH_DIEN_DUOI_XE': values?.backCarImgInfo?.location || '',
            'GOC_SAU_GHE_LAI': values?.behindDriverSeatInfo?.location || '',
            'TEM_DANG_KIEM': values?.registrationStampInfo?.location || '',
            'GIAY_DANG_KIEM': values?.cetificateCarInfo?.location || '',
            'DANG_KY_XE': values?.regisCertificateCarInfo?.location || '',
        }));
        formData.append('timePhoto', JSON.stringify({
            'GOC_TRUOC_GHE_PHU': values?.extraSeatInfo?.timePhoto || '',
            'GOC_CHINH_DIEN_DAU_XE': values?.frontCarImgInfo?.timePhoto || '',
            'GOC_TRUOC_GHE_LAI': values?.driverSeatInfo?.timePhoto || '',
            'GOC_SAU_GHE_PHU': values?.behindExtraSeatInfo?.timePhoto || '',
            'GOC_CHINH_DIEN_DUOI_XE': values?.backCarImgInfo?.timePhoto || '',
            'GOC_SAU_GHE_LAI': values?.behindDriverSeatInfo?.timePhoto || '',
            'TEM_DANG_KIEM': values?.registrationStampInfo?.timePhoto || '',
            'GIAY_DANG_KIEM': values?.cetificateCarInfo?.timePhoto || '',
            'DANG_KY_XE': values?.regisCertificateCarInfo?.timePhoto || '',
        }));
    } else {
        if (values?.saleAvoidPaper) {
            let img = {
                uri: values?.saleAvoidPaper,
                name: 'image.jpg',
                type: 'image/jpeg',
            }
            formData.append('GIAY_BAN_GIAO_XE', img);
        } 
        formData.append('location', JSON.stringify({
            'GIAY_BAN_GIAO_XE': values?.saleAvoidPaperInfo?.location || '',
        }));
        formData.append('timePhoto', JSON.stringify({
            'GIAY_BAN_GIAO_XE': values?.saleAvoidPaperInfo?.timePhoto || '',
        }));
    }
    return formData
}

const formDataUpdateImg = values => {
    const formData = new FormData();
    let location = {}, timePhoto = {};
    if (values['GOC_TRUOC_GHE_PHU']) {
        let img = { 
            uri: values['GOC_TRUOC_GHE_PHU']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GOC_TRUOC_GHE_PHU', img);
        location['GOC_TRUOC_GHE_PHU'] = values['GOC_TRUOC_GHE_PHU']?.infoImg?.location || '';
        timePhoto['GOC_TRUOC_GHE_PHU'] = values['GOC_TRUOC_GHE_PHU']?.infoImg?.timePhoto || '';
    }
    if (values['GOC_CHINH_DIEN_DAU_XE']) {
        let img = { 
            uri: values['GOC_CHINH_DIEN_DAU_XE']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GOC_CHINH_DIEN_DAU_XE', img);
        location['GOC_CHINH_DIEN_DAU_XE'] = values['GOC_CHINH_DIEN_DAU_XE']?.infoImg?.location || '';
        timePhoto['GOC_CHINH_DIEN_DAU_XE'] = values['GOC_CHINH_DIEN_DAU_XE']?.infoImg?.timePhoto || '';
    }
    if (values['GOC_TRUOC_GHE_LAI']) {
        let img = { 
            uri: values['GOC_TRUOC_GHE_LAI']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GOC_TRUOC_GHE_LAI', img);
        location['GOC_TRUOC_GHE_LAI'] = values['GOC_TRUOC_GHE_LAI']?.infoImg?.location || '';
        timePhoto['GOC_TRUOC_GHE_LAI'] = values['GOC_TRUOC_GHE_LAI']?.infoImg?.timePhoto || '';
    }
    if (values['GOC_SAU_GHE_PHU']) {
        let img = { 
            uri: values['GOC_SAU_GHE_PHU']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GOC_SAU_GHE_PHU', img);
        location['GOC_SAU_GHE_PHU'] = values['GOC_SAU_GHE_PHU']?.infoImg?.location || '';
        timePhoto['GOC_SAU_GHE_PHU'] = values['GOC_SAU_GHE_PHU']?.infoImg?.timePhoto || '';
    }
    if (values['GOC_CHINH_DIEN_DUOI_XE']) {
        let img = { 
            uri: values['GOC_CHINH_DIEN_DUOI_XE']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GOC_CHINH_DIEN_DUOI_XE', img);
        location['GOC_CHINH_DIEN_DUOI_XE'] = values['GOC_CHINH_DIEN_DUOI_XE']?.infoImg?.location || '';
        timePhoto['GOC_CHINH_DIEN_DUOI_XE'] = values['GOC_CHINH_DIEN_DUOI_XE']?.infoImg?.timePhoto || '';
    }
    if (values['GOC_SAU_GHE_LAI']) {
        let img = { 
            uri: values['GOC_SAU_GHE_LAI']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GOC_SAU_GHE_LAI', img);
        location['GOC_SAU_GHE_LAI'] = values['GOC_SAU_GHE_LAI']?.infoImg?.location || '';
        timePhoto['GOC_SAU_GHE_LAI'] = values['GOC_SAU_GHE_LAI']?.infoImg?.timePhoto || '';
    }
    if (values['TEM_DANG_KIEM']) {
        let img = { 
            uri: values['TEM_DANG_KIEM']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('TEM_DANG_KIEM', img);
        location['TEM_DANG_KIEM'] = values['TEM_DANG_KIEM']?.infoImg?.location || '';
        timePhoto['TEM_DANG_KIEM'] = values['TEM_DANG_KIEM']?.infoImg?.timePhoto || '';
    }
    if (values['GIAY_DANG_KIEM']) {
        let img = { 
            uri: values['GIAY_DANG_KIEM']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GIAY_DANG_KIEM', img);
        location['GIAY_DANG_KIEM'] = values['GIAY_DANG_KIEM']?.infoImg?.location || '';
        timePhoto['GIAY_DANG_KIEM'] = values['GIAY_DANG_KIEM']?.infoImg?.timePhoto || '';
    }
    if (values['DANG_KY_XE']) {
        let img = { 
            uri: values['DANG_KY_XE']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('DANG_KY_XE', img);
        location['DANG_KY_XE'] = values['DANG_KY_XE']?.infoImg?.location || '';
        timePhoto['DANG_KY_XE'] = values['DANG_KY_XE']?.infoImg?.timePhoto || '';
    }
    if (values['GIAY_BAN_GIAO_XE']) {
        let img = { 
            uri: values['GIAY_BAN_GIAO_XE']?.uri, 
            name: 'image.jpg', 
            type: 'image/jpeg',
        }
        formData.append('GIAY_BAN_GIAO_XE', img);
        location['GIAY_BAN_GIAO_XE'] = values['GIAY_BAN_GIAO_XE']?.infoImg?.location || '';
        timePhoto['GIAY_BAN_GIAO_XE'] = values['GIAY_BAN_GIAO_XE']?.infoImg?.timePhoto || '';
    }
    formData.append('location', JSON.stringify(location));
    formData.append('timePhoto', JSON.stringify(timePhoto));
    return formData
}

export const callApiUpdateImgContract = async (data) => {
    return new Store().getSession(Const.TOKEN).then(token => {
        return fetch(data?.url, {
            method: 'PUT',
            headers:{
                'Content-Type' : 'multipart/form-data',
                'Authorization' : token
            },
            body: formDataUpdateImg(data?.body),

        })
            .then(res => res.json())
            .then((res) => {
                console.log('======RES - Update - Img : ',res)
                if (res.status !== 'success') {
                    if (res.errors) {
                        let error = Object.values(res.errors).join('\n');
                        SimpleToast.show(error);
                    } else if (res.message) {
                        SimpleToast.show(res.message);
                    }
                }
                return res;
            })
            .catch(error => {
                console.log(error)
            })
    })
}
