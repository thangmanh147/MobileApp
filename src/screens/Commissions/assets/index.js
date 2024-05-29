import {nameApp, TxtColor} from '../../../config/System';
import React from 'react';
import Icon24hSvg from '../../../config/images/icon_contracts/Icon24hSvg';
import MotorIconSvg from '../../../config/images/icon_contracts/MotorIconSvg';
import TravelIconSvg from '../../../config/images/icon_contracts/TravelIconSvg';
import HomeIconSvg from '../../../config/images/icon_contracts/HomeIconSvg';
import FlightIconSvg from '../../../config/images/icon_contracts/FlightIconSvg';
import CarPhysicalIconSvg from '../../../config/images/icon_contracts/CarPhysicalIconSvg';
import CarIconSvg from '../../../config/images/icon_contracts/CarIconSvg';
import AccidentIconSvg from '../../../config/images/icon_contracts/AccidentIconSvg';

export const dateImages = {
    'A1': {
        icon: <AccidentIconSvg height={16} width={16} />,
        name: 'Tai nạn cá nhân'
    },
    'A2': {
        icon: <AccidentIconSvg height={16} width={16} />,
        name: 'Tai nạn hộ gia đình'
    },
    'A3': {
        icon: <Icon24hSvg height={16} width={16} />,
        name: nameApp.includes('YCHI') ? 'An Sinh Y Chi' : 'An Sinh Mai Linh'
    },
    'A4': {
        icon: <AccidentIconSvg height={16} width={16} />,
        name: 'Vững Tâm An'
    },
    'A8': {
        icon: <Icon24hSvg height={16} width={16} />,
        name: 'An Sinh Gia Đình'
    },
    'HC10': {
        icon: <Icon24hSvg height={16} width={16} />,
        name: 'ACare'
    },
    'C1': {
        icon: <CarIconSvg height={16} width={16} />,
        name: 'TNDS ô tô'
    },
    'C2': {
        icon: <CarPhysicalIconSvg height={16} width={16} />,
        name: 'Vật chất xe ô tô'
    },
    'C3': {
        icon: <CarIconSvg height={16} width={16} />,
        name: 'TNDS bắt buộc (kèm TNLXPX và NNTX)',
    },
    'DF1': {
        icon: <FlightIconSvg height={16} width={16} />,
        name: 'Trễ chuyến bay'
    },
    'H1': {
        icon: <HomeIconSvg height={16} width={16} />,
        name: 'Nhà tư nhân'
    },
    'H2': {
        icon: <HomeIconSvg height={16} width={16} />,
        name: 'Chung cư'
    },
    'M1': {
        icon: <MotorIconSvg height={16} width={16} />,
        name: 'TNDS xe máy'
    },
    'M2': {
        icon: <MotorIconSvg height={16} width={16} />,
        name: 'TNDS bắt buộc (kèm người ngồi trên xe)'
    },
    'M3': {
        icon: <MotorIconSvg height={16} width={16} />,
        name: 'Vật chất xe máy'
    },
    'T1': {
        icon: <TravelIconSvg height={16} width={16} />,
        name: 'Du lịch trong nước'
    },
    'T2': {
        icon: <TravelIconSvg height={16} width={16} />,
        name: 'Du lịch quốc tế'
    },
    'default': {
        icon: <CarPhysicalIconSvg height={16} width={16} />,
        name: ''
    },
}
