import React from 'react';
import MotorIconSvg from '../../../config/images/icon_contracts/MotorIconSvg';
import TravelIconSvg from '../../../config/images/icon_contracts/TravelIconSvg';
import HomeIconSvg from '../../../config/images/icon_contracts/HomeIconSvg';
import FlightIconSvg from '../../../config/images/icon_contracts/FlightIconSvg';
import CarPhysicalIconSvg from '../../../config/images/icon_contracts/CarPhysicalIconSvg';
import CarIconSvg from '../../../config/images/icon_contracts/CarIconSvg';
import AccidentIconSvg from '../../../config/images/icon_contracts/AccidentIconSvg';

export const dateImages = {
    'A1': {
        icon: <AccidentIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Tai nạn cá nhân'
    },
    'A2': {
        icon: <AccidentIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Tai nạn hộ gia đình'
    },
    'C1': {
        icon: <CarIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Trách nhiệm dân sự ô tô'
    },
    'C2': {
        icon: <CarPhysicalIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Vật chất xe ô tô'
    },
    'DF1': {
        icon: <FlightIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Trễ chuyến bay'
    },
    'H1': {
        icon: <HomeIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Nhà tư nhân'
    },
    'M1': {
        icon: <MotorIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Trách nhiệm dân sự xe máy'
    },
    'M3': {
        icon: <MotorIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Vật chất xe máy'
    },
    'T1': {
        icon: <TravelIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Du lịch trong nước'
    },
    'T2': {
        icon: <TravelIconSvg height={40} width={40} />,
        name: 'Bảo hiểm Du lịch quốc tế'
    },
    'default': {
        icon: <CarIconSvg height={40} width={40} />,
        name: ''
    },
}

export const statusClaim = {
    "default": {
        "name": "Đang xử lý",
        "code": "",
        "color": '#F58220'
    },
    "nhap": {
        "name": "Nháp",
        "code": "nhap",
        "color": '#F58220'
    },
    "dang-xu-ly": {
        "name": "Đang xử lý",
        "code": "dang-xu-ly",
        "color": '#F58220'
    },
    "da-duyet": {
        "name": "Đã duyệt",
        "code": "da-duyet",
        "color": 'green'
    },
    "tu-choi": {
        "name": "Từ chối",
        "code": "tu-choi",
        "color": 'red'
    },
    "bo-sung-thong-tin": {
        "name": "Bổ sung thông tin",
        "code": "bo-sung-thong-tin",
        "color": '#F58220'
    },
    "tao-lai": {
        "name": "Tạo lại",
        "code": "tao-lai",
        "color": '#F58220'
    },
    "da-thanh-toan": {
        "name": "Đã thanh toán",
        "code": "da-thanh-toan",
        "color": '#007CC4'
    },
    "da-nhan-tien": {
        "name": "Đã nhận tiền",
        "code": "da-nhan-tien",
        "color": '#007CC4'
    }
}

