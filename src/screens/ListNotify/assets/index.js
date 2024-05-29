import React from 'react';
import {colorCancel, colorEffect, colorPaid, colorUnPay, nameApp, textDisable, TxtColor} from '../../../config/System';
import IconCancelSvg from '../../../config/images/icons/IconCancelSvg';
import IconCompleteSvg from '../../../config/images/icons/IconCompleteSvg';
import IconTNDSCarSvg from '../../../config/images/list_insur/IconTNDSCarSvg';
import IconCarPhysicalSvg from '../../../config/images/list_insur/IconCarPhysicalSvg';
import IconMotorSvg from '../../../config/images/list_insur/IconMotorSvg';
import Icon24hSvg from '../../../config/images/list_insur/Icon24hSvg';
import IconFamilySvg from '../../../config/images/list_insur/IconFamilySvg';
import IconMotorPhysical from '../../../config/images/list_insur/IconMotorPhysical';
import IconHouseSvg from '../../../config/images/list_insur/IconHouseSvg';
import IconTravelSvg from '../../../config/images/list_insur/IconTravelSvg';
import IconDelayFlightSvg from '../../../config/images/list_insur/IconDelayFlightSvg';

export const infoInsur = {
    'A1': {
        icon: require('../../../config/images/public/banner/banner_accident.jpg'),
        name: 'Tai nạn cá nhân',
        nameHeader: 'BẢO HIỂM TAI NẠN',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgAccident.jpg'),
        iconBG: <IconFamilySvg height={65} width={65} />,
        numberLine: 1
    },
    'A2': {
        icon: require('../../../config/images/public/banner/banner_accident.jpg'),
        name: 'Tai nạn hộ gia đình',
        nameHeader: 'BẢO HIỂM TAI NẠN',
        nameHeader2: 'BẢO HIỂM GIA ĐÌNH YÊU THƯƠNG',
        background: require('../../../config/images/public/background/bgAccident.jpg'),
        iconBG: <IconFamilySvg height={65} width={65} />,
        numberLine: 1
    },
    'A3': {
        icon: nameApp.includes('MAILINH') ? require('../../../config/images/public/banner/banner24h_ML.jpg') : require('../../../config/images/public/banner/banner24h.jpg'),
        name: nameApp.includes('YCHI') ? 'An Sinh Y Chi' : 'An Sinh Mai Linh',
        nameHeader: nameApp.includes('YCHI') ? 'Bảo Hiểm An Sinh Y Chi' : 'An Sinh Mai Linh',
        nameHeader2: '',
        background: nameApp.includes('MAILINH') ? require('../../../config/images/public/background/bg24h_ML.jpg') : require('../../../config/images/public/background/bg24h.jpg'),
        iconBG: <Icon24hSvg height={65} width={65} />,
        numberLine: 1
    },
    'A4': {
        icon: require('../../../config/images/public/banner/bannerVTA.jpg'),
        name: 'Vững Tâm An',
        nameHeader: 'BẢO HIỂM VỮNG TÂM AN',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgVTA.jpg'),
        iconBG: <IconFamilySvg height={65} width={65} />,
        numberLine: 1
    },
    'A8': {
        icon: require('../../../config/images/public/banner/banner24h.jpg'),
        name: 'An Sinh Gia Đình',
        nameHeader: 'An Sinh Gia Đình',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bg24h.jpg'),
        iconBG: <Icon24hSvg height={65} width={65} />,
        numberLine: 1
    },
    'C1': {
        icon: nameApp.includes('MAILINH') ? require('../../../config/images/public/banner/bannerCar_ML.jpg') : require('../../../config/images/public/banner/bannerCar.jpg'),
        name: 'TNDS ô tô',
        nameHeader: 'BẢO HIỂM\nTRÁCH NHIỆM DÂN SỰ Ô TÔ',
        nameHeader2: '',
        background: nameApp.includes('MAILINH') ? require('../../../config/images/public/background/bgCar_ML.jpg') : require('../../../config/images/public/background/bgCar.jpg'),
        iconBG: <IconTNDSCarSvg height={65} width={65} />,
        numberLine: 2
    },
    'C2': {
        icon: nameApp.includes('MAILINH') ? require('../../../config/images/public/banner/bannerCarPhysical_ML.jpg') : require('../../../config/images/public/banner/bannerCarPhysical.jpg'),
        name: 'Vật chất xe ô tô',
        nameHeader: 'BẢO HIỂM\nVẬT CHẤT XE Ô TÔ',
        nameHeader2: '',
        background: nameApp.includes('MAILINH') ? require('../../../config/images/public/background/bgCarPhysical_ML.jpg') : require('../../../config/images/public/background/bgCarPhysical.jpg'),
        iconBG: <IconCarPhysicalSvg height={65} width={65} />,
        numberLine: 2
    },
    'C3': {
        icon: nameApp.includes('MAILINH') ? require('../../../config/images/public/banner/bannerCar_ML.jpg') : require('../../../config/images/public/banner/bannerCar.jpg'),
        name: 'TNDS bắt buộc (kèm TNLXPX và NNTX)',
        nameHeader: 'BẢO HIỂM\nTRÁCH NHIỆM DÂN SỰ Ô TÔ',
        nameHeader2: '',
        background: nameApp.includes('MAILINH') ? require('../../../config/images/public/background/bgCar_ML.jpg') : require('../../../config/images/public/background/bgCar.jpg'),
        iconBG: <IconTNDSCarSvg height={65} width={65} />,
        numberLine: 2
    },
    'DF1': {
        icon: require('../../../config/images/public/banner/banner_delayFlight.jpg'),
        name: 'Trễ chuyến bay',
        nameHeader: 'BẢO HIỂM\nTRỄ CHUYẾN BAY',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgDelayFlight.jpg'),
        iconBG: <IconDelayFlightSvg height={65} width={65} />,
        numberLine: 2
    },
    'H1': {
        icon: require('../../../config/images/public/banner/bannerHouse.jpg'),
        name: 'Nhà tư nhân',
        nameHeader: 'BẢO HIỂM\nNHÀ TƯ NHÂN',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgHouse.jpg'),
        iconBG: <IconHouseSvg height={65} width={65} />,
        numberLine: 2
    },
    'H2': {
        icon: require('../../../config/images/public/banner/bannerHouse.jpg'),
        name: 'Nhà tư nhân',
        nameHeader: 'BẢO HIỂM\nNHÀ TƯ NHÂN',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgHouse.jpg'),
        iconBG: <IconHouseSvg height={65} width={65} />,
        numberLine: 2
    },
    'M1': {
        icon: nameApp.includes('MAILINH') ? require('../../../config/images/public/banner/bannerMotor_ML.jpg') : require('../../../config/images/public/banner/bannerMotor.jpg'),
        name: 'TNDS xe máy',
        nameHeader: 'BẢO HIỂM\nTRÁCH NHIỆM DÂN SỰ XE MÁY',
        nameHeader2: '',
        background: nameApp.includes('MAILINH') ? require('../../../config/images/public/background/bgMotor_ML.jpg') : require('../../../config/images/public/background/bgMotor.jpg'),
        iconBG: <IconMotorSvg height={65} width={65} />,
        numberLine: 2
    },
    'M2': {
        icon: nameApp.includes('MAILINH') ? require('../../../config/images/public/banner/bannerMotor_ML.jpg') : require('../../../config/images/public/banner/bannerMotor.jpg'),
        name: 'TNDS bắt buộc (kèm người ngồi trên xe)',
        nameHeader: 'BẢO HIỂM\nTRÁCH NHIỆM DÂN SỰ XE MÁY',
        nameHeader2: '',
        background: nameApp.includes('MAILINH') ? require('../../../config/images/public/background/bgMotor_ML.jpg') : require('../../../config/images/public/background/bgMotor.jpg'),
        iconBG: <IconMotorSvg height={65} width={65} />,
        numberLine: 2
    },
    'M3': {
        icon: require('../../../config/images/public/banner/bannerMotor.jpg'),
        name: 'Vật chất xe máy',
        nameHeader: 'BẢO HIỂM\nVẬT CHẤT XE MÁY',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgMotor.jpg'),
        iconBG: <IconMotorPhysical height={65} width={65} />,
        numberLine: 2
    },
    'T1': {
        icon: require('../../../config/images/public/banner/banner_travel.jpg'),
        name: 'Du lịch trong nước',
        nameHeader: 'BẢO HIỂM\nDU LỊCH',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgTravel.jpg'),
        iconBG: <IconTravelSvg height={65} width={65} />,
        numberLine: 2
    },
    'T2': {
        icon: require('../../../config/images/public/banner/banner_travel.jpg'),
        name: 'Du lịch quốc tế',
        nameHeader: 'BẢO HIỂM\nDU LỊCH',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgTravel.jpg'),
        iconBG: <IconTravelSvg height={65} width={65} />,
        numberLine: 2
    },
    'HC10': {
        icon: require('../../../config/images/public/banner/bannerVBI.png'),
        name: 'Bảo hiểm ACare',
        nameHeader: 'BẢO HIỂM ACARE',
        nameHeader2: '',
        background: require('../../../config/images/public/background/bgTravel.jpg'),
        iconBG: <Icon24hSvg height={65} width={65} />,
        numberLine: 1
    },
    'default': {
        icon: nameApp.includes('MAILINH') ? require('../../../config/images/public/banner/bannerCar_ML.jpg') : require('../../../config/images/public/banner/bannerCar.jpg'),
        name: '',
        nameHeader: '',
        nameHeader2: '',
        background: '',
        iconBG: '',
        numberLine: 1
    },
}

export const statusCustomer = {
    "default": {
        "code": "",
        "color": TxtColor,
        "background": colorUnPay,
    },
    "chua-thanh-toan": {
        "code": "chua-thanh-toan",
        "color": TxtColor,
        "background": colorUnPay,
    },
    "da-thanh-toan": {
        "code": "da-thanh-toan",
        "color": TxtColor,
        "background": colorPaid,
    },
    "dang-hieu-luc": {
        "code": "dang-hieu-luc",
        "color": 'white',
        "background": colorEffect,
    },
    "het-hieu-luc": {
        "code": "het-hieu-luc",
        "color": TxtColor,
        "background": textDisable,
    },
    "huy": {
        "code": "huy",
        "color": 'white',
        "background": colorCancel,
    },
}

export const statusAcc = {
    "default": {
        "name": "",
        "color": TxtColor,
        "background": colorUnPay,
    },
    "pending": {
        "name": "Đang xử lý",
        "color": TxtColor,
        "background": colorUnPay,
    },
    "success": {
        "name": "Thành công",
        "color": 'white',
        "background": colorEffect,
    },
    "error": {
        "name": "Thất bại",
        "color": 'white',
        "background": colorCancel,
    },
}

export const statusImg = {
    "da-duyet": {
        "code": "da-duyet",
        "name": "Đã duyệt ảnh",
        "color": 'white',
        "background": colorEffect,
    },
    "cho-duyet": {
        "code": "cho-duyet",
        "name": "Chờ duyệt ảnh",
        "color": TxtColor,
        "background": colorUnPay,
    },
    "tu-choi": {
        "code": "tu-choi",
        "name": "Từ chối ảnh",
        "color": 'white',
        "background": colorCancel,
    },
}

export const statusContract = {
    "default": <IconCompleteSvg width={25} height={25} />,
    "ADD": <IconCompleteSvg width={25} height={25} />,
    "PAY": <IconCompleteSvg width={25} height={25} />,
    "SIGN": <IconCompleteSvg width={25} height={25} />,
    "CANCEL": <IconCancelSvg width={25} height={25} />,
}
